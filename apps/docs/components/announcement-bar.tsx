export function AnnouncementBar() {
  return (
    <div className="w-full bg-brand-600 text-white text-sm">
      <div className="flex items-center justify-center gap-3 px-6 py-2.5 text-center">
        <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse shrink-0" />
        <p className="font-medium">
          CortexUI is now DOMglyph —{" "}
          <a
            href="https://domglyph.llcortex.ai"
            className="underline underline-offset-2 hover:text-white/80 transition-colors"
          >
            visit the new site
          </a>
        </p>
      </div>
    </div>
  );
}
