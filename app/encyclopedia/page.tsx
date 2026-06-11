import type { Metadata } from "next";
import { getIndex } from "@/lib/encyclopedia";
import EncyclopediaBrowser from "@/components/EncyclopediaBrowser";

export const metadata: Metadata = {
  title: "Encyclopedia — Chardi Kala",
  description:
    "A living encyclopedia of Sikhi: the Gurus, scripture, concepts, history, people, places, and practices — written for new learners and lifelong students.",
};

export default function EncyclopediaPage() {
  const index = getIndex();

  return (
    <main className="page">
      <p className="pageKicker">ਵਿਸ਼ਵਕੋਸ਼ · a living reference</p>
      <h1 className="pageTitle">
        The <span className="gurmukhi">ਵਿਸ਼ਵਕੋਸ਼</span> Encyclopedia
      </h1>
      <p className="pageLede">
        {index.length} entries and growing — the Gurus, the concepts, the
        battles and the langars, the people the Panth remembers. Search, or
        wander by category; every entry links onward. Written for the student
        coming to Sikhi for the first time, without assuming belief.
      </p>
      <EncyclopediaBrowser index={index} />
    </main>
  );
}
