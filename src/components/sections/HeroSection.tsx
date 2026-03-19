import { clinicContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function HeroSection() {
  return (
    <section className="section" id="top" style={{ paddingTop: "3rem" }}>
      <div
        className="container"
        style={{
          alignItems: "center",
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"
        }}
      >
        <div>
          <div className="section-eyebrow">Private Preventive Care</div>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.96,
              margin: 0,
              maxWidth: "11ch"
            }}
          >
            {clinicContent.doctor.specialty}
          </h1>
          <p className="section-lead" style={{ fontSize: "1.15rem", marginTop: "1.35rem", maxWidth: "40rem" }}>
            {clinicContent.doctor.tagline}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.8rem" }}>
            <Button href="#book-visit">Book a Health Check</Button>
            <Button href="#about-doctor" variant="secondary">
              Learn About the Doctor
            </Button>
          </div>
          <div
            style={{
              display: "grid",
              gap: "0.85rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              marginTop: "2rem"
            }}
          >
            {clinicContent.trustBar.map((item) => (
              <SurfaceCard key={item}>
                <div style={{ padding: "1rem 1.15rem" }}>
                  <div style={{ color: "var(--primary)", fontSize: "1.25rem", marginBottom: "0.35rem" }}>+</div>
                  <div style={{ fontWeight: 700 }}>{item}</div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>

        <SurfaceCard>
          <div style={{ padding: "1.2rem" }}>
            <div
              style={{
                background:
                  "linear-gradient(160deg, rgba(31, 95, 175, 0.12), rgba(234, 243, 255, 0.9) 38%, rgba(255, 255, 255, 0.98) 100%)",
                borderRadius: "calc(var(--radius-lg) - 6px)",
                minHeight: "32rem",
                overflow: "hidden",
                padding: "2rem",
                position: "relative"
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.92)",
                  border: "1px solid rgba(216, 228, 240, 0.9)",
                  borderRadius: "var(--radius-md)",
                  maxWidth: "16rem",
                  padding: "1.1rem",
                  position: "absolute",
                  right: "1.2rem",
                  top: "1.2rem"
                }}
              >
                <div className="field-label">Next available review</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "1.45rem" }}>This week</div>
                <div className="field-hint">Booking requests confirmed personally</div>
              </div>
              <div
                aria-label={clinicContent.doctor.portraitAlt}
                role="img"
                style={{
                  background:
                    "radial-gradient(circle at 50% 22%, #ffffff 0%, rgba(255,255,255,0.88) 18%, rgba(31,95,175,0.18) 18.2%, rgba(31,95,175,0.12) 40%, transparent 40.2%), linear-gradient(180deg, rgba(31,95,175,0.05), rgba(31,95,175,0.16))",
                  borderRadius: "28px",
                  bottom: "1.4rem",
                  left: "1.4rem",
                  position: "absolute",
                  right: "1.4rem",
                  top: "6.8rem"
                }}
              >
                <div
                  style={{
                    border: "2px solid rgba(22, 72, 130, 0.2)",
                    borderRadius: "999px",
                    height: "8.5rem",
                    left: "50%",
                    position: "absolute",
                    top: "18%",
                    transform: "translateX(-50%)",
                    width: "8.5rem"
                  }}
                />
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(31,95,175,0.2), rgba(22,72,130,0.4))",
                    borderRadius: "42% 42% 28% 28%",
                    bottom: "12%",
                    height: "50%",
                    left: "50%",
                    position: "absolute",
                    transform: "translateX(-50%)",
                    width: "58%"
                  }}
                />
              </div>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </section>
  );
}
