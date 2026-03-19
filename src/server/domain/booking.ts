import { randomBytes } from "node:crypto";

import type {
  BookingCreateInput,
  BookingCreateResponse,
  BookingDetails,
  BookingRecord,
  BookingStatus
} from "@/server/types";

export const DEFAULT_BOOKING_STATUS: BookingStatus = "received";

export const BOOKING_CREATE_RESPONSE_MESSAGE = "Your booking request has been received.";

function trimText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function generateBookingId(now: Date = new Date()): string {
  const timestamp = now.getTime().toString(36);
  const entropy = randomBytes(4).toString("hex");
  return `bk_${timestamp}_${entropy}`;
}

export function isBookingStatus(value: string): value is BookingStatus {
  return value === "received" || value === "contact_pending" || value === "confirmed" || value === "cancelled";
}

export function normalizeBookingInput(input: BookingCreateInput): BookingCreateInput {
  return {
    fullName: input.fullName.trim(),
    ageRange: input.ageRange.trim(),
    phone: input.phone.trim(),
    email: input.email.trim().toLowerCase(),
    preferredContactMethod: input.preferredContactMethod,
    preferredDate: input.preferredDate.trim(),
    preferredTimeWindow: input.preferredTimeWindow.trim(),
    reasonForVisit: input.reasonForVisit.trim(),
    existingConditions: trimText(input.existingConditions),
    preferredDoctorNote: trimText(input.preferredDoctorNote),
    consentAccepted: input.consentAccepted
  };
}

export function createBookingRecord(input: BookingCreateInput, now: Date = new Date()): BookingRecord {
  const normalized = normalizeBookingInput(input);
  const timestamp = now.toISOString();

  return {
    id: generateBookingId(now),
    createdAt: timestamp,
    updatedAt: timestamp,
    status: DEFAULT_BOOKING_STATUS,
    ...normalized
  };
}

export function updateBookingRecord(
  booking: BookingRecord,
  changes: Partial<Pick<BookingRecord, "status">> & { updatedAt?: Date } = {}
): BookingRecord {
  const updatedAt = changes.updatedAt ? changes.updatedAt.toISOString() : booking.updatedAt;

  return {
    ...booking,
    ...(changes.status ? { status: changes.status } : {}),
    updatedAt
  };
}

export function toBookingDetails(booking: BookingRecord): BookingDetails {
  return {
    bookingId: booking.id,
    status: booking.status,
    fullName: booking.fullName,
    preferredDate: booking.preferredDate,
    preferredTimeWindow: booking.preferredTimeWindow,
    preferredContactMethod: booking.preferredContactMethod
  };
}

export function toBookingCreateResponse(booking: BookingRecord): BookingCreateResponse {
  return {
    bookingId: booking.id,
    status: booking.status,
    message: BOOKING_CREATE_RESPONSE_MESSAGE
  };
}
