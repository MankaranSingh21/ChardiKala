"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import type { TimelineEvent } from "@/lib/content";
import styles from "./Timeline.module.css";

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  let lastEra: string | null = null;

  return (
    <div className={styles.scroll}>
      <div className={styles.spine} aria-hidden />
      {events.map((event, i) => {
        const eraBreak = event.era !== lastEra;
        lastEra = event.era;
        return (
          <Fragment key={`${event.year}-${event.title}`}>
            {eraBreak && (
              <motion.h2
                className={styles.era}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
              >
                {event.era}
              </motion.h2>
            )}
            <motion.article
              className={styles.event}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.05 * (i % 3) }}
            >
              <div className={styles.marker} aria-hidden>
                <span className={styles.dot} />
              </div>
              <div className={styles.card}>
                <p className={styles.year}>{event.year}</p>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.body}>{event.body}</p>
              </div>
            </motion.article>
          </Fragment>
        );
      })}
      <p className={styles.colophon}>
        <span className="gurmukhi">ਚਲਦਾ…</span> the scroll continues
      </p>
    </div>
  );
}
