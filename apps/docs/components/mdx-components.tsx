import type { MDXComponents } from "mdx/types";
import Link from "next/link";

function Callout({ type = "note", children }: { type?: "note" | "warning" | "tip" | "important"; children: React.ReactNode }) {
  const styles = {
    note: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100",
    warning: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100",
    tip: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-100",
    important: "bg-brand-50 border-brand-200 text-brand-900 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-100"
  };
  const icons = {
    note: "ℹ",
    warning: "⚠",
    tip: "✦",
    important: "★"
  };
  const labels = { note: "Note", warning: "Warning", tip: "Best Practice", important: "Important" };
  return (
    <div className={`my-6 flex gap-3 p-4 rounded-lg border ${styles[type]}`}>
      <span className="shrink-0 font-bold">{icons[type]}</span>
      <div>
        <div className="font-semibold text-sm mb-1">{labels[type]}</div>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

function AttributeTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    AttributeTable,
    a: ({ href, children, ...props }) => {
      if (href?.startsWith("/")) {
        return <Link href={href} className="text-brand-600 dark:text-brand-400 hover:underline" {...props}>{children}</Link>;
      }
      return <a href={href} className="text-brand-600 dark:text-brand-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
    },
    pre: ({ children, ...props }) => (
      <pre className="relative overflow-x-auto rounded-xl border border-slate-800 bg-[#0d1117] p-4 text-sm font-mono" {...props}>
        {children}
      </pre>
    ),
    code: ({ children, className, ...props }) => {
      if (className) {
        return <code className={`${className} text-slate-200`} {...props}>{children}</code>;
      }
      return <code className="px-1.5 py-0.5 text-[0.875em] bg-slate-100 dark:bg-slate-800 rounded font-mono text-slate-700 dark:text-slate-300" {...props}>{children}</code>;
    },
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-2 mb-4">{children}</h1>
    ),
    h2: ({ children, id }) => (
      <h2 id={id} className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 scroll-mt-20">{children}</h2>
    ),
    h3: ({ children, id }) => (
      <h3 id={id} className="text-lg font-semibold text-slate-900 dark:text-white mt-8 mb-3 scroll-mt-20">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-slate-600 dark:text-slate-400 leading-7 mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-slate-600 dark:text-slate-400">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-slate-600 dark:text-slate-400">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-400 pl-6 italic text-slate-600 dark:text-slate-400">{children}</blockquote>
    ),
    hr: () => <hr className="my-8 border-slate-200 dark:border-slate-800" />,
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-slate-50 dark:bg-slate-800/50">{children}</thead>,
    th: ({ children }) => <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">{children}</th>,
    td: ({ children }) => <td className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">{children}</td>
  };
}
