import type { Metadata } from "next";
import { getGlossary } from "@/lib/content";
import Glossary from "@/components/Glossary";

export const metadata: Metadata = {
  title: "Glossary — Chardi Kala",
  description:
    "The tongue of the watershed: inherited Punjabi-Sikh terms and the new words a rebuilt world needed.",
};

export default function GlossaryPage() {
  const entries = getGlossary();

  return (
    <main className="page">
      <p className="pageKicker">ਬੋਲੀ · the tongue of the watershed</p>
      <h1 className="pageTitle">
        A <span className="gurmukhi">ਬੋਲੀ</span> Glossary
      </h1>
      <p className="pageLede">
        Some words the watershed inherited and sharpened; some it had to coin,
        because no language yet had a word for sowing ice. Inherited terms are
        marked in saffron, new coinages in leaf-green.
      </p>
      <Glossary entries={entries} />
    </main>
  );
}
