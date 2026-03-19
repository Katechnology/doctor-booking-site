import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { clinicContent } from "@/lib/content";

export function DoctorSection() {
  return (
    <section className="section" id="about-doctor">
      <div className="container">
        <SectionHeading
          eyebrow="About the Doctor"
          lead="Patients often arrive wanting confidence, not complexity. This section keeps the story personal, credible, and easy to scan."
          title={clinicContent.doctor.name}
        />

        <div
        style={{
          alignItems: "stretch",
          display: "grid",
          gap: "1.3rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
        }}
      >
          <SurfaceCard>
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(234, 243, 255, 0.95), rgba(255, 255, 255, 0.98)), radial-gradient(circle at top, rgba(31,95,175,0.12), transparent 55%)",
                borderRadius: "calc(var(--radius-lg) - 6px)",
                height: "100%",
                minHeight: "24rem",
                padding: "2rem",
                position: "relative"
              }}
            >
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(216, 228, 240, 0.9)",
                  borderRadius: "var(--radius-md)",
                  bottom: "1.6rem",
                  padding: "1.1rem",
                  position: "absolute",
                  right: "1.6rem",
                  width: "14rem"
                }}
              >
                <div className="field-label">Consultation style</div>
                <div className="field-hint" style={{ marginTop: "0.25rem" }}>
                  Unhurried, structured, and easy to follow.
                </div>
              </div>
              <div style={{ maxWidth: "18rem" }}>
                <div
                  style={{
                    background: "rgba(31, 95, 175, 0.11)",
                    borderRadius: "999px",
                    color: "var(--primary-strong)",
                    display: "inline-flex",
                    fontWeight: 700,
                    padding: "0.5rem 0.85rem"
                  }}
                >
                  18+ years of practice
                </div>
              </div>
            </div>
          </SurfaceCard>

          <div style={{ display: "grid", gap: "1.3rem" }}>
            <SurfaceCard>
              <div style={{ padding: "1.7rem" }}>
                <p className="section-lead" style={{ color: "var(--text)", fontSize: "1.08rem", maxWidth: "unset" }}>
                  {clinicContent.doctor.bio}
                </p>
              </div>
            </SurfaceCard>
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
              }}
            >
              {clinicContent.proofPoints.map((point) => (
                <SurfaceCard key={point.title}>
                  <div style={{ padding: "1.4rem" }}>
                    <div className="field-label">{point.title}</div>
                    <div className="field-hint" style={{ marginTop: "0.35rem" }}>
                      {point.description}
                    </div>
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
