import { getGurbaniMeta, getMulMantar } from "@/lib/gurbani";
import { getHukamnama } from "@/lib/hukamnama";
import HomeView from "./HomeView";

export default async function Home() {
  const mulMantar = getMulMantar();
  const meta = getGurbaniMeta();
  const hukam = await getHukamnama();

  // Headline line for the teaser: first substantive translation,
  // skipping headers like "Sorat'h, Ninth Mehl:".
  const headline =
    hukam.lines.find(
      (l) => l.english && !l.english.trimEnd().endsWith(":")
    ) ?? hukam.lines[0] ?? null;

  return (
    <HomeView
      mulMantar={mulMantar}
      attribution={meta?.translationAttribution ?? null}
      hukamHeadline={headline}
      hukamDate={hukam.dateLabel}
      hukamLive={hukam.fromApi}
    />
  );
}
