import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { BRAND_COLOR } from '@wireservers-ui/react-natives';

interface CodeBlockProps {
  code: string;
  showLineNumbers?: boolean;
  showHeader?: boolean;
}

export function CodeBlock({ code, showLineNumbers = false, showHeader = true }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <View style={{ backgroundColor: '#111827', borderRadius: showHeader ? 16 : 0, overflow: 'hidden' }}>
      {showHeader && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#1F2937' }}>
          <Text style={{ fontSize: 12, color: '#9CA3AF', fontWeight: '500' }}>Code</Text>
          <Pressable onPress={handleCopy}>
            <Text style={{ color: copied ? '#34D399' : '#A0ECFF', fontSize: 12, fontWeight: '600' }}>
              {copied ? 'Copied!' : 'Copy'}
            </Text>
          </Pressable>
        </View>
      )}
      <View style={{ position: 'relative' }}>
        {!showHeader && (
          <Pressable
            onPress={handleCopy}
            style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, backgroundColor: '#1F2937', borderRadius: 6, padding: 6 }}
          >
            <Text style={{ color: copied ? '#34D399' : '#9CA3AF', fontSize: 16 }}>
              {copied ? '✓' : '⧉'}
            </Text>
          </Pressable>
        )}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ padding: 16, flexDirection: 'row' }}>
            {showLineNumbers && (
              <View style={{ marginRight: 16, alignItems: 'flex-end' }}>
                {lines.map((_, i) => (
                  <Text
                    key={i}
                    style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 20, color: '#4B5563' }}
                    selectable={false}
                  >
                    {i + 1}
                  </Text>
                ))}
              </View>
            )}
            <View>
              {lines.map((line, i) => (
                <Text
                  key={i}
                  style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 20, color: '#E5E7EB' }}
                >
                  {highlightLine(line)}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/** Minimal keyword-level syntax highlighting for JSX/TS code. */
function highlightLine(line: string): React.ReactNode {
  const tokens: { pattern: RegExp; color: string }[] = [
    // Comments
    { pattern: /(\/\/.*)$/, color: '#6B7280' },
    // Keywords
    { pattern: /\b(import|from|export|default|function|const|let|var|return|if|else)\b/, color: '#C084FC' },
    // Strings (single and double quoted)
    { pattern: /('[^']*'|"[^"]*")/, color: '#34D399' },
    // JSX tags
    { pattern: /(<\/?)([\w.]+)/, color: '#60A5FA' },
    // Props/attributes before =
    { pattern: /\b(\w+)(?==)/, color: '#93C5FD' },
    // Booleans & special values
    { pattern: /\b(true|false|null|undefined)\b/, color: '#F59E0B' },
    // Hook/function calls
    { pattern: /\b(useState|useEffect|useRef|useCallback|useMemo)\b/, color: '#FBBF24' },
  ];

  // Build segments with colors
  const segments: { text: string; color?: string }[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    let earliest: { index: number; length: number; color: string } | null = null;

    for (const { pattern, color } of tokens) {
      const match = remaining.match(pattern);
      if (match && match.index !== undefined) {
        const matchLength = match[0].length;
        if (!earliest || match.index < earliest.index) {
          earliest = { index: match.index, length: matchLength, color };
        }
      }
    }

    if (earliest) {
      if (earliest.index > 0) {
        segments.push({ text: remaining.slice(0, earliest.index) });
      }
      segments.push({ text: remaining.slice(earliest.index, earliest.index + earliest.length), color: earliest.color });
      remaining = remaining.slice(earliest.index + earliest.length);
    } else {
      segments.push({ text: remaining });
      break;
    }
  }

  if (segments.length <= 1 && !segments[0]?.color) {
    return line;
  }

  return (
    <>
      {segments.map((seg, i) =>
        seg.color ? (
          <Text key={i} style={{ color: seg.color }}>{seg.text}</Text>
        ) : (
          <Text key={i}>{seg.text}</Text>
        )
      )}
    </>
  );
}
