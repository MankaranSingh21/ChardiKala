import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type LanguageFragment = {
  gurmukhi: string;
  translit: string;
  gloss: string;
};

export type Region = {
  id: string;
  name: string;
  oldName: string;
  punjabi: string;
  epithet: string;
  hue: string;
  geography: string;
  people: string;
  philosophy: string;
  fragments: LanguageFragment[];
  excerpt: string;
};

export type RegionWithExcerpt = Region & {
  /** Excerpt prose, split into paragraphs. Inline *italics* preserved. */
  excerptParagraphs: string[];
};

export type TimelineEvent = {
  year: string;
  era: string;
  title: string;
  body: string;
};

export type Person = {
  id: string;
  name: string;
  punjabi: string;
  role: string;
  era: string;
  region: string;
  quote: string;
  note: string;
};

export type GlossaryEntry = {
  term: string;
  gurmukhi: string;
  kind: "inherited" | "new";
  definition: string;
};

function readJson<T>(file: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

export function getRegions(): RegionWithExcerpt[] {
  const regions = readJson<Region[]>("regions.json");
  return regions.map((region) => {
    const md = fs.readFileSync(
      path.join(CONTENT_DIR, "excerpts", region.excerpt),
      "utf-8"
    );
    const excerptParagraphs = md
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\n/g, " ").trim())
      .filter(Boolean);
    return { ...region, excerptParagraphs };
  });
}

export function getTimeline(): TimelineEvent[] {
  return readJson<TimelineEvent[]>("timeline.json");
}

export function getPeople(): Person[] {
  return readJson<Person[]>("people.json");
}

export function getGlossary(): GlossaryEntry[] {
  return readJson<GlossaryEntry[]>("glossary.json");
}

export type Essay = {
  slug: string;
  title: string;
  gurmukhi?: string;
  kicker: string;
  summary: string;
  order: number;
  body: string;
};

export function getEssays(): Essay[] {
  // Lazy import keeps gray-matter out of paths that don't need it
  const matter = require("gray-matter") as typeof import("gray-matter");
  const dir = path.join(CONTENT_DIR, "essays");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(dir, file), "utf-8")
      );
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? file),
        gurmukhi: data.gurmukhi ? String(data.gurmukhi) : undefined,
        kicker: String(data.kicker ?? ""),
        summary: String(data.summary ?? ""),
        order: Number(data.order ?? 99),
        body: content.trim(),
      } satisfies Essay;
    })
    .sort((a, b) => a.order - b.order);
}

export function getEssay(slug: string): Essay | null {
  return getEssays().find((e) => e.slug === slug) ?? null;
}
