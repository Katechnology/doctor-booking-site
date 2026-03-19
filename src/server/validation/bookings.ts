import type { BookingPayload } from "@/lib/api-client";

const AGE_RANGE_VALUES = ["40-44", "45-54", "55-64", "65+"] as const;
const CONTACT_METHOD_VALUES = ["phone", "email"] as const;
const TIME_WINDOW_VALUES = ["morning", "afternoon", "late-afternoon"] as const;

export type BookingFieldErrors = Partial<Record<keyof BookingPayload, string>>;

export type BookingValidationResult =
  | {
      ok: true;
      data: BookingPayload;
    }
  | {
      ok: false;
      message: string;
      fieldErrors: BookingFieldErrors;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidDateString(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidCalendarDate(value: string) {
  if (!isValidDateString(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  return parsed.toISOString().slice(0, 10) === value;
}

function isValidPhoneNumber(value: string) {
  return /^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]{6,}$/.test(value);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isTodayOrLater(value: string) {
  const today = new Date().toISOString().slice(0, 10);
  return value >= today;
}

function isOneOf<T extends readonly string[]>(value: string, options: T): value is T[number] {
  return options.includes(value as T[number]);
}

export function validateBookingPayload(payload: unknown): BookingValidationResult {
  if (!isRecord(payload)) {
    return {
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: {
        fullName: "Please enter your full name.",
        ageRange: "Please select an age range.",
        phone: "Please enter a valid phone number.",
        email: "Please enter a valid email address.",
        preferredContactMethod: "Please choose a contact method.",
        preferredDate: "Please choose a preferred date.",
        preferredTimeWindow: "Please choose a preferred time window.",
        reasonForVisit: "Please provide 10 to 500 characters about your reason for visit.",
        consentAccepted: "Please confirm that the clinic may contact you about this request."
      }
    };
  }

  const fullName = readTrimmedString(payload.fullName);
  const ageRange = readTrimmedString(payload.ageRange);
  const phone = readTrimmedString(payload.phone);
  const email = readTrimmedString(payload.email);
  const preferredContactMethod = readTrimmedString(payload.preferredContactMethod);
  const preferredDate = readTrimmedString(payload.preferredDate);
  const preferredTimeWindow = readTrimmedString(payload.preferredTimeWindow);
  const reasonForVisit = readTrimmedString(payload.reasonForVisit);
  const existingConditions = readTrimmedString(payload.existingConditions);
  const preferredDoctorNote = readTrimmedString(payload.preferredDoctorNote);
  const consentAccepted = payload.consentAccepted === true;

  const fieldErrors: BookingFieldErrors = {};

  if (fullName.length < 2) {
    fieldErrors.fullName = "Please enter your full name.";
  }

  if (!isOneOf(ageRange, AGE_RANGE_VALUES)) {
    fieldErrors.ageRange = "Please select an age range.";
  }

  if (!isValidPhoneNumber(phone)) {
    fieldErrors.phone = "Please enter a valid phone number.";
  }

  if (!isValidEmail(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!isOneOf(preferredContactMethod, CONTACT_METHOD_VALUES)) {
    fieldErrors.preferredContactMethod = "Please choose a contact method.";
  }

  if (!preferredDate) {
    fieldErrors.preferredDate = "Please choose a preferred date.";
  } else if (!isValidCalendarDate(preferredDate) || !isTodayOrLater(preferredDate)) {
    fieldErrors.preferredDate = "Preferred date must be today or later.";
  }

  if (!isOneOf(preferredTimeWindow, TIME_WINDOW_VALUES)) {
    fieldErrors.preferredTimeWindow = "Please choose a preferred time window.";
  }

  if (reasonForVisit.length < 10 || reasonForVisit.length > 500) {
    fieldErrors.reasonForVisit = "Please provide 10 to 500 characters about your reason for visit.";
  }

  if (!consentAccepted) {
    fieldErrors.consentAccepted = "Please confirm that the clinic may contact you about this request.";
  }

  if (existingConditions.length > 1000) {
    fieldErrors.existingConditions = "Please shorten this note to 1000 characters or less.";
  }

  if (preferredDoctorNote.length > 500) {
    fieldErrors.preferredDoctorNote = "Please shorten this note to 500 characters or less.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      fieldErrors
    };
  }

  return {
    ok: true,
    data: {
      fullName,
      ageRange,
      phone,
      email,
      preferredContactMethod: preferredContactMethod as BookingPayload["preferredContactMethod"],
      preferredDate,
      preferredTimeWindow,
      reasonForVisit,
      existingConditions,
      preferredDoctorNote,
      consentAccepted
    }
  };
}
