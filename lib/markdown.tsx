import type { ReactNode } from "react";

/**
 * Minimal markdown renderer for trusted local content.
 * Supports: ## headings, > blockquotes, - lists, paragraphs,
 * **bold**, *italic*. No raw HTML.
 */

function inline(text: string, keyBase: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    return <span key={key}>{part}</span>;
  });
}

export function renderMarkdown(md: string): ReactNode[] {
  const blocks = md.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((block, i) => {
    const key = `b${i}`;
    if (block.startsWith("## ")) {
      return <h2 key={key}>{inline(block.slice(3), key)}</h2>;
    }
    if (block.startsWith("> ")) {
      const text = block
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ");
      return <blockquote key={key}>{inline(text, key)}</blockquote>;
    }
    if (/^-\s/.test(block)) {
      const items = block
        .split("\n")
        .filter((l) => /^-\s/.test(l))
        .map((l) => l.replace(/^-\s+/, ""));
      return (
        <ul key={key}>
          {items.map((item, j) => (
            <li key={`${key}-${j}`}>{inline(item, `${key}-${j}`)}</li>
          ))}
        </ul>
      );
    }
    return <p key={key}>{inline(block.replace(/\n/g, " "), key)}</p>;
  });
}
