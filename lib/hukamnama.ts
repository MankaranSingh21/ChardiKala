import { getAng, TOTAL_ANGS, type GurbaniLine } from "./gurbani";

export type Hukamnama = {
  /** True when fetched live from the Darbar Sahib feed; false for the local fallback reading. */
  fromApi: boolean;
  dateLabel: string;
  nanakshahiLabel?: string;
  ang: number;
  raag?: string;
  writer?: string;
  lines: GurbaniLine[];
};

const API_URL = "https://api.gurbaninow.com/v2/hukamnama/today";

/* The GurbaniNow v2 response, reduced to the fields we read. */
type ApiResponse = {
  error?: boolean;
  date?: {
    gregorian?: { date?: number; month?: string; year?: number };
    nanakshahi?: {
      english?: { date?: number; month?: string; year?: number };
    };
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

/**
 * Deterministic fallback when the live feed is unreachable: a daily ang
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
    const res = await fetch(API_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return fallbackReading();
    const json = (await res.json()) as ApiResponse;
    if (json.error || !json.hukamnama?.length) return fallbackReading();

    const lines: GurbaniLine[] = json.hukamnama
      .map((entry) => ({
        gurmukhi: entry.line?.gurmukhi?.unicode ?? "",
        translit: entry.line?.transliteration?.english?.text ?? "",
        english: entry.line?.translation?.english?.default ?? "",
      }))
      .filter((l) => l.gurmukhi);
    if (!lines.length) return fallbackReading();

    const g = json.date?.gregorian;
    const n = json.date?.nanakshahi?.english;
    return {
      fromApi: true,
      dateLabel: g ? `${g.date} ${g.month} ${g.year}` : "today",
      nanakshahiLabel: n ? `${n.date} ${n.month} ${n.year} NS` : undefined,
      ang: json.hukamnamainfo?.pageno ?? 0,
      raag:
        json.hukamnamainfo?.raag?.english ??
        json.hukamnamainfo?.raag?.unicode,
      writer: json.hukamnamainfo?.writer?.english,
      lines,
    };
  } catch {
    return fallbackReading();
  }
}
