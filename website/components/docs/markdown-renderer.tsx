import React from "react";
import { View, Text, ScrollView } from "react-native";
import { CodeBlock } from "./code-block";

interface Colors {
  heading: string;
  text: string;
  cardBg: string;
  border: string;
  docBg: string;
}

interface Props {
  content: string;
  c: Colors;
  isSmall?: boolean;
}

type Token =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; lang: string; text: string }
  | { type: "blockquote"; text: string }
  | { type: "hr" }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "paragraph"; text: string }
  | { type: "blank" };

function tokenize(markdown: string): Token[] {
  const lines = markdown.split("\n");
  const tokens: Token[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      tokens.push({ type: "code", lang, text: codeLines.join("\n") });
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      tokens.push({ type: "h3", text: line.slice(4) });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      tokens.push({ type: "h2", text: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      tokens.push({ type: "h1", text: line.slice(2) });
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      tokens.push({ type: "hr" });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [line.slice(2)];
      i++;
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      tokens.push({ type: "blockquote", text: quoteLines.join("\n") });
      continue;
    }

    // Table
    if (line.includes("|") && i + 1 < lines.length && /^\|?[-| :]+\|?$/.test(lines[i + 1])) {
      const parseRow = (r: string) =>
        r
          .split("|")
          .map((c) => c.trim())
          .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1 || (arr.length === 1));
      const header = parseRow(line);
      i += 2; // skip separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(parseRow(lines[i]));
        i++;
      }
      tokens.push({ type: "table", header, rows });
      continue;
    }

    // Ordered or unordered list
    if (/^(\s*)([-*+]|\d+\.) /.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (
        i < lines.length &&
        (/^(\s*)([-*+]|\d+\.) /.test(lines[i]) || (items.length > 0 && /^\s{2,}/.test(lines[i])))
      ) {
        const match = lines[i].match(/^(?:\s*(?:[-*+]|\d+\.) )(.*)/);
        if (match) items.push(match[1]);
        i++;
      }
      tokens.push({ type: "list", ordered, items });
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      tokens.push({ type: "blank" });
      i++;
      continue;
    }

    // Paragraph — accumulate consecutive non-special lines
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith(">") &&
      !/^---+$/.test(lines[i].trim()) &&
      !/^(\s*)([-*+]|\d+\.) /.test(lines[i]) &&
      !lines[i].includes("|")
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    tokens.push({ type: "paragraph", text: paraLines.join(" ") });
  }

  return tokens;
}

/** Render inline markdown: **bold**, `code`, [text](url), remaining plain text */
function InlineText({ text, color, size = 14 }: { text: string; color: string; size?: number }) {
  // Split on bold (**...**), inline code (`...`), or links ([text](url))
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return (
    <Text style={{ fontSize: size, color, lineHeight: size * 1.6 }}>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <Text key={idx} style={{ fontWeight: "700" }}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <Text
              key={idx}
              style={{
                fontFamily: "monospace",
                fontSize: size - 1,
                backgroundColor: "rgba(127,127,127,0.15)",
                color,
              }}
            >
              {part.slice(1, -1)}
            </Text>
          );
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return (
            <Text key={idx} style={{ color: "#43C3E6", textDecorationLine: "underline" }}>
              {linkMatch[1]}
            </Text>
          );
        }
        // Strip badge markdown images ![...](...)
        return part.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
      })}
    </Text>
  );
}

export function MarkdownRenderer({ content, c, isSmall = false }: Props) {
  const tokens = tokenize(content);
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (token.type) {
      case "h1":
        elements.push(
          <Text
            key={key++}
            style={{
              fontSize: isSmall ? 22 : 28,
              fontWeight: "800",
              color: c.heading,
              marginTop: 8,
              marginBottom: 8,
              lineHeight: isSmall ? 28 : 36,
            }}
          >
            {token.text}
          </Text>
        );
        break;

      case "h2":
        elements.push(
          <View key={key++} style={{ marginTop: 28, marginBottom: 12 }}>
            <Text
              style={{
                fontSize: isSmall ? 18 : 22,
                fontWeight: "700",
                color: c.heading,
              }}
            >
              {token.text}
            </Text>
            <View
              style={{
                height: 2,
                backgroundColor: c.border,
                marginTop: 6,
              }}
            />
          </View>
        );
        break;

      case "h3":
        elements.push(
          <Text
            key={key++}
            style={{
              fontSize: isSmall ? 15 : 17,
              fontWeight: "600",
              color: c.heading,
              marginTop: 20,
              marginBottom: 8,
            }}
          >
            {token.text}
          </Text>
        );
        break;

      case "code":
        elements.push(
          <View key={key++} style={{ marginVertical: 10 }}>
            <CodeBlock code={token.text} />
          </View>
        );
        break;

      case "blockquote":
        elements.push(
          <View
            key={key++}
            style={{
              borderLeftWidth: 3,
              borderLeftColor: "#43C3E6",
              paddingLeft: 12,
              paddingVertical: 6,
              marginVertical: 10,
              backgroundColor: "rgba(67,195,230,0.07)",
              borderRadius: 4,
            }}
          >
            <InlineText text={token.text} color={c.text} size={13} />
          </View>
        );
        break;

      case "hr":
        elements.push(
          <View
            key={key++}
            style={{
              height: 1,
              backgroundColor: c.border,
              marginVertical: 20,
            }}
          />
        );
        break;

      case "table": {
        const { header, rows } = token;
        elements.push(
          <View
            key={key++}
            style={{
              borderWidth: 1,
              borderColor: c.border,
              borderRadius: 8,
              overflow: "hidden",
              marginVertical: 10,
            }}
          >
            {/* Header row */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: c.cardBg,
                borderBottomWidth: 1,
                borderBottomColor: c.border,
              }}
            >
              {header.map((h, ci) => (
                <Text
                  key={ci}
                  style={{
                    flex: 1,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    fontWeight: "600",
                    fontSize: 13,
                    color: c.heading,
                  }}
                >
                  {h}
                </Text>
              ))}
            </View>
            {/* Data rows */}
            {rows.map((row, ri) => (
              <View
                key={ri}
                style={{
                  flexDirection: "row",
                  borderBottomWidth: ri < rows.length - 1 ? 1 : 0,
                  borderBottomColor: c.border,
                }}
              >
                {row.map((cell, ci) => (
                  <View key={ci} style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 8 }}>
                    <InlineText text={cell} color={ci === 0 ? c.heading : c.text} size={13} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        );
        break;
      }

      case "list":
        elements.push(
          <View key={key++} style={{ marginVertical: 6, paddingLeft: 4 }}>
            {token.items.map((item, li) => (
              <View
                key={li}
                style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 5 }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: c.heading,
                    marginRight: 8,
                    marginTop: 1,
                    minWidth: 16,
                  }}
                >
                  {token.ordered ? `${li + 1}.` : "•"}
                </Text>
                <View style={{ flex: 1 }}>
                  <InlineText text={item} color={c.text} />
                </View>
              </View>
            ))}
          </View>
        );
        break;

      case "paragraph": {
        const text = token.text.trim();
        if (!text) break;
        // Skip pure badge/image lines
        if (/^!\[/.test(text)) break;
        elements.push(
          <View key={key++} style={{ marginVertical: 6 }}>
            <InlineText text={text} color={c.text} />
          </View>
        );
        break;
      }

      case "blank":
        // collapse multiple blanks
        if (elements.length > 0 && (elements[elements.length - 1] as any)?.key !== "blank") {
          elements.push(<View key={`blank-${key++}`} style={{ height: 4 }} />);
        }
        break;
    }
  }

  return <>{elements}</>;
}
