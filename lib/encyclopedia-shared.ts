/** Client-safe encyclopedia constants and types (no node imports). */

export const CATEGORIES = {
  gurus: { label: "The Gurus", gurmukhi: "ਗੁਰੂ" },
  scripture: { label: "Scripture & Texts", gurmukhi: "ਬਾਣੀ" },
  concepts: { label: "Concepts", gurmukhi: "ਸਿਧਾਂਤ" },
  events: { label: "Events", gurmukhi: "ਘਟਨਾਵਾਂ" },
  people: { label: "People", gurmukhi: "ਸ਼ਖ਼ਸੀਅਤਾਂ" },
  places: { label: "Places & Institutions", gurmukhi: "ਅਸਥਾਨ" },
  practices: { label: "Practices & Ceremonies", gurmukhi: "ਰੀਤਾਂ" },
} as const;

export type CategoryId = keyof typeof CATEGORIES;

export type EncyclopediaEntry = {
  slug: string;
  title: string;
  gurmukhi?: string;
  translit?: string;
  category: CategoryId;
  summary: string;
  tags: string[];
  related: string[];
  body: string;
};

export type EncyclopediaIndexItem = Omit<EncyclopediaEntry, "body">;
