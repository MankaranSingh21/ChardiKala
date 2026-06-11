import type { Metadata } from "next";
import Link from "next/link";
import { getGurbaniMeta } from "@/lib/gurbani";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About & Sources — Chardi Kala",
  description:
    "What this platform is, where its texts come from, and how to read it: data credits, editorial stance, and an invitation to correct us.",
};

export default function AboutPage() {
  const meta = getGurbaniMeta();

  return (
    <main className={`page ${styles.about}`}>
      <p className="pageKicker">ਜਾਣ-ਪਛਾਣ · about this platform</p>
      <h1 className="pageTitle">About & Sources</h1>

      <section className={styles.section}>
        <h2>What this is</h2>
        <p>
          Chardi Kala is a learning platform for Sikhi built for the 21st
          century: the complete Sri Guru Granth Sahib with English
          translation, the history of the Sikhs from 1469 to the present, a
          growing encyclopedia, and essays on representation, empathy,
          environmentalism, and acceptance. It is written for new learners,
          heritage students, and the curious of any belief or none. No
          account, no tracking, no paywall — the langar principle, applied to
          information.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Scripture sources</h2>
        <p>
          The Gurbani reader&apos;s text is extracted from the open-source{" "}
          <strong>Shabad OS Database</strong> (github.com/shabados/database):
          Gurmukhi from the SGPC Shabadaarth edition of Sri Guru Granth Sahib
          Ji, with the English translation of{" "}
          <strong>Dr. Sant Singh Khalsa</strong> and roman transliteration
          generated with the Shabad OS gurmukhi-utils library.
          {meta ? ` Extracted ${meta.extractedAt.slice(0, 10)}.` : ""} The
          translation is an aid to understanding, not a replacement for the
          original. Vishraam (pause) markings are omitted for display. Errors
          of extraction are ours, not the source&apos;s.
        </p>
        <p>
          The <Link href="/hukamnama">daily hukamnama</Link> is fetched from
          the <strong>GurbaniNow API</strong> (api.gurbaninow.com), which
          relays the day&apos;s hukamnama from Sri Harmandir Sahib, Amritsar;
          it is refreshed hourly. When the feed is unreachable, the page
          falls back to a date-chosen reading from this site&apos;s own local
          text, and says so plainly.
        </p>
      </section>

      <section className={styles.section}>
        <h2>History and encyclopedia</h2>
        <p>
          The historical and encyclopedic prose on this site is original
          writing grounded in established scholarship and the Sikh
          tradition&apos;s own records. Sensitive chapters — Partition, 1984
          and the years after — are written to be factual and unsoftened
          while cursing no community. Where the Panth itself debates a
          question (textual history, ceremonial practice, institutional
          politics), the entries say so rather than pretending consensus.
          This content has not yet had a formal scholarly review; treat it as
          a well-intentioned study companion, not an authority, and verify
          weighty claims against primary scholarship.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Editorial stance</h2>
        <p>
          The platform&apos;s emphasis — representation, empathy,
          environmentalism, and a door open to everyone, atheists and seekers
          included — is an editorial choice, argued in the{" "}
          <Link href="/sikhi-today">Sikhi Today</Link> essays from the
          tradition&apos;s own sources. We are honest about Sikhi&apos;s
          theistic core and equally honest about its checkpoint-free langar.
          Readers will decide for themselves; that, too, is the stance.
        </p>
      </section>

      <section className={styles.section}>
        <h2>The fiction wing</h2>
        <p>
          <Link href="/world">The World of Chardi Kala</Link> is a work of
          speculative fiction — an imagined Panjaab of 2124 rebuilt on Sikh
          principles. It is clearly marked wherever it appears and should
          never be mistaken for history or doctrine. It exists because
          imagination is a form of optimism, and optimism, here, is the whole
          point.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Corrections</h2>
        <p>
          If you find an error — of fact, translation handling, tone, or
          emphasis — you are not bothering us; you are doing seva. The
          content lives in plain JSON and markdown files precisely so it can
          be corrected easily. Bhul chuk maaf: forgive our errors and
          omissions.
        </p>
      </section>

      <p className={styles.closing}>
        <span className="gurmukhi">ਨਾਨਕ ਨਾਮ ਚੜ੍ਹਦੀ ਕਲਾ ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ</span>
        <span>
          Through the Name, ever-rising spirits — and in Your will, the
          welfare of all.
        </span>
      </p>
    </main>
  );
}
