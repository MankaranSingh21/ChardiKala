"use client";

import { useState } from "react";
import type { GurbaniLine } from "@/lib/gurbani";
import styles from "./AngReader.module.css";

export default function AngReader({ lines }: { lines: GurbaniLine[] }) {
  const [showTranslit, setShowTranslit] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);

  // Shabad boundaries get breathing room
  let lastShabad: GurbaniLine["shabadId"] = undefined;

  return (
    <div>
      <div className={styles.toggles} role="group" aria-label="Display layers">
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showTranslit}
            onChange={(e) => setShowTranslit(e.target.checked)}
          />
          pronunciation
        </label>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showEnglish}
            onChange={(e) => setShowEnglish(e.target.checked)}
          />
          English
        </label>
      </div>

      <ol className={styles.lines}>
        {lines.map((line, i) => {
          const newShabad = lastShabad !== undefined && line.shabadId !== lastShabad;
          lastShabad = line.shabadId;
          return (
            <li
              key={i}
              className={`${styles.line} ${newShabad ? styles.newShabad : ""}`}
            >
              <p className={`gurmukhi ${styles.gurmukhi}`}>{line.gurmukhi}</p>
              {showTranslit && (
                <p className={styles.translit}>{line.translit}</p>
              )}
              {showEnglish && line.english && (
                <p className={styles.english}>{line.english}</p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
