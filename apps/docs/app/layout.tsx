import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { AIViewOverlay } from "@/components/ai-view-overlay";
import { AIViewProvider } from "@/components/ai-view-toggle";
import { DocsRuntimeBridge } from "@/components/docs-runtime-bridge";
import { Search } from "@/components/search";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s — CortexUI",
    default: "CortexUI — AI-native design system"
  },
  description: "The design system that makes web interfaces visually usable for humans and programmatically operable for AI agents.",
  keywords: ["design system", "AI", "UI components", "accessibility", "React"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AIViewProvider>
            <DocsRuntimeBridge />
            {children}
            <AIViewOverlay />
            <Search />
          </AIViewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
