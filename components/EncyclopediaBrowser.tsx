"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CATEGORIES,
  type CategoryId,
  type EncyclopediaIndexItem,
} from "@/lib/encyclopedia-shared";
import styles from "./EncyclopediaBrowser.module.css";

export default function EncyclopediaBrowser({
  index,
}: {
  index: EncyclopediaIndexItem[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return index.filter((entry) => {
      if (category !== "all" && entry.category !== category) return false;
      if (!q) return true;
      return (
        entry.title.toLowerCase().includes(q) ||
        (entry.translit ?? "").toLowerCase().includes(q) ||
        entry.summary.toLowerCase().includes(q) ||
        entry.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [index, query, category]);

  return (
    <div className={styles.browser}>
      <div className={styles.controls}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search — langar, 1699, Mai Bhago, seva…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the encyclopedia"
        />
        <div className={styles.filters} role="group" aria-label="Filter by category">
          <button
            className={`${styles.filter} ${category === "all" ? styles.filterActive : ""}`}
            onClick={() => setCategory("all")}
          >
            All
          </button>
          {(Object.keys(CATEGORIES) as CategoryId[]).map((id) => (
            <button
              key={id}
              className={`${styles.filter} ${category === id ? styles.filterActive : ""}`}
              onClick={() => setCategory(category === id ? "all" : id)}
            >
              {CATEGORIES[id].label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>
          Nothing found — try a broader word, or clear the category filter.
        </p>
      ) : (
        <ul className={styles.grid}>
          {filtered.map((entry, i) => (
            <motion.li
              key={entry.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i, 12) * 0.025 }}
            >
              <Link
                href={`/encyclopedia/${entry.slug}`}
                className={styles.card}
              >
                <span className={styles.cardCategory}>
                  {CATEGORIES[entry.category].label}
                </span>
                <span className={styles.cardTitle}>
                  {entry.title}
                  {entry.gurmukhi && (
                    <span className={`gurmukhi ${styles.cardGurmukhi}`}>
                      {entry.gurmukhi}
                    </span>
                  )}
                </span>
                <span className={styles.cardSummary}>{entry.summary}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
