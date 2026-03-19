import { clinicContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function TrustSection() {
  return (
    <section className="section" id="trust">
      <div className="container">
        <SectionHeading
          eyebrow="Trust & Credentials"
          lead="Trust comes from specifics: credentials, careful standards, confidentiality, and a clear next-step process."
          title="A private clinic experience built around clarity"
        />
        <div
        style={{
          alignItems: "start",
          display: "grid",
          gap: "1.2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
        }}
      >
          <SurfaceCard>
            <div style={{ padding: "1.6rem" }}>
              <div className="field-label" style={{ marginBottom: "1rem" }}>
                Why patients feel confident here
              </div>
              <div style={{ display: "grid", gap: "0.9rem" }}>
                {clinicContent.credentials.map((item) => (
                  <div
                    key={item}
                    style={{
                      alignItems: "start",
                      display: "grid",
                      gap: "0.8rem",
                      gridTemplateColumns: "auto 1fr"
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        background: "var(--primary-soft)",
                        borderRadius: "999px",
                        color: "var(--primary)",
                        display: "inline-flex",
                        fontWeight: 700,
                        height: "1.8rem",
                        justifyContent: "center",
                        width: "1.8rem"
                      }}
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>
          <div style={{ display: "grid", gap: "1.2rem" }}>
            <SurfaceCard>
              <div style={{ padding: "1.6rem" }}>
                <div className="field-label" style={{ marginBottom: "1rem" }}>
                  Simple booking steps
                </div>
                <div style={{ display: "grid", gap: "0.9rem" }}>
                  {clinicContent.careSteps.map((step, index) => (
                    <div key={step} style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "auto 1fr" }}>
                      <div
                        style={{
                          alignItems: "center",
                          background: "var(--primary)",
                          borderRadius: "999px",
                          color: "#fff",
                          display: "inline-flex",
                          fontWeight: 700,
                          height: "2rem",
                          justifyContent: "center",
                          width: "2rem"
                        }}
                      >
                        {index + 1}
                      </div>
                      <div>{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SurfaceCard>
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
              }}
            >
              {clinicContent.testimonials.map((testimonial) => (
                <SurfaceCard key={testimonial.name}>
                  <div style={{ padding: "1.4rem" }}>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", lineHeight: 1.5, marginTop: 0 }}>
                      “{testimonial.quote}”
                    </p>
                    <div className="field-hint">{testimonial.name}</div>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
