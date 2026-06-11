"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/", label: "Home", gurmukhi: "ਘਰ" },
  { href: "/history", label: "History", gurmukhi: "ਇਤਿਹਾਸ" },
  { href: "/encyclopedia", label: "Encyclopedia", gurmukhi: "ਵਿਸ਼ਵਕੋਸ਼" },
  { href: "/gurbani", label: "Gurbani", gurmukhi: "ਗੁਰਬਾਣੀ" },
  { href: "/sikhi-today", label: "Sikhi Today", gurmukhi: "ਅੱਜ" },
  { href: "/world", label: "The World", gurmukhi: "ਕਲਪਨਾ" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand}>
          <span className={`gurmukhi ${styles.brandGurmukhi}`}>
            ਚੜ੍ਹਦੀ ਕਲਾ
          </span>
          <span className={styles.brandLatin}>Chardi Kala</span>
        </Link>
        <nav className={styles.nav} aria-label="Site sections">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className={`gurmukhi ${styles.linkGurmukhi}`}>
                  {link.gurmukhi}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          className={styles.menuButton}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav className={styles.mobileNav} aria-label="Site sections">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${active ? styles.active : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className={`gurmukhi ${styles.linkGurmukhi}`}>
                  {link.gurmukhi}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
