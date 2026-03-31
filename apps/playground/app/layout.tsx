import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "CortexUI Playground",
  description: "Interactive demos for AI-aware CortexUI components."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
