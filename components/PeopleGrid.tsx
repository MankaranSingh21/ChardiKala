"use client";

import { motion } from "framer-motion";
import type { Person } from "@/lib/content";
import styles from "./PeopleGrid.module.css";

export default function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <div className={styles.grid}>
      {people.map((person, i) => (
        <motion.article
          key={person.id}
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, delay: 0.08 * (i % 2) }}
        >
          <p className={`gurmukhi ${styles.punjabi}`}>{person.punjabi}</p>
          <h2 className={styles.name}>{person.name}</h2>
          <p className={styles.role}>{person.role}</p>
          <p className={styles.era}>{person.era}</p>
          <blockquote className={styles.quote}>
            <p>{person.quote}</p>
          </blockquote>
          <p className={styles.note}>{person.note}</p>
        </motion.article>
      ))}
    </div>
  );
}
