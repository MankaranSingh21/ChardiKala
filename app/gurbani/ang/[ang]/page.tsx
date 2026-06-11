import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAng, getGurbaniMeta, TOTAL_ANGS } from "@/lib/gurbani";
import AngJump from "@/components/AngJump";
import AngReader from "@/components/AngReader";
import styles from "./reader.module.css";

type Props = { params: { ang: string } };

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Ang ${params.ang} — Sri Guru Granth Sahib — Chardi Kala`,
    description: `Sri Guru Granth Sahib Ji, ang ${params.ang}: Gurmukhi, transliteration, and English translation.`,
  };
}

export default function AngPage({ params }: Props) {
  const angNumber = parseInt(params.ang, 10);
  const ang = getAng(angNumber);
  if (!ang) notFound();

  const meta = getGurbaniMeta();
  const prev = angNumber > 1 ? angNumber - 1 : null;
  const next = angNumber < TOTAL_ANGS ? angNumber + 1 : null;

  const pager = (
    <nav className={styles.pager} aria-label="Ang navigation">
      {prev ? (
        <Link href={`/gurbani/ang/${prev}`} className={styles.pageLink}>
          ← ang {prev}
        </Link>
      ) : (
        <span className={`${styles.pageLink} ${styles.disabled}`}>
          ← beginning
        </span>
      )}
      <AngJump current={angNumber} />
      {next ? (
        <Link href={`/gurbani/ang/${next}`} className={styles.pageLink}>
          ang {next} →
        </Link>
      ) : (
        <span className={`${styles.pageLink} ${styles.disabled}`}>end →</span>
      )}
    </nav>
  );

  return (
    <main className={`page ${styles.readerPage}`}>
      <header className={styles.head}>
        <p className="pageKicker">
          <Link href="/gurbani">ਗੁਰਬਾਣੀ · Sri Guru Granth Sahib</Link>
        </p>
        <h1 className={styles.angTitle}>
          Ang <span className={styles.angNumber}>{angNumber}</span>
          <span className={styles.angTotal}> / {TOTAL_ANGS}</span>
        </h1>
      </header>

      {pager}
      <AngReader lines={ang.lines} />
      {pager}

      {meta && (
        <footer className={styles.credits}>
          <p>
            {meta.translationAttribution}. {meta.transliterationAttribution}.
          </p>
        </footer>
      )}
    </main>
  );
}
