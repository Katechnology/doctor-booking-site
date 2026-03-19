type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div style={{ textAlign: align, marginBottom: "2rem" }}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      <p
        className="section-lead"
        style={align === "center" ? { marginLeft: "auto", marginRight: "auto" } : undefined}
      >
        {lead}
      </p>
    </div>
  );
}
