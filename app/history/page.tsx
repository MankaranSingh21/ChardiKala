import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Timeline from "@/components/Timeline";
import type { TimelineEvent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sikh History — Chardi Kala",
  description:
    "The history of the Sikhs from Guru Nanak (1469) to the global Panth of today: the Gurus, the Khalsa, the empire, colonial struggle, Partition, 1984, and the diaspora.",
};

function getHistory(): TimelineEvent[] {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", "history.json"),
    "utf-8"
  );
  return JSON.parse(raw) as TimelineEvent[];
}

export default function HistoryPage() {
  const events = getHistory();

  return (
    <main className="page">
      <p className="pageKicker">ਇਤਿਹਾਸ · five and a half centuries</p>
      <h1 className="pageTitle">
        Sikh <span className="gurmukhi">ਇਤਿਹਾਸ</span> History
      </h1>
      <p className="pageLede">
        From a boy in Talwandi asking why ritual mattered more than truth, to
        a worldwide community of some twenty-five million — this is the arc,
        era by era. It includes the radiant chapters and the wounded ones;
        Sikh history asks to be remembered whole, not softened.
      </p>
      <Timeline events={events} />
    </main>
  );
}
