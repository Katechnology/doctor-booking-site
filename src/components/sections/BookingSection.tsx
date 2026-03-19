import { BookingForm } from "@/components/booking/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function BookingSection() {
  return (
    <section className="section" id="book-visit">
      <div className="container">
        <SectionHeading
          eyebrow="Book Visit"
          lead="This form is designed to feel calm and straightforward on both desktop and mobile, with clear reassurance before submission."
          title="Request a health check"
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
              <div className="field-label">Before you send</div>
              <div className="field-hint" style={{ marginTop: "0.5rem" }}>
                Your request is reviewed by the clinic team. You will receive a confirmation call or email to finalize
                the visit.
              </div>
              <div
                style={{
                  background: "var(--primary-soft)",
                  borderRadius: "var(--radius-sm)",
                  marginTop: "1.25rem",
                  padding: "1rem"
                }}
              >
                <div className="field-label">Expected response</div>
                <div className="field-hint" style={{ marginTop: "0.35rem" }}>
                  Within one business day for most requests.
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px solid rgba(216, 228, 240, 0.8)",
                  marginTop: "1.25rem",
                  paddingTop: "1.25rem"
                }}
              >
                <div className="field-label">Privacy note</div>
                <div className="field-hint" style={{ marginTop: "0.35rem" }}>
                  Information is used only for scheduling and care coordination in line with the clinic process.
                </div>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <div style={{ padding: "1.6rem" }}>
              <BookingForm />
            </div>
          </SurfaceCard>
        </div>
      </div>
    </section>
  );
}
