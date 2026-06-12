import { getAng, TOTAL_ANGS, type GurbaniLine } from "./gurbani";

export type Hukamnama = {
  /** True when fetched live from a Darbar Sahib feed; false for the local fallback reading. */
  fromApi: boolean;
  dateLabel: string;
  nanakshahiLabel?: string;
  ang: number;
  raag?: string;
  writer?: string;
  lines: GurbaniLine[];
};

/** Refetch window (seconds). The hukamnama changes once a day, before dawn IST;
 * a short window keeps the site from lagging a stale upstream for long. */
export const HUKAM_REVALIDATE = 900;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ---------- BaniDB (primary): api.banidb.com — SikhiToTheMax's feed ---------- */

type BaniDbResponse = {
  date?: { gregorian?: { month?: number; date?: number; year?: number } };
  shabads?: Array<{
    shabadInfo?: {
      pageNo?: number;
      raag?: { english?: string; unicode?: string };
      writer?: { english?: string };
    };
    verses?: Array<{
      verse?: { unicode?: string };
      translation?: { en?: { ssk?: string; bdb?: string } };
      transliteration?: { english?: string };
    }>;
  }>;
};

async function fromBaniDb(): Promise<Hukamnama | null> {
  const res = await fetch("https://api.banidb.com/v2/hukamnamas/today", {
    next: { revalidate: HUKAM_REVALIDATE },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as BaniDbResponse;
  const shabads = json.shabads ?? [];
  if (!shabads.length) return null;

  const lines: GurbaniLine[] = shabads.flatMap((s) =>
    (s.verses ?? [])
      .map((v) => ({
        gurmukhi: v.verse?.unicode ?? "",
        translit: v.transliteration?.english ?? "",
        english: v.translation?.en?.ssk ?? v.translation?.en?.bdb ?? "",
      }))
      .filter((l) => l.gurmukhi)
  );
  if (!lines.length) return null;

  const info = shabads[0].shabadInfo;
  const g = json.date?.gregorian;
  const dateLabel =
    g?.date && g?.month && g?.year
      ? `${g.date} ${MONTHS[g.month - 1] ?? g.month} ${g.year}`
      : "today";

  return {
    fromApi: true,
    dateLabel,
    ang: info?.pageNo ?? 0,
    raag: info?.raag?.english ?? info?.raag?.unicode,
    writer: info?.writer?.english,
    lines,
  };
}

/* ---------- GurbaniNow (secondary) ---------- */

type GurbaniNowResponse = {
  error?: boolean;
  date?: {
    gregorian?: { date?: number; month?: string; year?: number };
    nanakshahi?: { english?: { date?: number; month?: string; year?: number } };
  };
  hukamnamainfo?: {
    pageno?: number;
    raag?: { unicode?: string; english?: string };
    writer?: { english?: string };
  };
  hukamnama?: Array<{
    line?: {
      gurmukhi?: { unicode?: string };
      transliteration?: { english?: { text?: string } };
      translation?: { english?: { default?: string } };
    };
  }>;
};

async function fromGurbaniNow(): Promise<Hukamnama | null> {
  const res = await fetch("https://api.gurbaninow.com/v2/hukamnama/today", {
    next: { revalidate: HUKAM_REVALIDATE },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as GurbaniNowResponse;
  if (json.error || !json.hukamnama?.length) return null;

  const lines: GurbaniLine[] = json.hukamnama
    .map((entry) => ({
      gurmukhi: entry.line?.gurmukhi?.unicode ?? "",
      translit: entry.line?.transliteration?.english?.text ?? "",
      english: entry.line?.translation?.english?.default ?? "",
    }))
    .filter((l) => l.gurmukhi);
  if (!lines.length) return null;

  const g = json.date?.gregorian;
  const n = json.date?.nanakshahi?.english;
  return {
    fromApi: true,
    dateLabel: g ? `${g.date} ${g.month} ${g.year}` : "today",
    nanakshahiLabel: n ? `${n.date} ${n.month} ${n.year} NS` : undefined,
    ang: json.hukamnamainfo?.pageno ?? 0,
    raag:
      json.hukamnamainfo?.raag?.english ?? json.hukamnamainfo?.raag?.unicode,
    writer: json.hukamnamainfo?.writer?.english,
    lines,
  };
}

/* ---------- Local fallback ---------- */

/**
 * Deterministic fallback when both live feeds are unreachable: a daily ang
 * chosen by date from the local extraction, clearly labelled as such.
 */
function fallbackReading(): Hukamnama {
  const now = new Date();
  const daysSinceEpoch = Math.floor(now.getTime() / 86_400_000);
  // Stride co-prime with 1430 so the cycle visits every ang.
  const ang = ((daysSinceEpoch * 739) % TOTAL_ANGS) + 1;
  const data = getAng(ang);
  return {
    fromApi: false,
    dateLabel: now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    ang,
    lines: data?.lines ?? [],
  };
}

export async function getHukamnama(): Promise<Hukamnama> {
  try {
    const banidb = await fromBaniDb();
    if (banidb) return banidb;
  } catch {
    /* fall through */
  }
  try {
    const gurbaninow = await fromGurbaniNow();
    if (gurbaninow) return gurbaninow;
  } catch {
    /* fall through */
  }
  return fallbackReading();
}
