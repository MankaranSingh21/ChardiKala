# ਚੜ੍ਹਦੀ ਕਲਾ · Chardi Kala

**Sikhi in the 21st century** — a modern, open learning platform: the complete Sri Guru Granth Sahib with English translation, Sikh history, a living encyclopedia, the daily hukamnama, and essays on representation, empathy, environmentalism, and acceptance of everyone — atheists and seekers included.

No accounts, no tracking, no paywall. The langar principle, applied to information.

## Sections

- **Gurbani reader** (`/gurbani`) — all 1430 angs: Gurmukhi, roman transliteration, and English translation, line by line, with prev/next and jump-to-ang.
- **Daily Hukamnama** (`/hukamnama`) — the day's hukamnama from Sri Harmandir Sahib via the GurbaniNow API, refreshed hourly, with a local fallback reading.
- **History** (`/history`) — 1469 to the present across eight eras, the radiant chapters and the wounded ones.
- **Encyclopedia** (`/encyclopedia`) — 147 cross-linked entries: Gurus, scripture, concepts, events, people, places, practices. Searchable and filterable.
- **Sikhi Today** (`/sikhi-today`) — 15 essays on living the teachings now: mental health, caste, inclusion, work and AI, addiction, science, and a door with no lock.
- **The World of Chardi Kala** (`/world`) — a clearly marked speculative-fiction wing: an imagined Panjaab of 2124 rebuilt on Sikh principles.
- **About & sources** (`/about`) — data credits, editorial stance, and an invitation to correct us.

## Stack

Next.js 14 (App Router) · TypeScript · Framer Motion · CSS Modules. Fully content-driven: all data lives in local JSON and markdown under `content/`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Content layout

| Path | What it feeds |
| --- | --- |
| `content/gurbani/angs/*.json` | The reader — one file per ang (extracted, see below) |
| `content/history.json` | The real Sikh history timeline |
| `content/encyclopedia/*.md` | Encyclopedia entries (frontmatter: title, gurmukhi, category, related…) |
| `content/essays/*.md` | Sikhi Today essays |
| `content/regions.json`, `excerpts/`, `timeline.json`, `people.json`, `glossary.json` | The fiction wing |

Editing markdown/JSON and reloading is all it takes — no code changes needed for new encyclopedia entries or essays.

### Regenerating the Gurbani text

The reader's data is extracted from the open-source [Shabad OS Database](https://github.com/shabados/database):

```bash
npm run extract-gurbani
```

## Text credits

- Gurmukhi text: SGPC Shabadaarth edition of Sri Guru Granth Sahib Ji, via the Shabad OS Database (public-domain text content).
- English translation: Dr. Sant Singh Khalsa.
- Transliteration: generated with [gurmukhi-utils](https://github.com/shabados/gurmukhi-utils) (Shabad OS).
- Daily hukamnama: [BaniDB API](https://api.banidb.com) (the SikhiToTheMax feed), with [GurbaniNow](https://github.com/gurbaninow/api) as backup.

The bani is presented with respect; derogatory alteration is forbidden by the source licence and by conscience. Corrections are seva — bhul chuk maaf.

## Design notes

The visual language is *amrit vela* — the hour before dawn: deep indigo night warming to a saffron horizon. Type: Fraunces (display) · Newsreader (body) · Tiro Gurmukhi (ਗੁਰਮੁਖੀ).
