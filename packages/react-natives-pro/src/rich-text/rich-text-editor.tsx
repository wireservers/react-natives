import React from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { WithLicenseWatermark } from '../licensing/watermark';
import {
  blockTypeAt,
  continueList,
  hasInlineMark,
  insertImage,
  insertLink,
  parseMarkdown,
  toggleBlock,
  toggleInline,
  wordCount,
  type BlockType,
  type EditResult,
  type InlineMark,
  type MarkdownBlock,
  type Selection,
} from './rich-text-utils';

export interface RichTextEditorProps {
  /** Markdown source. Controlled when supplied. */
  value?: string;
  defaultValue?: string;
  onChange?: (markdown: string) => void;
  placeholder?: string;
  /** Toolbar buttons to show, in order. */
  tools?: ToolId[];
  /** Show a live preview beside (wide) or below (narrow) the editor. */
  preview?: boolean;
  /** Show the word/character counter. */
  counter?: boolean;
  maxLength?: number;
  minHeight?: number;
  editable?: boolean;
  /** Called when the link button is pressed. Return a URL, or null to cancel. */
  onRequestLink?: () => Promise<string | null>;
  onRequestImage?: () => Promise<string | null>;
  className?: string;
}

export type ToolId =
  | 'bold' | 'italic' | 'strikethrough' | 'code'
  | 'h1' | 'h2' | 'h3' | 'quote' | 'bullet' | 'ordered' | 'codeblock'
  | 'link' | 'image';

const DEFAULT_TOOLS: ToolId[] = [
  'bold', 'italic', 'strikethrough', 'code',
  'h1', 'h2', 'quote', 'bullet', 'ordered',
  'link',
];

const TOOL_LABEL: Record<ToolId, string> = {
  bold: 'B', italic: 'I', strikethrough: 'S', code: '‹›',
  h1: 'H1', h2: 'H2', h3: 'H3', quote: '❝', bullet: '•', ordered: '1.',
  codeblock: '{ }', link: '🔗', image: '🖼',
};

const TOOL_NAME: Record<ToolId, string> = {
  bold: 'Bold', italic: 'Italic', strikethrough: 'Strikethrough', code: 'Inline code',
  h1: 'Heading 1', h2: 'Heading 2', h3: 'Heading 3', quote: 'Quote',
  bullet: 'Bulleted list', ordered: 'Numbered list', codeblock: 'Code block',
  link: 'Insert link', image: 'Insert image',
};

const INLINE_TOOLS: Partial<Record<ToolId, InlineMark>> = {
  bold: 'bold', italic: 'italic', strikethrough: 'strikethrough', code: 'code',
};

const BLOCK_TOOLS: Partial<Record<ToolId, BlockType>> = {
  h1: 'h1', h2: 'h2', h3: 'h3', quote: 'quote', bullet: 'bullet', ordered: 'ordered', codeblock: 'code',
};

/**
 * Markdown-backed rich text editor with a formatting toolbar and live preview.
 *
 * React Native has no `contentEditable`, so this edits Markdown source in a `TextInput` and
 * renders a styled preview alongside — the one approach that behaves identically on all
 * three platforms and leaves the user with portable content.
 */
export function RichTextEditor({
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = 'Write something…',
  tools = DEFAULT_TOOLS,
  preview = false,
  counter = true,
  maxLength,
  minHeight = 160,
  editable = true,
  onRequestLink,
  onRequestImage,
  className,
}: RichTextEditorProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [selection, setSelection] = React.useState<Selection>({ start: 0, end: 0 });
  const inputRef = React.useRef<TextInput | null>(null);

  const value = controlledValue ?? internalValue;

  const apply = (result: EditResult) => {
    if (controlledValue === undefined) setInternalValue(result.text);
    onChange?.(result.text);
    setSelection(result.selection);
    // The TextInput keeps focus, so the user can carry on typing inside the new formatting.
    inputRef.current?.focus();
  };

  const setText = (text: string) => {
    if (controlledValue === undefined) setInternalValue(text);
    onChange?.(text);
  };

  const runTool = async (tool: ToolId) => {
    const mark = INLINE_TOOLS[tool];
    if (mark) { apply(toggleInline(value, selection, mark)); return; }

    const block = BLOCK_TOOLS[tool];
    if (block) { apply(toggleBlock(value, selection, block)); return; }

    if (tool === 'link') {
      const url = await onRequestLink?.();
      if (url) apply(insertLink(value, selection, url));
      return;
    }
    if (tool === 'image') {
      const url = await onRequestImage?.();
      if (url) apply(insertImage(value, selection, url));
    }
  };

  /** Is this tool currently applied at the cursor? Drives the pressed state. */
  const isActive = (tool: ToolId): boolean => {
    const mark = INLINE_TOOLS[tool];
    if (mark) return hasInlineMark(value, selection, mark);
    const block = BLOCK_TOOLS[tool];
    if (block) return blockTypeAt(value, selection.start) === block;
    return false;
  };

  // Enter inside a list continues it. Only web reports key events on a TextInput; on native
  // the same logic runs from the newline arriving in onChangeText.
  const handleKeyPress = (event: { nativeEvent: { key: string } }) => {
    if (Platform.OS !== 'web' || event.nativeEvent.key !== 'Enter') return;
    const result = continueList(value, selection);
    if (result) {
      // Handled here, so stop the newline being inserted twice.
      (event as unknown as { preventDefault?: () => void }).preventDefault?.();
      apply(result);
    }
  };

  const blocks = React.useMemo(() => (preview ? parseMarkdown(value) : []), [preview, value]);
  const words = counter ? wordCount(value) : 0;

  return (
    <WithLicenseWatermark>
      <View className={className}>
        {editable ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="rounded-t-lg border border-outline-200 bg-background-50"
            contentContainerStyle={{ padding: 4, gap: 2 }}
          >
            {tools.map((tool) => {
              const active = isActive(tool);
              return (
                <Pressable
                  key={tool}
                  onPress={() => { void runTool(tool); }}
                  accessibilityRole="button"
                  accessibilityLabel={TOOL_NAME[tool]}
                  accessibilityState={{ selected: active }}
                  className={`min-w-8 items-center justify-center rounded px-2 py-1 ${active ? 'bg-primary-100' : ''}`}
                >
                  <Text
                    className={`text-xs ${active ? 'text-primary-700' : 'text-typography-600'} ${
                      tool === 'bold' ? 'font-bold' : ''
                    } ${tool === 'italic' ? 'italic' : ''}`}
                  >
                    {TOOL_LABEL[tool]}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : null}

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={setText}
          selection={selection}
          onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          editable={editable}
          multiline
          maxLength={maxLength}
          accessibilityLabel={placeholder}
          className={`border border-outline-200 px-3 py-2 text-sm text-typography-900 ${
            editable ? 'border-t-0' : 'rounded-t-lg'
          } ${preview || counter ? '' : 'rounded-b-lg'}`}
          style={{ minHeight, textAlignVertical: 'top' }}
        />

        {counter ? (
          <View className="flex-row justify-end gap-3 rounded-b-lg border border-t-0 border-outline-200 bg-background-50 px-3 py-1">
            <Text className="text-[10px] text-typography-400">{words} words</Text>
            <Text className="text-[10px] text-typography-400">
              {value.length}
              {maxLength != null ? ` / ${maxLength}` : ''}
            </Text>
          </View>
        ) : null}

        {preview ? (
          <View className="mt-3 rounded-lg border border-outline-200 bg-background-0 p-3">
            <Text className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-typography-400">
              Preview
            </Text>
            <MarkdownPreview blocks={blocks} />
          </View>
        ) : null}
      </View>
    </WithLicenseWatermark>
  );
}

/** Renders parsed Markdown blocks. Exported so a read-only view can skip the editor. */
export function MarkdownPreview({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <View>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </View>
  );
}

function BlockView({ block }: { block: MarkdownBlock }) {
  const content = (
    <Text>
      {block.tokens.map((token, i) => (
        <Text
          key={i}
          className={[
            token.bold ? 'font-bold' : '',
            token.italic ? 'italic' : '',
            token.strikethrough ? 'line-through' : '',
            token.code ? 'font-mono text-error-600' : '',
            token.href ? 'text-primary-600 underline' : '',
          ].filter(Boolean).join(' ')}
        >
          {token.text}
        </Text>
      ))}
    </Text>
  );

  switch (block.type) {
    case 'h1':
      return <Text className="mb-1 mt-2 text-xl font-bold text-typography-900">{content}</Text>;
    case 'h2':
      return <Text className="mb-1 mt-2 text-lg font-bold text-typography-900">{content}</Text>;
    case 'h3':
      return <Text className="mb-1 mt-2 text-base font-semibold text-typography-900">{content}</Text>;
    case 'quote':
      return (
        <View className="my-1 border-l-2 border-outline-300 pl-3">
          <Text className="text-sm italic text-typography-600">{content}</Text>
        </View>
      );
    case 'bullet':
      return (
        <View className="flex-row gap-2">
          <Text className="text-sm text-typography-500">•</Text>
          <Text className="flex-1 text-sm text-typography-800">{content}</Text>
        </View>
      );
    case 'ordered':
      return (
        <View className="flex-row gap-2">
          <Text className="text-sm text-typography-500">{block.ordinal}.</Text>
          <Text className="flex-1 text-sm text-typography-800">{content}</Text>
        </View>
      );
    case 'code':
      return (
        <View className="my-1 rounded bg-background-100 px-2 py-1">
          <Text className="font-mono text-xs text-typography-800">{block.raw}</Text>
        </View>
      );
    default:
      return <Text className="text-sm leading-6 text-typography-800">{content}</Text>;
  }
}

RichTextEditor.displayName = 'RichTextEditor';
