import React from 'react';
import { ActivityIndicator, Image, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { WithLicenseWatermark } from '../licensing/watermark';
import {
  addFiles,
  countByStatus,
  formatBytes,
  isImage,
  overallProgress,
  removeFile,
  setProgress,
  updateFile,
  type AcceptRules,
  type UploadFile,
} from './upload-utils';

/** A file offered to the queue, before it gets an id. */
export type PickedFile = Pick<UploadFile, 'name' | 'size' | 'type' | 'uri'> & {
  /** The platform's own handle — a DOM `File` on web. Passed straight back to `onUpload`. */
  raw?: unknown;
};

export interface FileUploadProps extends AcceptRules {
  /** Controlled queue. Omit to let the component manage its own. */
  files?: UploadFile[];
  onFilesChange?: (files: UploadFile[]) => void;
  /**
   * Perform the upload. Report progress via `onProgress`; resolve to succeed, throw to fail.
   * Omit to use the component purely as a picker.
   */
  onUpload?: (file: UploadFile, raw: unknown, onProgress: (ratio: number) => void) => Promise<void>;
  /** Start uploading as soon as a file is accepted. Defaults true when `onUpload` is set. */
  autoUpload?: boolean;
  /**
   * Native file picker. Required on iOS/Android — wire it to expo-document-picker or
   * react-native-image-picker. On web the component opens a file dialog itself.
   */
  onPickFiles?: () => Promise<PickedFile[]>;
  onRejected?: (messages: string[]) => void;
  label?: string;
  hint?: string;
  /** Show image thumbnails for picked images. Defaults true. */
  previews?: boolean;
  disabled?: boolean;
  className?: string;
}

function statusColor(status: UploadFile['status']): string {
  switch (status) {
    case 'done': return 'bg-success-500';
    case 'error': return 'bg-error-500';
    case 'canceled': return 'bg-background-300';
    default: return 'bg-primary-500';
  }
}

/**
 * Drag-and-drop upload zone with per-file progress, previews, and acceptance rules.
 *
 * Web gets real drag-and-drop plus a native file dialog, both driven through the same queue
 * as the native path — so the accept/size/dedupe rules in `upload-utils` are the single
 * source of truth on every platform.
 */
export function FileUpload({
  files: controlledFiles,
  onFilesChange,
  onUpload,
  autoUpload,
  onPickFiles,
  onRejected,
  label = 'Drag files here',
  hint,
  previews = true,
  disabled,
  className,
  ...rules
}: FileUploadProps) {
  const [internalFiles, setInternalFiles] = React.useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);
  const zoneRef = React.useRef<View | null>(null);

  const files = controlledFiles ?? internalFiles;

  // Raw platform handles, keyed by queue id. Kept out of state — a DOM File is not
  // serializable and has no business in a render-triggering store.
  const rawFiles = React.useRef(new Map<string, unknown>());

  // Live view of props/state for the DOM listeners below, which are attached once.
  const live = React.useRef({ files, controlledFiles, onFilesChange, onUpload, autoUpload, onRejected, rules, disabled });
  live.current = { files, controlledFiles, onFilesChange, onUpload, autoUpload, onRejected, rules, disabled };

  const commit = React.useCallback((next: UploadFile[]) => {
    if (live.current.controlledFiles === undefined) setInternalFiles(next);
    live.current.onFilesChange?.(next);
  }, []);

  /** Mutate the queue from inside async upload callbacks, always against the latest state. */
  const patch = React.useCallback((mutate: (queue: UploadFile[]) => UploadFile[]) => {
    const next = mutate(live.current.files);
    live.current.files = next;
    commit(next);
  }, [commit]);

  const startUpload = React.useCallback(async (file: UploadFile) => {
    const upload = live.current.onUpload;
    if (!upload) return;

    patch((queue) => updateFile(queue, file.id, { status: 'uploading', progress: 0, error: undefined }));
    try {
      await upload(file, rawFiles.current.get(file.id), (ratio) => {
        patch((queue) => setProgress(queue, file.id, ratio));
      });
      patch((queue) => updateFile(queue, file.id, { status: 'done', progress: 1 }));
    } catch (error) {
      patch((queue) =>
        updateFile(queue, file.id, {
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed',
        }),
      );
    }
  }, [patch]);

  const accept = React.useCallback((picked: PickedFile[]) => {
    if (live.current.disabled) return;
    const { files: next, rejected } = addFiles(live.current.files, picked, live.current.rules);
    setErrors(rejected);
    if (rejected.length > 0) live.current.onRejected?.(rejected);

    // Pair each newly added entry with the handle it came from. Rejected candidates can sit
    // anywhere in `picked`, so walk both lists in order rather than indexing off the tail.
    const added = next.slice(live.current.files.length);
    let cursor = 0;
    for (const candidate of picked) {
      const file = added[cursor];
      if (file && file.name === candidate.name && file.size === candidate.size) {
        rawFiles.current.set(file.id, candidate.raw);
        cursor += 1;
      }
    }

    live.current.files = next;
    commit(next);

    const shouldAuto = live.current.autoUpload ?? Boolean(live.current.onUpload);
    if (shouldAuto) added.forEach((file) => { void startUpload(file); });
  }, [commit, startUpload]);

  // Web drag-and-drop. RNW hands back the DOM node from `ref`, so the real HTML5 events are
  // available — there is no React Native gesture equivalent for an OS file drop.
  React.useEffect(() => {
    if (Platform.OS !== 'web') return;
    const node = zoneRef.current as unknown as HTMLElement | null;
    if (!node || typeof node.addEventListener !== 'function') return;

    const stop = (event: Event) => { event.preventDefault(); event.stopPropagation(); };
    const onDragOver = (event: Event) => { stop(event); if (!live.current.disabled) setDragActive(true); };
    const onDragLeave = (event: Event) => { stop(event); setDragActive(false); };
    const onDrop = (event: Event) => {
      stop(event);
      setDragActive(false);
      const list = (event as DragEvent).dataTransfer?.files;
      if (!list?.length) return;
      accept(Array.from(list).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        uri: URL.createObjectURL(file),
        raw: file,
      })));
    };

    node.addEventListener('dragover', onDragOver);
    node.addEventListener('dragleave', onDragLeave);
    node.addEventListener('drop', onDrop);
    return () => {
      node.removeEventListener('dragover', onDragOver);
      node.removeEventListener('dragleave', onDragLeave);
      node.removeEventListener('drop', onDrop);
    };
  }, [accept]);

  // Object URLs created for previews are leaked memory until revoked.
  React.useEffect(() => () => {
    if (Platform.OS !== 'web' || typeof URL === 'undefined') return;
    for (const file of live.current.files) {
      if (file.uri?.startsWith('blob:')) URL.revokeObjectURL(file.uri);
    }
  }, []);

  const browse = React.useCallback(async () => {
    if (disabled) return;
    if (Platform.OS !== 'web') {
      if (!onPickFiles) return;
      accept(await onPickFiles());
      return;
    }
    if (typeof document === 'undefined') return;

    // Built imperatively: RNW cannot render a raw <input>, and a hidden one in the tree
    // would still need a DOM escape hatch to click.
    const input = document.createElement('input');
    input.type = 'file';
    if (rules.maxFiles !== 1) input.multiple = true;
    if (rules.accept?.length) input.accept = rules.accept.join(',');
    input.onchange = () => {
      const list = input.files;
      if (list?.length) {
        accept(Array.from(list).map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          uri: URL.createObjectURL(file),
          raw: file,
        })));
      }
      input.value = '';
    };
    input.click();
  }, [accept, disabled, onPickFiles, rules.accept, rules.maxFiles]);

  const counts = countByStatus(files);
  const overall = overallProgress(files);
  const busy = counts.uploading > 0;

  return (
    <WithLicenseWatermark>
      <View className={className}>
        <Pressable
          ref={zoneRef as never}
          onPress={browse}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityState={{ disabled: Boolean(disabled) }}
          className={`items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 ${
            dragActive ? 'border-primary-500 bg-primary-50' : 'border-outline-300 bg-background-50'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          <Text className="text-sm font-medium text-typography-700">{label}</Text>
          <Text className="mt-1 text-xs text-typography-500">
            {Platform.OS === 'web' ? 'or click to browse' : 'tap to browse'}
          </Text>
          {hint ? <Text className="mt-2 text-[11px] text-typography-400">{hint}</Text> : null}
          {rules.maxSize != null ? (
            <Text className="mt-0.5 text-[11px] text-typography-400">
              Up to {formatBytes(rules.maxSize)} per file
            </Text>
          ) : null}
        </Pressable>

        {errors.length > 0 ? (
          <View className="mt-2" accessibilityLiveRegion="polite">
            {errors.map((message) => (
              <Text key={message} className="text-[11px] text-error-600">{message}</Text>
            ))}
          </View>
        ) : null}

        {busy ? (
          <View className="mt-3">
            <View className="h-1.5 overflow-hidden rounded-full bg-background-200">
              <View className="h-full rounded-full bg-primary-500" style={{ width: `${overall * 100}%` }} />
            </View>
            <Text className="mt-1 text-[11px] text-typography-500">
              Uploading {counts.uploading} of {files.length} — {Math.round(overall * 100)}%
            </Text>
          </View>
        ) : null}

        <ScrollView style={{ maxHeight: 280 }} className="mt-3">
          {files.map((file) => (
            <View
              key={file.id}
              className="mb-2 flex-row items-center gap-3 rounded-md border border-outline-200 bg-background-0 p-2"
            >
              {previews && isImage(file) && file.uri ? (
                <Image
                  source={{ uri: file.uri }}
                  accessibilityLabel={file.name}
                  style={{ width: 36, height: 36, borderRadius: 4 }}
                />
              ) : (
                <View className="h-9 w-9 items-center justify-center rounded bg-background-100">
                  <Text className="text-[9px] font-semibold uppercase text-typography-500">
                    {file.name.split('.').pop()?.slice(0, 4) ?? 'file'}
                  </Text>
                </View>
              )}

              <View className="flex-1">
                <Text className="text-xs font-medium text-typography-900" numberOfLines={1}>
                  {file.name}
                </Text>
                <Text className="text-[10px] text-typography-500">
                  {formatBytes(file.size)}
                  {file.status === 'error' && file.error ? ` — ${file.error}` : ''}
                </Text>
                {file.status === 'uploading' || file.status === 'done' ? (
                  <View className="mt-1 h-1 overflow-hidden rounded-full bg-background-200">
                    <View
                      className={`h-full rounded-full ${statusColor(file.status)}`}
                      style={{ width: `${(file.status === 'done' ? 1 : file.progress) * 100}%` }}
                    />
                  </View>
                ) : null}
              </View>

              {file.status === 'uploading' ? <ActivityIndicator size="small" /> : null}
              {file.status === 'error' && onUpload ? (
                <Pressable
                  onPress={() => { void startUpload(file); }}
                  accessibilityRole="button"
                  accessibilityLabel={`Retry ${file.name}`}
                  className="rounded border border-outline-300 px-2 py-1"
                >
                  <Text className="text-[10px] text-typography-700">Retry</Text>
                </Pressable>
              ) : null}
              <Pressable
                onPress={() => {
                  rawFiles.current.delete(file.id);
                  if (Platform.OS === 'web' && file.uri?.startsWith('blob:')) URL.revokeObjectURL(file.uri);
                  patch((queue) => removeFile(queue, file.id));
                }}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${file.name}`}
                className="px-2 py-1"
              >
                <Text className="text-sm text-typography-400">×</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </WithLicenseWatermark>
  );
}

FileUpload.displayName = 'FileUpload';
