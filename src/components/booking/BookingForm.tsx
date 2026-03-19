"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  ageRangeOptions,
  contactMethodOptions,
  getInitialBookingValues,
  timeWindowOptions,
  validateBookingForm,
  type BookingFormErrors,
  type BookingFormValues
} from "@/components/booking/form-schema";
import { Button } from "@/components/ui/Button";
import { createBooking, ApiClientError } from "@/lib/api-client";

function Field({
  children,
  error,
  hint,
  label,
  name
}: {
  children: React.ReactNode;
  error?: string;
  hint?: string;
  label: string;
  name: string;
}) {
  return (
    <label htmlFor={name}>
      <span className="field-label">{label}</span>
      {children}
      {hint ? <div className="field-hint">{hint}</div> : null}
      {error ? (
        <div className="field-error" id={`${name}-error`}>
          {error}
        </div>
      ) : null}
    </label>
  );
}

function getInputProps(name: keyof BookingFormValues, errors: BookingFormErrors) {
  return {
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    "aria-invalid": errors[name] ? true : undefined,
    id: name,
    name
  };
}

export function BookingForm() {
  const router = useRouter();
  const [values, setValues] = useState(getInitialBookingValues);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const updateField = <Key extends keyof BookingFormValues>(key: Key, value: BookingFormValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitMessage(null);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateBookingForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await createBooking({
        ...values,
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        reasonForVisit: values.reasonForVisit.trim(),
        existingConditions: values.existingConditions?.trim(),
        preferredDoctorNote: values.preferredDoctorNote?.trim()
      });

      router.push(`/confirmation?bookingId=${encodeURIComponent(response.bookingId)}`);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setErrors((current) => ({ ...current, ...error.fieldErrors }));
        setSubmitMessage(error.message);
      } else {
        setSubmitMessage("We could not send your request right now. Please try again in a moment.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        style={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
        }}
      >
        <Field error={errors.fullName} label="Full name" name="fullName">
          <input
            {...getInputProps("fullName", errors)}
            className="field-control"
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Jane Doe"
            value={values.fullName}
          />
        </Field>

        <Field error={errors.ageRange} label="Age range" name="ageRange">
          <select
            {...getInputProps("ageRange", errors)}
            className="field-control"
            onChange={(event) => updateField("ageRange", event.target.value)}
            value={values.ageRange}
          >
            <option value="">Select age range</option>
            {ageRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field error={errors.phone} hint="A local or international number is fine." label="Phone number" name="phone">
          <input
            {...getInputProps("phone", errors)}
            className="field-control"
            inputMode="tel"
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="+1 555 123 4567"
            value={values.phone}
          />
        </Field>

        <Field error={errors.email} label="Email address" name="email">
          <input
            {...getInputProps("email", errors)}
            className="field-control"
            inputMode="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="jane@example.com"
            type="email"
            value={values.email}
          />
        </Field>

        <Field
          error={errors.preferredContactMethod}
          label="Preferred contact method"
          name="preferredContactMethod"
        >
          <select
            {...getInputProps("preferredContactMethod", errors)}
            className="field-control"
            onChange={(event) =>
              updateField("preferredContactMethod", event.target.value as BookingFormValues["preferredContactMethod"])
            }
            value={values.preferredContactMethod}
          >
            {contactMethodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field error={errors.preferredDate} label="Preferred date" name="preferredDate">
          <input
            {...getInputProps("preferredDate", errors)}
            className="field-control"
            min={new Date().toISOString().split("T")[0]}
            onChange={(event) => updateField("preferredDate", event.target.value)}
            type="date"
            value={values.preferredDate}
          />
        </Field>

        <Field error={errors.preferredTimeWindow} label="Preferred time window" name="preferredTimeWindow">
          <select
            {...getInputProps("preferredTimeWindow", errors)}
            className="field-control"
            onChange={(event) => updateField("preferredTimeWindow", event.target.value)}
            value={values.preferredTimeWindow}
          >
            {timeWindowOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          error={errors.preferredDoctorNote}
          hint="Optional: mention a specific preference for the visit."
          label="Preferred doctor note"
          name="preferredDoctorNote"
        >
          <input
            {...getInputProps("preferredDoctorNote", errors)}
            className="field-control"
            onChange={(event) => updateField("preferredDoctorNote", event.target.value)}
            placeholder="For example, first available with Dr. Maris"
            value={values.preferredDoctorNote}
          />
        </Field>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        <Field
          error={errors.reasonForVisit}
          hint="Please share enough detail for the clinic to guide the right visit type."
          label="Main concern or reason for visit"
          name="reasonForVisit"
        >
          <textarea
            {...getInputProps("reasonForVisit", errors)}
            className="field-control"
            onChange={(event) => updateField("reasonForVisit", event.target.value)}
            placeholder="Annual preventive health check and recent fatigue concerns."
            value={values.reasonForVisit}
          />
        </Field>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        <Field
          error={errors.existingConditions}
          hint="Optional: include medications, diagnoses, or anything useful for planning."
          label="Existing conditions"
          name="existingConditions"
        >
          <textarea
            {...getInputProps("existingConditions", errors)}
            className="field-control"
            onChange={(event) => updateField("existingConditions", event.target.value)}
            placeholder="Mild hypertension"
            value={values.existingConditions}
          />
        </Field>
      </div>

      <div style={{ marginTop: "1.4rem" }}>
        <label className="checkbox" htmlFor="consentAccepted">
          <input
            checked={values.consentAccepted}
            className="checkbox-input"
            id="consentAccepted"
            name="consentAccepted"
            onChange={(event) => updateField("consentAccepted", event.target.checked)}
            type="checkbox"
          />
          <span>
            <span className="field-label" style={{ marginBottom: "0.2rem" }}>
              I consent to the clinic contacting me about this booking request and handling my details for scheduling.
            </span>
            <span className="field-hint">
              This request is reviewed by the clinic team and is not an instant confirmed appointment.
            </span>
            {errors.consentAccepted ? <span className="field-error">{errors.consentAccepted}</span> : null}
          </span>
        </label>
      </div>

      {submitMessage ? (
        <div
          aria-live="polite"
          className="card"
          style={{
            color: "var(--danger)",
            marginTop: "1.4rem",
            padding: "1rem 1.1rem"
          }}
        >
          {submitMessage}
        </div>
      ) : null}

      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1.6rem"
        }}
      >
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Sending request..." : "Send Booking Request"}
        </Button>
        <div className="field-hint" style={{ maxWidth: "24rem" }}>
          Most requests receive a personal reply within one business day.
        </div>
      </div>
    </form>
  );
}
