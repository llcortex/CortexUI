"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

type SearchIndexEntry = {
  title: string;
  section: string;
  href: string;
  excerpt: string;
};

const OPEN_EVENT = "cortexui:open-search";
const CLOSE_EVENT = "cortexui:close-search";

export function SearchTrigger(): JSX.Element {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(OPEN_EVENT));
      }}
      className="hidden lg:flex items-center gap-2 w-64 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      aria-label="Open search"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <span>Search docs...</span>
      <kbd className="ml-auto text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded">
        ⌘K
      </kbd>
    </button>
  );
}

export function Search(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [index, setIndex] = useState<SearchIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadIndex() {
      setLoading(true);
      try {
        const response = await fetch("/search-index.json");
        const data = (await response.json()) as SearchIndexEntry[];
        if (!cancelled) {
          setIndex(data);
          setResults(data.slice(0, 8));
        }
      } catch {
        if (!cancelled) {
          setIndex([]);
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadIndex();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const normalizedQuery = query.trim().toLowerCase();

      if (!normalizedQuery) {
        setResults(index.slice(0, 8));
        setActiveIndex(0);
        return;
      }

      const ranked = index
        .map((entry) => {
          const title = entry.title.toLowerCase();
          const section = entry.section.toLowerCase();
          const excerpt = entry.excerpt.toLowerCase();

          let rank = -1;
          if (title.includes(normalizedQuery)) {
            rank = 0;
          } else if (section.includes(normalizedQuery)) {
            rank = 1;
          } else if (excerpt.includes(normalizedQuery)) {
            rank = 2;
          }

          return { entry, rank };
        })
        .filter((item) => item.rank >= 0)
        .sort((left, right) => left.rank - right.rank || left.entry.title.localeCompare(right.entry.title))
        .slice(0, 8)
        .map((item) => item.entry);

      setResults(ranked);
      setActiveIndex(0);
    }, 150);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [index, query]);

  useEffect(() => {
    const openSearch = () => {
      setOpen(true);
    };

    const closeSearch = () => {
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        return;
      }

      if (!open) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => (results.length === 0 ? 0 : (current + 1) % results.length));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          results.length === 0 ? 0 : (current - 1 + results.length) % results.length
        );
        return;
      }

      if (event.key === "Enter" && results[activeIndex]) {
        event.preventDefault();
        navigate(results[activeIndex].href);
      }
    };

    window.addEventListener(OPEN_EVENT, openSearch);
    window.addEventListener(CLOSE_EVENT, closeSearch);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener(OPEN_EVENT, openSearch);
      window.removeEventListener(CLOSE_EVENT, closeSearch);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, open, results]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults(index.slice(0, 8));
      setActiveIndex(0);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [index, open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const emptyMessage = useMemo(() => {
    if (!query.trim()) {
      return "Start typing to search the documentation.";
    }

    return `No results for '${query}'.`;
  }, [query]);

  function navigate(href: string) {
    setOpen(false);
    router.push(href);
  }

  if (!open) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close search"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />
      <div className="relative flex min-h-screen items-start justify-center p-4 pt-[10vh]">
        <div className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 dark:border-slate-800">
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search docs..."
              className="w-full bg-transparent px-5 py-4 text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {loading ? (
              <div className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Loading search index…
              </div>
            ) : results.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                {emptyMessage}
              </div>
            ) : (
              <ul className="space-y-1">
                {results.map((result, index_) => {
                  const active = index_ === activeIndex;

                  return (
                    <li key={result.href}>
                      <Link
                        href={result.href}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() => setActiveIndex(index_)}
                        className={`block rounded-lg px-3 py-3 transition-colors ${
                          active
                            ? "bg-brand-50 text-slate-900 dark:bg-brand-950/40 dark:text-white"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {highlightMatch(result.title, query)}
                          </span>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {highlightMatch(result.section, query)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                          {highlightMatch(result.excerpt, query)}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function highlightMatch(text: string, query: string): JSX.Element {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return <>{text}</>;
  }

  const pattern = new RegExp(`(${escapeRegExp(normalizedQuery)})`, "ig");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === normalizedQuery.toLowerCase() ? (
          <mark
            key={`${part}-${index}`}
            className="rounded bg-brand-100 px-0.5 text-brand-700 dark:bg-brand-900/40 dark:text-brand-400"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={`${part}-${index}`}>{part}</Fragment>
        )
      )}
    </>
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
