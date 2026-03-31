"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-[60px] bottom-0 w-[272px] overflow-y-auto scrollbar-thin border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hidden lg:block">
      <div className="px-4 py-6 space-y-8">
        {navigation.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </h5>
              {section.badge && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                  {section.badge}
                </span>
              )}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                        isActive
                          ? "bg-brand-50 text-brand-700 font-medium dark:bg-brand-900/20 dark:text-brand-400"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
