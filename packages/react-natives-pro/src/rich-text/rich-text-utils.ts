/**
 * Markdown editing primitives for the RichTextEditor.
 *
 * The editor stores Markdown, not a proprietary document model: React Native has no
 * contentEditable, so a `TextInput` over Markdown source is the only representation that
 * works identically on iOS, Android, and web — and it is the one users can take elsewhere.
 *
 * Every function here is a pure `(text, selection) -> { text, selection }` transform, which
 * is what makes cursor behaviour testable. Cursor placement is where these editors feel
 * broken, so it is asserted rather than assumed.
 */

export interface Selection {
  start: number;
  end: number;
}

export interface EditResult {
  text: string;
  selection: Selection;
}

export type InlineMark = 'bold' | 'italic' | 'strikethrough' | 'code';
export type BlockType = 'paragraph' | 'h1' | 'h2' | 'h3' | 'quote' | 'bullet' | 'ordered' | 'code';

const MARKERS: Record<InlineMark, string> = {
  bold: '**',
  italic: '_',
  strikethrough: '~~',
  code: '`',
};

export function markerFor(mark: InlineMark): string {
  return MARKERS[mark];
}

function normalize(selection: Selection): Selection {
  return selection.start <= selection.end
    ? { ...selection }
    : { start: selection.end, end: selection.start };
}

/** Whether the selection is already wrapped in `mark`, inside or immediately outside it. */
export function hasInlineMark(text: string, selection: Selection, mark: InlineMark): boolean {
  const { start, end } = normalize(selection);
  const marker = MARKERS[mark];
  const inner = text.slice(start, end);

  if (inner.length >= marker.length * 2 && inner.startsWith(marker) && inner.endsWith(marker)) return true;
  return text.slice(start - marker.length, start) === marker && text.slice(end, end + marker.length) === marker;
}

/**
 * Toggle an inline mark around the selection.
 *
 * With an empty selection this inserts the marker pair and places the cursor between them,
 * so typing continues inside the new emphasis — the behaviour every editor has and whose
 * absence feels immediately wrong.
 */
export function toggleInline(text: string, selection: Selection, mark: InlineMark): EditResult {
  const { start, end } = normalize(selection);
  const marker = MARKERS[mark];
  const width = marker.length;

  if (hasInlineMark(text, selection, mark)) {
    const inner = text.slice(start, end);
    // Markers inside the selection.
    if (inner.startsWith(marker) && inner.endsWith(marker) && inner.length >= width * 2) {
      const stripped = inner.slice(width, inner.length - width);
      return {
        text: text.slice(0, start) + stripped + text.slice(end),
        selection: { start, end: start + stripped.length },
      };
    }
    // Markers surrounding the selection.
    return {
      text: text.slice(0, start - width) + text.slice(start, end) + text.slice(end + width),
      selection: { start: start - width, end: end - width },
    };
  }

  const inner = text.slice(start, end);
  const next = `${text.slice(0, start)}${marker}${inner}${marker}${text.slice(end)}`;
  return {
    text: next,
    selection: start === end
      ? { start: start + width, end: start + width }
      : { start: start + width, end: end + width },
  };
}

/** Start index of the line containing `index`. */
export function lineStart(text: string, index: number): number {
  return text.lastIndexOf('\n', Math.max(0, index - 1)) + 1;
}

/** End index (exclusive of the newline) of the line containing `index`. */
export function lineEnd(text: string, index: number): number {
  const next = text.indexOf('\n', index);
  return next === -1 ? text.length : next;
}

/** Every line index range touched by the selection. Always at least one line. */
export function selectedLines(text: string, selection: Selection): Array<{ start: number; end: number }> {
  const { start, end } = normalize(selection);
  const lines: Array<{ start: number; end: number }> = [];
  let cursor = lineStart(text, start);

  while (cursor <= end) {
    const stop = lineEnd(text, cursor);
    lines.push({ start: cursor, end: stop });
    if (stop >= text.length) break;
    cursor = stop + 1;
    // A selection ending exactly on a newline should not pull in the following line.
    if (cursor > end) break;
  }
  return lines;
}

const BLOCK_PREFIX: Record<Exclude<BlockType, 'paragraph' | 'ordered'>, string> = {
  h1: '# ',
  h2: '## ',
  h3: '### ',
  quote: '> ',
  bullet: '- ',
  code: '    ',
};

const ORDERED_RE = /^(\d+)\.\s/;
const ANY_PREFIX_RE = /^(#{1,6}\s|>\s|[-*+]\s|\d+\.\s|\s{4})/;

/** The block type of the line containing `index`. */
export function blockTypeAt(text: string, index: number): BlockType {
  const line = text.slice(lineStart(text, index), lineEnd(text, index));
  if (/^#\s/.test(line)) return 'h1';
  if (/^##\s/.test(line)) return 'h2';
  if (/^###\s/.test(line)) return 'h3';
  if (/^>\s/.test(line)) return 'quote';
  if (/^[-*+]\s/.test(line)) return 'bullet';
  if (ORDERED_RE.test(line)) return 'ordered';
  if (/^\s{4}\S/.test(line)) return 'code';
  return 'paragraph';
}

/**
 * Apply (or, when already applied, remove) a block prefix across every selected line.
 *
 * Toggling off returns the lines to plain paragraphs, so tapping "Quote" twice is a true
 * undo rather than stacking `> > `.
 */
export function toggleBlock(text: string, selection: Selection, type: BlockType): EditResult {
  const lines = selectedLines(text, selection);
  const allMatch = lines.every((line) => blockTypeAt(text, line.start) === type);
  const target: BlockType = allMatch ? 'paragraph' : type;

  let out = '';
  let cursor = 0;
  let delta = 0;
  let firstDelta = 0;
  let ordinal = 1;

  for (const [i, line] of lines.entries()) {
    const body = text.slice(line.start, line.end);
    const stripped = body.replace(ANY_PREFIX_RE, '');
    const prefix = target === 'paragraph'
      ? ''
      : target === 'ordered'
        ? `${ordinal}. `
        : BLOCK_PREFIX[target];
    if (target === 'ordered') ordinal += 1;

    const replacement = `${prefix}${stripped}`;
    out += text.slice(cursor, line.start) + replacement;
    cursor = line.end;

    const change = replacement.length - body.length;
    if (i === 0) firstDelta = change;
    delta += change;
  }
  out += text.slice(cursor);

  const { start, end } = normalize(selection);
  // Shift the cursor by the prefix change on its own line so it stays on the same character,
  // and never let it slide back past the start of that line when a prefix is removed.
  const nextStart = Math.max(lines[0].start, start + firstDelta);
  return {
    text: out,
    selection: { start: nextStart, end: Math.max(nextStart, end + delta) },
  };
}

/**
 * Insert a Markdown link. When text is selected it becomes the label; otherwise the URL is
 * used as the label and the label is selected so it can be typed over.
 */
export function insertLink(text: string, selection: Selection, url: string, label?: string): EditResult {
  const { start, end } = normalize(selection);
  const selected = text.slice(start, end);
  const finalLabel = label ?? (selected || url);
  const markdown = `[${finalLabel}](${url})`;

  return {
    text: text.slice(0, start) + markdown + text.slice(end),
    selection: selected
      ? { start: start + markdown.length, end: start + markdown.length }
      : { start: start + 1, end: start + 1 + finalLabel.length },
  };
}

/** Insert an image. Always collapses the cursor after the inserted markdown. */
export function insertImage(text: string, selection: Selection, url: string, alt = ''): EditResult {
  const { start, end } = normalize(selection);
  const markdown = `![${alt}](${url})`;
  return {
    text: text.slice(0, start) + markdown + text.slice(end),
    selection: { start: start + markdown.length, end: start + markdown.length },
  };
}

/**
 * Continue a list when the user presses Enter.
 *
 * On an empty list item the marker is removed instead — pressing Enter twice ends the list,
 * which is the universal convention. Returns null when the line isn't a list item.
 */
export function continueList(text: string, selection: Selection): EditResult | null {
  const { start } = normalize(selection);
  const from = lineStart(text, start);
  const line = text.slice(from, lineEnd(text, start));

  const bullet = /^([-*+])\s(.*)$/.exec(line);
  const ordered = /^(\d+)\.\s(.*)$/.exec(line);
  if (!bullet && !ordered) return null;

  const body = (bullet ? bullet[2] : ordered![2]).trim();
  if (body.length === 0) {
    // Empty item: drop the marker and end the list.
    return {
      text: text.slice(0, from) + text.slice(from + line.length),
      selection: { start: from, end: from },
    };
  }

  const marker = bullet ? `${bullet[1]} ` : `${Number(ordered![1]) + 1}. `;
  const insertion = `\n${marker}`;
  return {
    text: text.slice(0, start) + insertion + text.slice(start),
    selection: { start: start + insertion.length, end: start + insertion.length },
  };
}

/** Plain-text length, ignoring Markdown syntax — for a word/character counter. */
export function plainTextLength(text: string): number {
  return stripMarkdown(text).length;
}

export function wordCount(text: string): number {
  const plain = stripMarkdown(text).trim();
  return plain ? plain.split(/\s+/).length : 0;
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(~~)(.*?)\1/g, '$2')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')
    .replace(/(^|[^_])_([^_]+)_/g, '$1$2')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/^(#{1,6}\s|>\s|[-*+]\s|\d+\.\s)/gm, '');
}

export interface InlineToken {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  href?: string;
}

export interface MarkdownBlock {
  type: BlockType;
  tokens: InlineToken[];
  /** Set for ordered list items. */
  ordinal?: number;
  /** Raw source, for `code` blocks where inline parsing must not run. */
  raw: string;
}

// The single-marker (italic) branch requires its content to start with a non-marker character.
// Without that, an empty pair like `****` — exactly what pressing Bold with no selection
// produces — matches as italic-of-`*` and the preview drops two asterisks while you type.
const INLINE_RE = /(\*\*|__)(.+?)\1|(~~)(.+?)\3|(\*|_)([^*_].*?)\5|`([^`]+)`|\[([^\]]*)\]\(([^)]*)\)/g;

/**
 * Parse one line's inline Markdown into styled tokens.
 *
 * Deliberately a single-pass scanner rather than nested recursion: nesting emphasis inside
 * emphasis is rare in the content this editor produces, and a scanner cannot run away on
 * malformed input the way a naive recursive parser can.
 */
export function parseInline(line: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;
  INLINE_RE.lastIndex = 0;

  let match: RegExpExecArray | null = INLINE_RE.exec(line);
  while (match) {
    if (match.index > last) tokens.push({ text: line.slice(last, match.index) });

    if (match[2] !== undefined) tokens.push({ text: match[2], bold: true });
    else if (match[4] !== undefined) tokens.push({ text: match[4], strikethrough: true });
    else if (match[6] !== undefined) tokens.push({ text: match[6], italic: true });
    else if (match[7] !== undefined) tokens.push({ text: match[7], code: true });
    else if (match[8] !== undefined) tokens.push({ text: match[8] || match[9], href: match[9] });

    last = match.index + match[0].length;
    match = INLINE_RE.exec(line);
  }

  if (last < line.length) tokens.push({ text: line.slice(last) });
  // A blank line still needs one token so the renderer can reserve its height.
  if (tokens.length === 0) tokens.push({ text: '' });
  return tokens;
}

/** Parse Markdown source into renderable blocks, one per line. */
export function parseMarkdown(source: string): MarkdownBlock[] {
  return source.split('\n').map((line) => {
    const type = blockTypeAt(line, 0);
    const ordered = ORDERED_RE.exec(line);
    const body = type === 'code' ? line.slice(4) : line.replace(ANY_PREFIX_RE, '');
    return {
      type,
      raw: body,
      ordinal: ordered ? Number(ordered[1]) : undefined,
      // Code blocks are literal: parsing them would eat the very syntax being displayed.
      tokens: type === 'code' ? [{ text: body, code: true }] : parseInline(body),
    };
  });
}
