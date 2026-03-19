import { clinicContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          lead="Every service description is short, practical, and written for patients deciding whether to take the next step."
          title="Choose the review that fits your needs"
        />
        <div
          style={{
            display: "grid",
            gap: "1.15rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
          }}
        >
          {clinicContent.services.map((service) => (
            <SurfaceCard key={service.title}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  height: "100%",
                  padding: "1.5rem"
                }}
              >
                <div
                  style={{
                    color: service.featured ? "var(--primary-strong)" : "var(--text)",
                    fontFamily: "Georgia, serif",
                    fontSize: "1.55rem",
                    lineHeight: 1.15
                  }}
                >
                  {service.title}
                </div>
                <div className="field-hint" style={{ marginTop: 0 }}>
                  {service.summary}
                </div>
                <div
                  style={{
                    background: service.featured ? "var(--primary-soft)" : "var(--surface-muted)",
                    borderRadius: "var(--radius-sm)",
                    marginTop: "auto",
                    padding: "1rem"
                  }}
                >
                  <div className="field-label">Indicative duration</div>
                  <div>{service.duration}</div>
                  <div className="field-hint" style={{ marginTop: "0.5rem" }}>
                    {service.audience}
                  </div>
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
