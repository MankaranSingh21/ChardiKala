import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  getAllEntries,
  getEntry,
} from "@/lib/encyclopedia";
import { renderMarkdown } from "@/lib/markdown";
import styles from "./entry.module.css";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllEntries().map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = getEntry(params.slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Encyclopedia — Chardi Kala`,
    description: entry.summary,
  };
}

export default function EntryPage({ params }: Props) {
  const entry = getEntry(params.slug);
  if (!entry) notFound();

  const related = entry.related
    .map((slug) => getEntry(slug))
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return (
    <main className={`page ${styles.entryPage}`}>
      <p className="pageKicker">
        <Link href="/encyclopedia">ਵਿਸ਼ਵਕੋਸ਼ · Encyclopedia</Link>
        <span className={styles.crumbCategory}>
          {CATEGORIES[entry.category].label}
        </span>
      </p>
      <h1 className="pageTitle">{entry.title}</h1>
      {(entry.gurmukhi || entry.translit) && (
        <p className={styles.term}>
          {entry.gurmukhi && (
            <span className={`gurmukhi ${styles.termGurmukhi}`}>
              {entry.gurmukhi}
            </span>
          )}
          {entry.translit && (
            <span className={styles.termTranslit}>{entry.translit}</span>
          )}
        </p>
      )}
      <p className={styles.summary}>{entry.summary}</p>

      <article className={styles.body}>{renderMarkdown(entry.body)}</article>

      {related.length > 0 && (
        <aside className={styles.related} aria-label="Related entries">
          <h2 className={styles.relatedTitle}>Read onward</h2>
          <ul className={styles.relatedList}>
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/encyclopedia/${r.slug}`}
                  className={styles.relatedLink}
                >
                  <span className={styles.relatedCategory}>
                    {CATEGORIES[r.category].label}
                  </span>
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  );
}
