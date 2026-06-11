import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CategoryId, EncyclopediaEntry, EncyclopediaIndexItem } from "./encyclopedia-shared";

export { CATEGORIES } from "./encyclopedia-shared";
export type { CategoryId, EncyclopediaEntry, EncyclopediaIndexItem } from "./encyclopedia-shared";

const ENTRIES_DIR = path.join(process.cwd(), "content", "encyclopedia");

let cache: EncyclopediaEntry[] | null = null;

export function getAllEntries(): EncyclopediaEntry[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  if (!fs.existsSync(ENTRIES_DIR)) return [];
  const entries = fs
    .readdirSync(ENTRIES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(ENTRIES_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        gurmukhi: data.gurmukhi ? String(data.gurmukhi) : undefined,
        translit: data.translit ? String(data.translit) : undefined,
        category: (data.category ?? "concepts") as CategoryId,
        summary: String(data.summary ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        related: Array.isArray(data.related) ? data.related.map(String) : [],
        body: content.trim(),
      } satisfies EncyclopediaEntry;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
  cache = entries;
  return entries;
}

export function getIndex(): EncyclopediaIndexItem[] {
  return getAllEntries().map(({ body: _body, ...rest }) => rest);
}

export function getEntry(slug: string): EncyclopediaEntry | null {
  return getAllEntries().find((e) => e.slug === slug) ?? null;
}
