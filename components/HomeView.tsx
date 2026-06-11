"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { GurbaniLine } from "@/lib/gurbani";
import styles from "./HomeView.module.css";

const PILLARS = [
  {
    gurmukhi: "ਪਛਾਣ",
    title: "Representation",
    body: "To be seen truly. The dastar is not a costume and Sikhi is not a footnote to someone else's story — this platform tells it in its own voice.",
  },
  {
    gurmukhi: "ਦਇਆ",
    title: "Empathy",
    body: "Bhai Kanhaiya carried water to wounded enemies and called them all the Guru's face. From langar floors to disaster zones, empathy is Sikhi's oldest technology.",
  },
  {
    gurmukhi: "ਪਵਣ ਗੁਰੂ",
    title: "Environmentalism",
    body: "Air the Guru, water the father, earth the great mother — Gurbani sang ecology five centuries before the word existed. Caring for the planet is not new to Sikhi; it is the first page.",
  },
  {
    gurmukhi: "ਸਭ ਲਈ ਥਾਂ",
    title: "Acceptance",
    body: "The langar asks no one their religion before they eat. Practising, questioning, atheist, simply curious — the door has no lock, and neither does this site.",
  },
];

const SECTIONS = [
  {
    href: "/history",
    gurmukhi: "ਇਤਿਹਾਸ",
    title: "History",
    body: "From Guru Nanak at Kartarpur to the global Panth of today — the whole arc, era by era, without summary or softening.",
  },
  {
    href: "/encyclopedia",
    gurmukhi: "ਵਿਸ਼ਵਕੋਸ਼",
    title: "Encyclopedia",
    body: "Gurus, concepts, events, people, places, and practices — a growing reference written for newcomers and students of Sikhi.",
  },
  {
    href: "/gurbani",
    gurmukhi: "ਗੁਰਬਾਣੀ",
    title: "Sri Guru Granth Sahib",
    body: "All 1430 angs — Gurmukhi, transliteration, and English translation, line by line. Read the Guru directly.",
  },
  {
    href: "/sikhi-today",
    gurmukhi: "ਅੱਜ",
    title: "Sikhi Today",
    body: "Essays on living the teachings now: representation, empathy, the environment, equality, and a door open to everyone.",
  },
  {
    href: "/world",
    gurmukhi: "ਕਲਪਨਾ",
    title: "The World of Chardi Kala",
    body: "A work of speculative fiction: Panjaab in 2124, rebuilt on Sikh principles. Imagination as a form of optimism.",
    fiction: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75 } },
};

export default function HomeView({
  mulMantar,
  attribution,
  hukamHeadline,
  hukamDate,
  hukamLive,
}: {
  mulMantar: GurbaniLine | null;
  attribution: string | null;
  hukamHeadline: GurbaniLine | null;
  hukamDate: string;
  hukamLive: boolean;
}) {
  return (
    <main className={styles.main}>
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
        }}
      >
        <motion.p
          className={`gurmukhi ${styles.ikOnkar}`}
          variants={fadeUp}
          aria-label="Ik Onkar — One Creator"
        >
          ੴ
        </motion.p>
        <motion.h1 className={styles.title} variants={fadeUp}>
          Sikhi in the <em>21st Century</em>
        </motion.h1>
        <motion.p className={styles.lede} variants={fadeUp}>
          A modern home for an old light. Real history, the complete Sri Guru
          Granth Sahib in English, and a living encyclopedia — built for new
          learners, lifelong students, and everyone in between. Whoever you
          are, however you believe or don&apos;t: <strong>ji aaian nu</strong>,
          welcome.
        </motion.p>
      </motion.section>

      {mulMantar && (
        <motion.section
          className={styles.mulMantar}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85 }}
          aria-label="Mul Mantar, the opening of Sri Guru Granth Sahib"
        >
          <p className={styles.mulLabel}>
            The opening line of Sri Guru Granth Sahib · ang 1
          </p>
          <p className={`gurmukhi ${styles.mulGurmukhi}`}>
            {mulMantar.gurmukhi}
          </p>
          <p className={styles.mulTranslit}>{mulMantar.translit}</p>
          <p className={styles.mulEnglish}>{mulMantar.english}</p>
          {attribution && (
            <p className={styles.mulAttribution}>{attribution}</p>
          )}
          <Link href="/gurbani/ang/1" className={styles.mulLink}>
            Begin reading from ang 1 →
          </Link>
        </motion.section>
      )}

      {hukamHeadline && (
        <motion.section
          className={styles.hukam}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.75 }}
          aria-label="Today's hukamnama"
        >
          <Link href="/hukamnama" className={styles.hukamCard}>
            <span className={styles.hukamLabel}>
              ਅੱਜ ਦਾ ਹੁਕਮਨਾਮਾ · Today&apos;s Hukamnama · {hukamDate}
              {hukamLive ? " · from Sri Harmandir Sahib" : ""}
            </span>
            <span className={`gurmukhi ${styles.hukamGurmukhi}`}>
              {hukamHeadline.gurmukhi}
            </span>
            <span className={styles.hukamEnglish}>
              {hukamHeadline.english}
            </span>
            <span className={styles.hukamMore}>
              Read the full hukamnama →
            </span>
          </Link>
        </motion.section>
      )}

      <section className={styles.pillars} aria-label="The four pillars of this platform">
        {PILLARS.map((pillar, i) => (
          <motion.article
            key={pillar.title}
            className={styles.pillar}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.08 * i }}
          >
            <p className={`gurmukhi ${styles.pillarGurmukhi}`}>
              {pillar.gurmukhi}
            </p>
            <h2 className={styles.pillarTitle}>{pillar.title}</h2>
            <p className={styles.pillarBody}>{pillar.body}</p>
          </motion.article>
        ))}
      </section>

      <section className={styles.sections} aria-label="Site sections">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.href}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.06 * i }}
          >
            <Link
              href={section.href}
              className={`${styles.sectionCard} ${section.fiction ? styles.fictionCard : ""}`}
            >
              <span className={`gurmukhi ${styles.sectionGurmukhi}`}>
                {section.gurmukhi}
              </span>
              <span className={styles.sectionTitle}>
                {section.title}
                {section.fiction && (
                  <span className={styles.fictionTag}>fiction</span>
                )}
              </span>
              <span className={styles.sectionBody}>{section.body}</span>
              <span className={styles.sectionArrow} aria-hidden>
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
