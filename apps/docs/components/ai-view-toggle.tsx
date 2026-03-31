"use client";

import { useState, createContext, useContext, useEffect } from "react";

interface AIViewContextType {
  enabled: boolean;
  toggle: () => void;
}

export const AIViewContext = createContext<AIViewContextType>({
  enabled: false,
  toggle: () => {}
});

export function useAIView() {
  return useContext(AIViewContext);
}

export function AIViewProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("ai-view");
    } else {
      document.documentElement.classList.remove("ai-view");
    }
  }, [enabled]);

  return (
    <AIViewContext.Provider value={{ enabled, toggle: () => setEnabled(p => !p) }}>
      {children}
    </AIViewContext.Provider>
  );
}

export function AIViewToggle() {
  const { enabled, toggle } = useAIView();

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
        enabled
          ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-600/20"
          : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
      }`}
      aria-pressed={enabled}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      AI View
    </button>
  );
}
