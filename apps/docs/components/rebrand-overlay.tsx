"use client";

import { useState } from "react";

const DOMGLYPH_URL = "https://domglyph.llcortex.ai";

export function RebrandOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-label="CortexUI is now DOMglyph"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 opacity-[0.97]" />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center max-w-2xl w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          Announcement
        </div>

        {/* Heading — same style as homepage h1 */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
          CortexUI is now<br />
          <span className="text-brand-600">DOMglyph</span>
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg mb-10 leading-relaxed">
          The project has a new name, a new npm scope, and a new home. All packages are now published under{" "}
          <code className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">@domglyph/*</code>{" "}
          starting at v2.0.0.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={DOMGLYPH_URL}
            className="px-8 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20 text-base"
          >
            Go to DOMglyph →
          </a>
          <button
            onClick={() => setVisible(false)}
            className="px-8 py-3 rounded-lg font-medium text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors text-base"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
