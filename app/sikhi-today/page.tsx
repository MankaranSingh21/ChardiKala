import type { Metadata } from "next";
import Link from "next/link";
import { getEssays } from "@/lib/content";
import styles from "./sikhi-today.module.css";

export const metadata: Metadata = {
  title: "Sikhi Today — Chardi Kala",
  description:
    "Essays on living Sikhi in the 21st century: representation, empathy, environmentalism, equality, and a door open to everyone — including the unsure.",
};

export default function SikhiTodayPage() {
  const essays = getEssays();

  return (
    <main className="page">
      <p className="pageKicker">ਅੱਜ · the present tense of an old light</p>
      <h1 className="pageTitle">
        Sikhi <span className="gurmukhi">ਅੱਜ</span> Today
      </h1>
      <p className="pageLede">
        The Gurus did not leave a museum; they left a method. These essays ask
        what the method does now — about being seen, about feeding strangers,
        about a warming planet, about who is welcome (everyone), and about
        learning the tradition from wherever you currently stand, belief
        optional.
      </p>
      <ol className={styles.list}>
        {essays.map((essay, i) => (
          <li key={essay.slug}>
            <Link href={`/sikhi-today/${essay.slug}`} className={styles.card}>
              <span className={styles.number}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.text}>
                <span className={styles.kicker}>{essay.kicker}</span>
                <span className={styles.title}>
                  {essay.title}
                  {essay.gurmukhi && (
                    <span className={`gurmukhi ${styles.gurmukhi}`}>
                      {essay.gurmukhi}
                    </span>
                  )}
                </span>
                <span className={styles.summary}>{essay.summary}</span>
              </span>
              <span className={styles.arrow} aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
