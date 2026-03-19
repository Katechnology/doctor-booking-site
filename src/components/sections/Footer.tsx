import { clinicContent } from "@/lib/content";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(216, 228, 240, 0.8)", padding: "2.2rem 0 3rem" }}>
      <div
        className="container"
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
        }}
      >
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", marginBottom: "0.35rem" }}>
            Dr. Elena Maris
          </div>
          <div className="field-hint">Private Health Check Clinic</div>
        </div>
        <div>
          <div className="field-label">Clinic</div>
          <div className="field-hint">{clinicContent.contact.address}</div>
        </div>
        <div>
          <div className="field-label">Contact</div>
          <div className="field-hint">{clinicContent.contact.email}</div>
          <div className="field-hint">{clinicContent.contact.phone}</div>
        </div>
        <div>
          <div className="field-label">Hours</div>
          <div className="field-hint">{clinicContent.contact.hours}</div>
          <div className="field-hint" style={{ marginTop: "0.5rem" }}>
            Privacy-first care and secure handling of booking requests.
          </div>
        </div>
      </div>
    </footer>
  );
}
