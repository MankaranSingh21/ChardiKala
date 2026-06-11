/**
 * One-time extraction of Sri Guru Granth Sahib from the Shabad OS database
 * (@shabados/database, dist/master.sqlite) into per-ang JSON files.
 *
 * Primary Gurmukhi text: SGPC Shabadaarth edition (asset SSA2).
 * English translation:   Dr. Sant Singh Khalsa (asset DSSK).
 * Transliteration:       generated with gurmukhi-utils' toEnglish().
 *
 * Output:
 *   content/gurbani/angs/0001.json … 1430.json
 *   content/gurbani/meta.json
 */
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { toEnglish, stripVishraams } = require("gurmukhi-utils");

const ROOT = process.cwd();
const DB_PATH = path.join(
  ROOT,
  "node_modules/@shabados/database/dist/master.sqlite"
);
const OUT_DIR = path.join(ROOT, "content/gurbani");
const ANG_DIR = path.join(OUT_DIR, "angs");
const TOTAL_ANGS = 1430;

const db = new DatabaseSync(DB_PATH, { readOnly: true });

const rows = db
  .prepare(
    `SELECT CAST(json_extract(p.additional, '$.page') AS INTEGER) AS page,
            CAST(json_extract(p.additional, '$.line') AS INTEGER) AS lineNo,
            p.data AS gurmukhi,
            t.data AS english,
            l.line_group_id AS shabadId
     FROM asset_lines p
     JOIN lines l ON l.id = p.line_id
     JOIN line_groups lg ON lg.id = l.line_group_id
     JOIN sections s ON s.id = lg.section_id
     LEFT JOIN asset_lines t
       ON t.line_id = p.line_id AND t.asset_id = 'DSSK' AND t.type = 'translation'
     WHERE p.asset_id = 'SSA2' AND p.type = 'primary' AND s.source_id = 'SGGS'
     ORDER BY page, lineNo`
  )
  .all();

console.log(`Fetched ${rows.length} lines from the database.`);

const byAng = new Map();
for (const row of rows) {
  if (!byAng.has(row.page)) byAng.set(row.page, []);
  const gurmukhi = stripVishraams(String(row.gurmukhi));
  byAng.get(row.page).push({
    gurmukhi,
    translit: toEnglish(gurmukhi),
    english: row.english ? String(row.english) : "",
    shabadId: row.shabadId,
  });
}

fs.rmSync(ANG_DIR, { recursive: true, force: true });
fs.mkdirSync(ANG_DIR, { recursive: true });

let missing = [];
let emptyTranslations = 0;
for (let ang = 1; ang <= TOTAL_ANGS; ang++) {
  const lines = byAng.get(ang);
  if (!lines || lines.length === 0) {
    missing.push(ang);
    continue;
  }
  emptyTranslations += lines.filter((l) => !l.english).length;
  const file = path.join(ANG_DIR, `${String(ang).padStart(4, "0")}.json`);
  fs.writeFileSync(file, JSON.stringify({ ang, lines }, null, 1));
}

const meta = {
  source:
    "Shabad OS Database (github.com/shabados/database) — Gurmukhi text from the SGPC Shabadaarth edition of Sri Guru Granth Sahib Ji",
  translationAttribution:
    "English translation by Dr. Sant Singh Khalsa, via the Shabad OS Database",
  transliterationAttribution:
    "Roman transliteration generated with gurmukhi-utils (Shabad OS)",
  extractedAt: new Date().toISOString(),
  notes:
    "Vishraam (pause) punctuation has been stripped from the Gurmukhi for display. Text content of the Shabad OS database is public domain; treat the bani with respect — derogatory alteration is forbidden by the database licence and by conscience.",
  totalAngs: TOTAL_ANGS,
  totalLines: rows.length,
};
fs.writeFileSync(
  path.join(OUT_DIR, "meta.json"),
  JSON.stringify(meta, null, 2)
);

console.log(`Wrote ${TOTAL_ANGS - missing.length} ang files to ${ANG_DIR}`);
if (missing.length) console.error(`MISSING ANGS: ${missing.join(", ")}`);
if (emptyTranslations)
  console.warn(`${emptyTranslations} lines have no English translation.`);
if (missing.length) process.exit(1);
