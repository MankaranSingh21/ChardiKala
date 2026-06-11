"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AngJump.module.css";

export default function AngJump({ current }: { current?: number }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const go = () => {
    const ang = parseInt(value, 10);
    if (Number.isInteger(ang) && ang >= 1 && ang <= 1430) {
      router.push(`/gurbani/ang/${ang}`);
      setValue("");
    }
  };

  return (
    <form
      className={styles.jump}
      onSubmit={(e) => {
        e.preventDefault();
        go();
      }}
    >
      <label htmlFor="ang-jump" className={styles.label}>
        Go to ang
      </label>
      <input
        id="ang-jump"
        className={styles.input}
        type="number"
        min={1}
        max={1430}
        placeholder={current ? String(current) : "1–1430"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Go
      </button>
    </form>
  );
}
