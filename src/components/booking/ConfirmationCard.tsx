"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BookingDetails } from "@/lib/api-client";
import { fetchBookingDetails } from "@/lib/api-client";

const timeWindowLabels: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  "late-afternoon": "Late afternoon"
};

const contactMethodLabels: Record<string, string> = {
  phone: "Phone call",
  email: "Email"
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(216, 228, 240, 0.9)",
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        padding: "1rem 0"
      }}
    >
      <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{label}</span>
      <span style={{ textAlign: "right" }}>{value}</span>
    </div>
  );
}

export function ConfirmationCard({ bookingId }: { bookingId?: string }) {
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(bookingId));

  useEffect(() => {
    if (!bookingId) {
      setIsLoading(false);
      setErrorMessage("A booking reference was not provided.");
      return;
    }

    const resolvedBookingId = bookingId;
    let isMounted = true;

    async function loadBooking() {
      try {
        const response = await fetchBookingDetails(resolvedBookingId);
        if (!isMounted) {
          return;
        }

        setBooking(response);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : "The booking reference could not be confirmed.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadBooking();

    return () => {
      isMounted = false;
    };
  }, [bookingId]);

  if (isLoading) {
    return (
      <section className="section">
        <div className="container">
          <div className="card" style={{ margin: "0 auto", maxWidth: "42rem", padding: "2rem" }}>
            <div className="section-eyebrow">Loading Booking</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
              Retrieving your request details
            </h1>
            <p className="section-lead">Please wait a moment while we load your booking reference.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="section">
        <div className="container">
          <div className="card" style={{ margin: "0 auto", maxWidth: "42rem", padding: "2rem" }}>
            <div className="section-eyebrow">Booking Status</div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
              We could not load that booking request.
            </h1>
            <p className="section-lead" style={{ marginBottom: "1.5rem" }}>
              {errorMessage ??
                "Please return to the homepage and submit a new request, or contact the clinic directly if you already spoke with the team."}
            </p>
            {bookingId ? (
              <div className="field-hint" style={{ marginBottom: "1.5rem" }}>
                Booking reference: <strong>{bookingId}</strong>
              </div>
            ) : null}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem" }}>
              <Link className="button button-primary" href="/">
                Return to homepage
              </Link>
              <a className="button button-secondary" href="mailto:hello@marisclinic.example">
                Contact clinic
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div
          className="card"
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            margin: "0 auto",
            maxWidth: "62rem",
            padding: "2rem"
          }}
        >
          <div>
            <div
              style={{
                alignItems: "center",
                color: "var(--success)",
                display: "inline-flex",
                fontSize: "0.95rem",
                fontWeight: 700,
                gap: "0.6rem",
                marginBottom: "1rem"
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  background: "rgba(46, 125, 90, 0.12)",
                  borderRadius: "999px",
                  display: "inline-block",
                  height: "0.8rem",
                  width: "0.8rem"
                }}
              />
              Request received
            </div>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Thank you, {booking.fullName}.
            </h1>
            <p className="section-lead" style={{ marginBottom: "1.5rem" }}>
              Your request has been received by the clinic. A member of the team will review your preferred date and
              contact you within one business day.
            </p>
            <div
              className="card"
              style={{
                background: "var(--primary-soft)",
                borderColor: "rgba(31, 95, 175, 0.12)",
                boxShadow: "none",
                padding: "1.2rem 1.3rem"
              }}
            >
              <div className="field-label">What happens next</div>
              <div className="field-hint" style={{ marginTop: "0.4rem" }}>
                The clinic will confirm availability, recommend any preparation if needed, and finalize your visit by{" "}
                {contactMethodLabels[booking.preferredContactMethod] ?? "your preferred contact method"}.
              </div>
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(180deg, rgba(31, 95, 175, 0.04), rgba(255, 255, 255, 0.95))",
              border: "1px solid rgba(216, 228, 240, 0.9)",
              borderRadius: "var(--radius-md)",
              padding: "1.4rem"
            }}
          >
            <div className="field-label">Booking summary</div>
            <DetailRow label="Reference" value={booking.bookingId} />
            <DetailRow label="Status" value={booking.status} />
            <DetailRow label="Preferred date" value={booking.preferredDate} />
            <DetailRow
              label="Preferred time"
              value={timeWindowLabels[booking.preferredTimeWindow] ?? booking.preferredTimeWindow}
            />
            <DetailRow
              label="Contact method"
              value={contactMethodLabels[booking.preferredContactMethod] ?? booking.preferredContactMethod}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", marginTop: "1.6rem" }}>
              <Link className="button button-primary" href="/">
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
