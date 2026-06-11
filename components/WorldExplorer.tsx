"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { RegionWithExcerpt } from "@/lib/content";
import WorldMap from "./WorldMap";
import RegionDrawer from "./RegionDrawer";
import styles from "./WorldExplorer.module.css";

export default function WorldExplorer({
  regions,
}: {
  regions: RegionWithExcerpt[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = regions.find((r) => r.id === selectedId) ?? null;

  const close = useCallback(() => setSelectedId(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <main className={styles.main}>
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
        }}
      >
        <motion.p
          className={styles.kicker}
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          An atlas of the bright and patient country · the year 2124
        </motion.p>
        <motion.h1
          className={styles.title}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <span className={`gurmukhi ${styles.titleGurmukhi}`}>
            ਚੜ੍ਹਦੀ ਕਲਾ
          </span>
          <span className={styles.titleLatin}>Chardi Kala</span>
        </motion.h1>
        <motion.p
          className={styles.lede}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          Five rivers leave the mountains and go down to the plains, carrying
          the morning with them. This is Panjaab three generations after the
          wells went quiet — a civilisation rebuilt on ever-rising spirit.
          Choose a region of the watershed and read what the chroniclers keep.
        </motion.p>
      </motion.section>

      <motion.div
        className={styles.mapFrame}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <WorldMap
          regions={regions}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </motion.div>

      <motion.ul
        className={styles.legend}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        {regions.map((region) => (
          <li key={region.id}>
            <button
              className={styles.legendItem}
              data-hue={region.hue}
              onClick={() => setSelectedId(region.id)}
            >
              <span className={styles.legendDot} aria-hidden />
              <span className={styles.legendName}>{region.name}</span>
              <span className={styles.legendOld}>{region.oldName}</span>
            </button>
          </li>
        ))}
      </motion.ul>

      <RegionDrawer region={selected} onClose={close} />
    </main>
  );
}
