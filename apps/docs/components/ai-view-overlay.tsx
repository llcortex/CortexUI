"use client";

import { useAIView } from "@/components/ai-view-toggle";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { createPortal } from "react-dom";

type AnnotatedElement = {
  id: string;
  role: string;
  label: string;
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  attributes: Record<string, string>;
};

type HoverState = {
  attributes: Record<string, string>;
  role: string;
  x: number;
  y: number;
} | null;

const ROLE_STYLES: Record<string, string> = {
  action: "bg-orange-500 text-white border-orange-400",
  field: "bg-blue-500 text-white border-blue-400",
  form: "bg-emerald-500 text-white border-emerald-400",
  table: "bg-purple-500 text-white border-purple-400",
  modal: "bg-red-500 text-white border-red-400",
  screen: "bg-teal-500 text-white border-teal-400",
  section: "bg-slate-600 text-white border-slate-500",
  status: "bg-yellow-500 text-slate-950 border-yellow-400",
  "nav-item": "bg-pink-500 text-white border-pink-400"
};

export function AIViewOverlay(): JSX.Element | null {
  const pathname = usePathname();
  const { enabled, toggle } = useAIView();
  const [mounted, setMounted] = useState(false);
  const [allElements, setAllElements] = useState<AnnotatedElement[]>([]);
  const [visibleElements, setVisibleElements] = useState<AnnotatedElement[]>([]);
  const [hovered, setHovered] = useState<HoverState>(null);

  const scanAnnotatedElements = useCallback(() => {
    if (!enabled) {
      setAllElements([]);
      setVisibleElements([]);
      setHovered(null);
      return;
    }

    const article = document.querySelector("article");
    if (!article) {
      setAllElements([]);
      setVisibleElements([]);
      return;
    }

    const nextElements = Array.from(
      article.querySelectorAll<HTMLElement>("[data-ai-role]")
    )
      .map((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          return null;
        }

        const attributes = Array.from(element.attributes)
          .filter((attribute) => attribute.name.startsWith("data-ai-"))
          .reduce<Record<string, string>>((accumulator, attribute) => {
            accumulator[attribute.name] = attribute.value;
            return accumulator;
          }, {});

        const role = attributes["data-ai-role"] ?? "unknown";
        const id = attributes["data-ai-id"] ?? `${role}-${index}`;
        const labelParts = [
          role,
          attributes["data-ai-id"],
          attributes["data-ai-state"],
          attributes["data-ai-action"]
        ].filter(Boolean);

        return {
          attributes,
          id,
          label: labelParts.join(" · "),
          rect: {
            height: rect.height,
            left: rect.left,
            top: rect.top,
            width: rect.width
          },
          role
        } satisfies AnnotatedElement;
      })
      .filter((element): element is AnnotatedElement => element !== null);

    setAllElements(nextElements);
    setVisibleElements(
      nextElements.filter(
        (element) =>
          element.rect.top + element.rect.height >= 0 &&
          element.rect.top <= window.innerHeight
      )
    );
  }, [enabled]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setAllElements([]);
      setVisibleElements([]);
      setHovered(null);
      return;
    }

    const timer = window.setTimeout(() => {
      scanAnnotatedElements();
    }, 0);

    const onScrollOrResize = () => {
      scanAnnotatedElements();
    };

    const onMouseMove = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("article [data-ai-role]")
          : null;

      if (!target) {
        setHovered(null);
        return;
      }

      const attributes = Array.from(target.attributes)
        .filter((attribute) => attribute.name.startsWith("data-ai-"))
        .reduce<Record<string, string>>((accumulator, attribute) => {
          accumulator[attribute.name] = attribute.value;
          return accumulator;
        }, {});

      setHovered({
        attributes,
        role: attributes["data-ai-role"] ?? "unknown",
        x: Math.min(event.clientX + 18, window.innerWidth - 320),
        y: Math.min(event.clientY + 18, window.innerHeight - 220)
      });
    };

    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    document.addEventListener("mousemove", onMouseMove, true);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("mousemove", onMouseMove, true);
    };
  }, [enabled, pathname, scanAnnotatedElements]);

  const bannerCount = useMemo(() => allElements.length, [allElements]);

  if (!mounted || !enabled) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[90]">
      {visibleElements.map((element) => (
        <div
          key={element.id}
          className={`absolute max-w-[280px] rounded-full border px-2.5 py-1 text-[11px] font-medium shadow-lg ${ROLE_STYLES[element.role] ?? "bg-slate-900 text-white border-slate-700"}`}
          style={{
            left: Math.max(12, element.rect.left),
            top: Math.max(12, element.rect.top - 34)
          }}
        >
          {element.label}
        </div>
      ))}

      {hovered ? (
        <div
          className="pointer-events-auto absolute min-w-[260px] max-w-[320px] rounded-xl border border-slate-700 bg-slate-950/95 p-3 font-mono text-xs text-slate-100 shadow-2xl"
          style={{
            left: hovered.x,
            top: hovered.y
          }}
        >
          <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-brand-400">
            {hovered.role} inspector
          </div>
          <div className="space-y-1.5">
            {Object.entries(hovered.attributes).map(([key, value]) => (
              <div key={key} className="grid grid-cols-[1fr_auto] gap-3">
                <span className="text-slate-400">{key}</span>
                <span className="text-right text-slate-100">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="pointer-events-auto fixed inset-x-0 bottom-0 flex justify-center p-4">
        <div className="flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-brand-500/30 bg-slate-950/95 px-4 py-3 shadow-2xl shadow-slate-950/40">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600/20 text-brand-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div className="min-w-0 flex-1 text-sm text-slate-100">
            <div className="font-medium">AI View active — highlighting machine-readable layer</div>
            <div className="text-slate-400">{bannerCount} AI-annotated elements</div>
          </div>
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-brand-500 hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
