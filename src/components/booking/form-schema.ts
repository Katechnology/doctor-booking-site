import type { BookingPayload } from "@/lib/api-client";

export const ageRangeOptions = ["40-44", "45-54", "55-64", "65+"] as const;

export const contactMethodOptions = [
  { label: "Phone call", value: "phone" },
  { label: "Email", value: "email" }
] as const;

export const timeWindowOptions = [
  { label: "Morning (8 AM - 12 PM)", value: "morning" },
  { label: "Afternoon (12 PM - 4 PM)", value: "afternoon" },
  { label: "Late afternoon (4 PM - 6 PM)", value: "late-afternoon" }
] as const;

export type BookingFormValues = BookingPayload;

export type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;

const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]{6,}$/;

function normalizeDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getInitialBookingValues(): BookingFormValues {
  return {
    fullName: "",
    ageRange: "",
    phone: "",
    email: "",
    preferredContactMethod: "phone",
    preferredDate: "",
    preferredTimeWindow: "morning",
    reasonForVisit: "",
    existingConditions: "",
    preferredDoctorNote: "",
    consentAccepted: false
  };
}

export function validateBookingForm(values: BookingFormValues): BookingFormErrors {
  const errors: BookingFormErrors = {};
  const trimmedName = values.fullName.trim();
  const trimmedPhone = values.phone.trim();
  const trimmedEmail = values.email.trim();
  const trimmedReason = values.reasonForVisit.trim();

  if (trimmedName.length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.ageRange) {
    errors.ageRange = "Please select an age range.";
  }

  if (!PHONE_REGEX.test(trimmedPhone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.preferredDate) {
    errors.preferredDate = "Please choose a preferred date.";
  } else {
    const selectedDate = normalizeDate(new Date(values.preferredDate));
    const today = normalizeDate(new Date());

    if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
      errors.preferredDate = "Preferred date must be today or later.";
    }
  }

  if (trimmedReason.length < 10 || trimmedReason.length > 500) {
    errors.reasonForVisit = "Please provide 10 to 500 characters about your reason for visit.";
  }

  if (!values.consentAccepted) {
    errors.consentAccepted = "Please confirm that the clinic may contact you about this request.";
  }

  return errors;
}
