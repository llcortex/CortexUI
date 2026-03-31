import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/toc";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:pl-[272px] xl:pr-[224px]">
          <article className="min-h-screen max-w-3xl mx-auto px-6 py-10">
            {children}
          </article>
        </main>
        <TableOfContents />
      </div>
    </div>
  );
}
