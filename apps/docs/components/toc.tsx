"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    // Wait a tick for MDX content to render after navigation
    const scan = () => {
      const els = Array.from(document.querySelectorAll("article h2, article h3"));
      setHeadings(
        els.map((el) => ({
          id: el.id,
          text: el.textContent ?? "",
          level: el.tagName === "H2" ? 2 : 3
        }))
      );
      setActive("");
    };
    const id = setTimeout(scan, 50);
    return () => clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-60px 0% -80% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="fixed right-0 top-[60px] bottom-0 w-[224px] overflow-y-auto scrollbar-thin hidden xl:block">
      <div className="px-4 py-6">
        <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          On this page
        </h5>
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-xs py-1 transition-colors ${h.level === 3 ? "pl-3" : ""} ${
                  active === h.id
                    ? "text-brand-600 dark:text-brand-400 font-medium"
                    : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
