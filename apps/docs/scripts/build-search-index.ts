import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, posix, relative } from "node:path";

type SearchIndexEntry = {
  title: string;
  section: string;
  href: string;
  excerpt: string;
};

const APP_DOCS_DIR = join(process.cwd(), "app", "docs");
const PUBLIC_DIR = join(process.cwd(), "public");
const OUTPUT_FILE = join(PUBLIC_DIR, "search-index.json");

async function main(): Promise<void> {
  const files = await collectPageFiles(APP_DOCS_DIR);
  const entries: SearchIndexEntry[] = [];

  for (const file of files) {
    const raw = await readFile(file, "utf8");
    const routePath = relative(APP_DOCS_DIR, file).replace(/\\/g, "/");
    const title = extractTitle(raw) ?? fallbackTitle(routePath);
    const section = formatSection(routePath);
    const href = toHref(routePath);
    const excerpt = extractExcerpt(raw, title);

    entries.push({ excerpt, href, section, title });
  }

  entries.sort((left, right) => left.href.localeCompare(right.href));

  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, JSON.stringify(entries, null, 2));
  process.stdout.write(`Wrote ${entries.length} search entries to ${OUTPUT_FILE}\n`);
}

async function collectPageFiles(directory: string): Promise<string[]> {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectPageFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name === "page.mdx") {
      files.push(fullPath);
    }
  }

  return files;
}

function extractTitle(source: string): string | undefined {
  const match = source.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim();
}

function extractExcerpt(source: string, title: string): string {
  const plainText = stripMdx(source)
    .replace(title, "")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.slice(0, 160).trim();
}

function stripMdx(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/^---[\s\S]*?---$/gm, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[>*_~|]/g, " ");
}

function formatSection(routePath: string): string {
  const [section] = routePath.split("/");
  return toTitleCase(section ?? "Docs");
}

function fallbackTitle(routePath: string): string {
  const segments = routePath.split("/");
  const slug = segments.at(-2) ?? "overview";
  return toTitleCase(slug);
}

function toHref(routePath: string): string {
  const withoutPage = routePath.replace(/\/page\.mdx$/, "");
  return posix.join("/docs", withoutPage);
}

function toTitleCase(input: string): string {
  return input
    .split(/[-/]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
