"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import type { RegionWithExcerpt } from "@/lib/content";
import styles from "./RegionDrawer.module.css";

/** Render a prose string, honouring *italic* spans from the markdown source. */
function prose(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function Section({
  gurmukhi,
  title,
  children,
}: {
  gurmukhi: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>
        <span className={`gurmukhi ${styles.sectionGurmukhi}`}>{gurmukhi}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function RegionDrawer({
  region,
  onClose,
}: {
  region: RegionWithExcerpt | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {region && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />
          <motion.aside
            key={region.id}
            className={styles.drawer}
            data-hue={region.hue}
            role="dialog"
            aria-modal="true"
            aria-label={region.name}
            initial={{ x: "104%" }}
            animate={{ x: 0 }}
            exit={{ x: "104%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.inner}>
              <button
                className={styles.close}
                onClick={onClose}
                aria-label="Close region panel"
              >
                ✕
              </button>

              <header className={styles.head}>
                <p className={styles.oldName}>
                  <span className={`gurmukhi ${styles.oldGurmukhi}`}>
                    {region.punjabi}
                  </span>
                  · once called {region.oldName}
                </p>
                <h2 className={styles.name}>{region.name}</h2>
                <p className={styles.epithet}>{region.epithet}</p>
              </header>

              <Section gurmukhi="ਧਰਤ" title="Geography">
                <p className={styles.body}>{region.geography}</p>
              </Section>

              <Section gurmukhi="ਲੋਕ" title="People">
                <p className={styles.body}>{region.people}</p>
              </Section>

              <Section gurmukhi="ਫ਼ਲਸਫ਼ਾ" title="Philosophy">
                <p className={styles.body}>{region.philosophy}</p>
              </Section>

              <Section gurmukhi="ਬੋਲ" title="Fragments of the tongue">
                <ul className={styles.fragments}>
                  {region.fragments.map((f) => (
                    <li key={f.gurmukhi} className={styles.fragment}>
                      <span className={`gurmukhi ${styles.fragmentGurmukhi}`}>
                        {f.gurmukhi}
                      </span>
                      <span className={styles.fragmentTranslit}>
                        {f.translit}
                      </span>
                      <span className={styles.fragmentGloss}>{f.gloss}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section gurmukhi="ਕਥਾ" title="From the chronicles">
                <div className={styles.excerpt}>
                  {region.excerptParagraphs.map((p, i) => (
                    <p key={i}>{prose(p)}</p>
                  ))}
                </div>
              </Section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
