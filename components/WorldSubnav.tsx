"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./WorldSubnav.module.css";

const LINKS = [
  { href: "/world", label: "The Map" },
  { href: "/world/timeline", label: "Scroll of Time" },
  { href: "/world/people", label: "People" },
  { href: "/world/glossary", label: "Glossary" },
];

export default function WorldSubnav() {
  const pathname = usePathname();

  return (
    <div className={styles.band}>
      <p className={styles.badge}>
        Speculative fiction — an imagined Panjaab of 2124, grown from the real
        roots kept elsewhere on this site
      </p>
      <nav className={styles.links} aria-label="World of Chardi Kala sections">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${active ? styles.active : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
