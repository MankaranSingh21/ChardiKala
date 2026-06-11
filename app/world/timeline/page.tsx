import type { Metadata } from "next";
import { getTimeline } from "@/lib/content";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Scroll of Time — Chardi Kala",
  description:
    "The chronicle of the watershed, from the Faltering to the present hour.",
};

export default function TimelinePage() {
  const events = getTimeline();

  return (
    <main className="page">
      <p className="pageKicker">ਵੇਲਾ · the chronicle unrolled</p>
      <h1 className="pageTitle">
        Scroll of <span className="gurmukhi">ਵੇਲਾ</span> Time
      </h1>
      <p className="pageLede">
        The chroniclers keep the years the way the Salt Archive keeps the
        rainfall: without summary. From the hour the wells went quiet to the
        present morning — read the actual years.
      </p>
      <Timeline events={events} />
    </main>
  );
}
