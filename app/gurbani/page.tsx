import type { Metadata } from "next";
import Link from "next/link";
import { getGurbaniMeta, getMulMantar, TOTAL_ANGS } from "@/lib/gurbani";
import AngJump from "@/components/AngJump";
import styles from "./gurbani.module.css";

export const metadata: Metadata = {
  title: "Sri Guru Granth Sahib — Chardi Kala",
  description:
    "Read all 1430 angs of Sri Guru Granth Sahib Ji: Gurmukhi, roman transliteration, and English translation, line by line.",
};

const WAYPOINTS = [
  { ang: 1, name: "Japji Sahib", note: "Guru Nanak's foundational composition — the morning prayer" },
  { ang: 8, name: "So Dar / Sohila", note: "evening and bedtime prayers begin" },
  { ang: 133, name: "Barah Maha", note: "the twelve months — the soul's year of longing" },
  { ang: 262, name: "Sukhmani Sahib", note: "Guru Arjan's Psalm of Peace" },
  { ang: 462, name: "Asa ki Var", note: "the dawn ballad sung in sangat" },
  { ang: 917, name: "Anand Sahib", note: "Guru Amar Das's Song of Bliss" },
  { ang: 938, name: "Sidh Gosht", note: "Guru Nanak's dialogue with the yogis" },
  { ang: 1426, name: "Salok Mahalla 9", note: "Guru Tegh Bahadur's saloks of detachment" },
  { ang: 1429, name: "Mundavani", note: "the closing seal: truth, contentment, contemplation" },
];

export default function GurbaniHomePage() {
  const meta = getGurbaniMeta();
  const mulMantar = getMulMantar();

  return (
    <main className="page">
      <p className="pageKicker">ਗੁਰਬਾਣੀ · the Guru&apos;s word</p>
      <h1 className="pageTitle">
        Sri Guru <span className="gurmukhi">ਗ੍ਰੰਥ</span> Granth Sahib
      </h1>
      <p className="pageLede">
        Since 1708, the Guru of the Sikhs has been a book — or rather, the
        living word inside one. Sri Guru Granth Sahib Ji holds 1430 angs
        (&ldquo;limbs,&rdquo; as the pages are respectfully called) of poetry
        set to raag: the words of six Gurus alongside Hindu bhagats and Muslim
        saints — Kabir the weaver, Farid the Sufi, Ravidas the cobbler — bound
        as equals in one scripture. Read it here line by line: Gurmukhi,
        pronunciation, and English.
      </p>

      {mulMantar && (
        <section className={styles.opening} aria-label="The Mul Mantar">
          <p className={`gurmukhi ${styles.openingGurmukhi}`}>
            {mulMantar.gurmukhi}
          </p>
          <p className={styles.openingEnglish}>{mulMantar.english}</p>
        </section>
      )}

      <section className={styles.jumpRow}>
        <AngJump />
        <Link href="/gurbani/ang/1" className={styles.beginLink}>
          Begin at ang 1 →
        </Link>
        <Link href="/hukamnama" className={styles.beginLink}>
          Today&apos;s hukamnama
        </Link>
      </section>

      <h2 className={styles.waypointsTitle}>Waypoints in the Granth</h2>
      <ul className={styles.waypoints}>
        {WAYPOINTS.map((w) => (
          <li key={w.ang}>
            <Link href={`/gurbani/ang/${w.ang}`} className={styles.waypoint}>
              <span className={styles.waypointAng}>ang {w.ang}</span>
              <span className={styles.waypointName}>{w.name}</span>
              <span className={styles.waypointNote}>{w.note}</span>
            </Link>
          </li>
        ))}
      </ul>

      {meta && (
        <footer className={styles.credits}>
          <p>{meta.source}.</p>
          <p>
            {meta.translationAttribution}. {meta.transliterationAttribution}.
          </p>
          <p>
            {TOTAL_ANGS} angs · {`60,555`} lines · read with respect.
          </p>
        </footer>
      )}
    </main>
  );
}
