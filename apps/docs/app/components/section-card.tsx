export function SectionCard({
  title,
  children
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <section
      style={{
        border: "1px solid var(--docs-line)",
        borderRadius: "20px",
        padding: "24px",
        background: "rgba(255, 255, 255, 0.55)"
      }}
    >
      <h2 style={{ fontSize: "1.5rem", margin: "0 0 14px" }}>{title}</h2>
      <div style={{ color: "var(--docs-muted)", display: "grid", gap: "14px" }}>{children}</div>
    </section>
  );
}
