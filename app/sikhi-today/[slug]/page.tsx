import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEssay, getEssays } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import styles from "./essay.module.css";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getEssays().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const essay = getEssay(params.slug);
  if (!essay) return {};
  return {
    title: `${essay.title} — Sikhi Today — Chardi Kala`,
    description: essay.summary,
  };
}

export default function EssayPage({ params }: Props) {
  const essay = getEssay(params.slug);
  if (!essay) notFound();

  const essays = getEssays();
  const index = essays.findIndex((e) => e.slug === essay.slug);
  const next = essays[index + 1] ?? null;

  return (
    <main className={`page ${styles.essayPage}`}>
      <p className="pageKicker">
        <Link href="/sikhi-today">ਅੱਜ · Sikhi Today</Link>
      </p>
      <h1 className="pageTitle">{essay.title}</h1>
      <p className={styles.summary}>{essay.summary}</p>
      <article className={styles.body}>{renderMarkdown(essay.body)}</article>
      {next && (
        <p className={styles.next}>
          Next essay:{" "}
          <Link href={`/sikhi-today/${next.slug}`}>{next.title} →</Link>
        </p>
      )}
    </main>
  );
}
