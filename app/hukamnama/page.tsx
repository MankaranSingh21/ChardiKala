import type { Metadata } from "next";
import Link from "next/link";
import { getHukamnama } from "@/lib/hukamnama";
import { TOTAL_ANGS } from "@/lib/gurbani";
import styles from "./hukamnama.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Today's Hukamnama — Chardi Kala",
  description:
    "The daily hukamnama from Sri Harmandir Sahib, Amritsar — the Guru's command for the day, with transliteration and English translation.",
};

export default async function HukamnamaPage() {
  const hukam = await getHukamnama();

  return (
    <main className={`page ${styles.hukamPage}`}>
      <p className="pageKicker">ਅੱਜ ਦਾ ਹੁਕਮਨਾਮਾ · the day&apos;s command</p>
      <h1 className="pageTitle">
        Today&apos;s <span className="gurmukhi">ਹੁਕਮਨਾਮਾ</span> Hukamnama
      </h1>
      <p className="pageLede">
        Each morning at Sri Harmandir Sahib, the Guru Granth Sahib is opened
        at random and the shabad on that page is read aloud as the day&apos;s
        hukamnama — the Guru&apos;s command, taken by Sikhs worldwide as the
        teaching to sit with today. The practice is the tradition&apos;s
        oldest answer to &ldquo;what should I do?&rdquo;: open the Guru, and
        listen.
      </p>

      <section className={styles.meta}>
        <p className={styles.date}>
          {hukam.dateLabel}
          {hukam.nanakshahiLabel && (
            <span className={styles.nanakshahi}>
              {" "}
              · {hukam.nanakshahiLabel}
            </span>
          )}
        </p>
        <p className={styles.info}>
          {hukam.fromApi ? (
            <>
              From Sri Harmandir Sahib, Amritsar · ang {hukam.ang}
              {hukam.raag ? ` · ${hukam.raag}` : ""}
              {hukam.writer ? ` · ${hukam.writer}` : ""}
            </>
          ) : (
            <>
              The live Darbar Sahib feed is unreachable right now — shown
              instead is today&apos;s reading from ang {hukam.ang} of this
              site&apos;s own text, chosen by date.
            </>
          )}
        </p>
      </section>

      <ol className={styles.lines}>
        {hukam.lines.map((line, i) => (
          <li key={i} className={styles.line}>
            <p className={`gurmukhi ${styles.gurmukhi}`}>{line.gurmukhi}</p>
            {line.translit && (
              <p className={styles.translit}>{line.translit}</p>
            )}
            {line.english && <p className={styles.english}>{line.english}</p>}
          </li>
        ))}
      </ol>

      <div className={styles.actions}>
        {hukam.ang >= 1 && hukam.ang <= TOTAL_ANGS && (
          <Link href={`/gurbani/ang/${hukam.ang}`} className={styles.action}>
            Read the full ang {hukam.ang} in the reader →
          </Link>
        )}
        <Link href="/gurbani" className={styles.actionSecondary}>
          About Sri Guru Granth Sahib
        </Link>
      </div>

      <footer className={styles.credits}>
        {hukam.fromApi ? (
          <p>
            Daily hukamnama via the GurbaniNow API (api.gurbaninow.com),
            English translation by Dr. Sant Singh Khalsa. Refreshed hourly.
          </p>
        ) : (
          <p>
            Text from this site&apos;s local extraction of the Shabad OS
            Database; English translation by Dr. Sant Singh Khalsa.
          </p>
        )}
      </footer>
    </main>
  );
}
