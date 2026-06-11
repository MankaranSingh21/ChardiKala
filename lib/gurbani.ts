import fs from "node:fs";
import path from "node:path";

const GURBANI_DIR = path.join(process.cwd(), "content", "gurbani");

export const TOTAL_ANGS = 1430;

export type GurbaniLine = {
  gurmukhi: string;
  translit: string;
  english: string;
  shabadId?: string | number;
};

export type Ang = {
  ang: number;
  lines: GurbaniLine[];
};

export type GurbaniMeta = {
  source: string;
  translationAttribution: string;
  transliterationAttribution?: string;
  extractedAt: string;
  notes?: string;
};

function angPath(ang: number): string {
  return path.join(GURBANI_DIR, "angs", `${String(ang).padStart(4, "0")}.json`);
}

export function gurbaniAvailable(): boolean {
  return fs.existsSync(angPath(1));
}

export function getAng(ang: number): Ang | null {
  if (!Number.isInteger(ang) || ang < 1 || ang > TOTAL_ANGS) return null;
  const file = angPath(ang);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as Ang;
}

export function getGurbaniMeta(): GurbaniMeta | null {
  const file = path.join(GURBANI_DIR, "meta.json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as GurbaniMeta;
}

/** The Mul Mantar — the opening line of Sri Guru Granth Sahib (ang 1). */
export function getMulMantar(): GurbaniLine | null {
  const ang = getAng(1);
  return ang?.lines[0] ?? null;
}
