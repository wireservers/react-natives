/**
 * Upload queue logic for the FileUpload component.
 *
 * Pure so acceptance rules and queue transitions can be tested without a file picker —
 * rejecting a valid file (or accepting an oversized one) is silent until a user hits it.
 */

export type UploadStatus = 'queued' | 'uploading' | 'done' | 'error' | 'canceled';

export interface UploadFile {
  /** Stable id assigned when the file enters the queue. */
  id: string;
  name: string;
  /** Bytes. */
  size: number;
  /** MIME type, when the platform reports one. */
  type?: string;
  /** Local uri (native) or object URL (web). */
  uri?: string;
  status: UploadStatus;
  /** 0–1. */
  progress: number;
  error?: string;
}

export interface AcceptRules {
  /** Max bytes per file. */
  maxSize?: number;
  /** Max files in the queue. */
  maxFiles?: number;
  /**
   * Accepted types, in the HTML `accept` vocabulary: extensions (`.pdf`), concrete MIME
   * types (`image/png`), or wildcards (`image/*`).
   */
  accept?: string[];
  /** Reject a file already in the queue with the same name + size. */
  dedupe?: boolean;
}

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];

/** Human-readable size. Uses 1024-based units, matching what OS file managers report. */
export function formatBytes(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), UNITS.length - 1);
  const value = bytes / 1024 ** exponent;
  // Whole bytes never need a decimal point.
  const digits = exponent === 0 ? 0 : decimals;
  return `${value.toFixed(digits)} ${UNITS[exponent]}`;
}

export function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.');
  // A leading dot is a hidden file (".gitignore"), not an extension.
  if (dot <= 0) return '';
  return name.slice(dot).toLowerCase();
}

/** Whether a file matches one `accept` entry. */
function matchesAcceptEntry(file: Pick<UploadFile, 'name' | 'type'>, entry: string): boolean {
  const rule = entry.trim().toLowerCase();
  if (!rule) return false;

  if (rule.startsWith('.')) return extensionOf(file.name) === rule;

  const type = (file.type ?? '').toLowerCase();
  if (!type) return false;
  if (rule.endsWith('/*')) return type.startsWith(`${rule.slice(0, -1)}`);
  return type === rule;
}

/**
 * Reason a file is rejected, or `null` when it is acceptable.
 *
 * `existing` is the current queue, needed for the count and dedupe rules.
 */
export function rejectionReason(
  file: Pick<UploadFile, 'name' | 'size' | 'type'>,
  rules: AcceptRules,
  existing: UploadFile[] = [],
): string | null {
  const { maxSize, maxFiles, accept, dedupe } = rules;

  if (accept && accept.length > 0 && !accept.some((entry) => matchesAcceptEntry(file, entry))) {
    return `${file.name} is not an accepted file type`;
  }
  if (maxSize != null && file.size > maxSize) {
    return `${file.name} is larger than ${formatBytes(maxSize)}`;
  }
  if (dedupe && existing.some((f) => f.name === file.name && f.size === file.size)) {
    return `${file.name} is already in the list`;
  }
  // Counted last: a file rejected for another reason shouldn't consume a slot in the message.
  if (maxFiles != null && existing.length >= maxFiles) {
    return `Only ${maxFiles} file${maxFiles === 1 ? '' : 's'} can be uploaded at once`;
  }
  return null;
}

export interface AddResult {
  /** The queue after adding — a new array; the input is never mutated. */
  files: UploadFile[];
  /** One message per rejected file, in input order. */
  rejected: string[];
}

let counter = 0;
/** Queue-local id. Not globally unique across processes, and not meant to be. */
export function nextUploadId(): string {
  counter += 1;
  return `upload-${Date.now().toString(36)}-${counter}`;
}

/**
 * Add candidate files to a queue, applying `rules`.
 *
 * Accepted files land as `queued` at 0 progress. Rejections are returned rather than
 * thrown, so a multi-file drop where one file is oversized still adds the rest.
 */
export function addFiles(
  queue: UploadFile[],
  candidates: Array<Pick<UploadFile, 'name' | 'size' | 'type' | 'uri'>>,
  rules: AcceptRules = {},
): AddResult {
  const files = [...queue];
  const rejected: string[] = [];

  for (const candidate of candidates) {
    // Checked against the running queue so a single drop can't exceed maxFiles.
    const reason = rejectionReason(candidate, rules, files);
    if (reason) {
      rejected.push(reason);
      continue;
    }
    files.push({
      id: nextUploadId(),
      name: candidate.name,
      size: candidate.size,
      type: candidate.type,
      uri: candidate.uri,
      status: 'queued',
      progress: 0,
    });
  }

  return { files, rejected };
}

/** Replace one file's fields, returning a new queue. Unknown ids are a no-op. */
export function updateFile(queue: UploadFile[], id: string, patch: Partial<UploadFile>): UploadFile[] {
  let changed = false;
  const next = queue.map((file) => {
    if (file.id !== id) return file;
    changed = true;
    return { ...file, ...patch };
  });
  return changed ? next : queue;
}

export function removeFile(queue: UploadFile[], id: string): UploadFile[] {
  const next = queue.filter((file) => file.id !== id);
  return next.length === queue.length ? queue : next;
}

/** Clamp progress into 0–1 and mark completion, so a caller can report 0–100 or 0–1. */
export function setProgress(queue: UploadFile[], id: string, progress: number): UploadFile[] {
  const ratio = progress > 1 ? progress / 100 : progress;
  const clamped = Math.max(0, Math.min(1, Number.isFinite(ratio) ? ratio : 0));
  return updateFile(queue, id, {
    progress: clamped,
    // Reaching 100% is not success — the caller marks `done` when the request resolves.
    status: 'uploading',
  });
}

/**
 * Overall progress across the queue, weighted by file size.
 *
 * Byte-weighted rather than a plain average, so a 2 KB thumbnail finishing doesn't jump the
 * bar to 50% while a 200 MB video is still going.
 */
export function overallProgress(queue: UploadFile[]): number {
  const active = queue.filter((f) => f.status !== 'canceled' && f.status !== 'error');
  if (active.length === 0) return 0;

  const total = active.reduce((sum, f) => sum + f.size, 0);
  // Zero-byte files still count, so fall back to an unweighted mean.
  if (total <= 0) {
    return active.reduce((sum, f) => sum + (f.status === 'done' ? 1 : f.progress), 0) / active.length;
  }
  const moved = active.reduce((sum, f) => sum + f.size * (f.status === 'done' ? 1 : f.progress), 0);
  return Math.max(0, Math.min(1, moved / total));
}

export function countByStatus(queue: UploadFile[]): Record<UploadStatus, number> {
  const counts: Record<UploadStatus, number> = {
    queued: 0, uploading: 0, done: 0, error: 0, canceled: 0,
  };
  for (const file of queue) counts[file.status] += 1;
  return counts;
}

/** Files still needing work — what a "Retry all" / "Upload" button should act on. */
export function pendingFiles(queue: UploadFile[]): UploadFile[] {
  return queue.filter((file) => file.status === 'queued' || file.status === 'error');
}

export function isImage(file: Pick<UploadFile, 'name' | 'type'>): boolean {
  if (file.type) return file.type.toLowerCase().startsWith('image/');
  return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.heic', '.avif'].includes(
    extensionOf(file.name),
  );
}
