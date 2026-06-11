"use client";

import { motion } from "framer-motion";
import type { GlossaryEntry } from "@/lib/content";
import styles from "./Glossary.module.css";

export default function Glossary({ entries }: { entries: GlossaryEntry[] }) {
  return (
    <dl className={styles.list}>
      {entries.map((entry, i) => (
        <motion.div
          key={entry.term}
          className={styles.entry}
          data-kind={entry.kind}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.55, delay: 0.04 * (i % 4) }}
        >
          <dt className={styles.term}>
            <span className={`gurmukhi ${styles.gurmukhi}`}>
              {entry.gurmukhi}
            </span>
            <span className={styles.latin}>{entry.term}</span>
            <span className={styles.kind}>
              {entry.kind === "inherited" ? "inherited" : "new coinage"}
            </span>
          </dt>
          <dd className={styles.definition}>{entry.definition}</dd>
        </motion.div>
      ))}
    </dl>
  );
}
