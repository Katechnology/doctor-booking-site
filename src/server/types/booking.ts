export const bookingStatuses = ["received", "contact_pending", "confirmed", "cancelled"] as const;
export type BookingStatus = (typeof bookingStatuses)[number];

export const bookingContactMethods = ["phone", "email"] as const;
export type BookingContactMethod = (typeof bookingContactMethods)[number];

export const bookingTimeWindows = ["morning", "afternoon", "late-afternoon"] as const;
export type BookingTimeWindow = (typeof bookingTimeWindows)[number];

export const bookingAgeRanges = ["40-44", "45-54", "55-64", "65+"] as const;
export type BookingAgeRange = (typeof bookingAgeRanges)[number];

export type BookingId = string;

export type BookingCreateInput = {
  fullName: string;
  ageRange: string;
  phone: string;
  email: string;
  preferredContactMethod: BookingContactMethod;
  preferredDate: string;
  preferredTimeWindow: string;
  reasonForVisit: string;
  existingConditions?: string;
  preferredDoctorNote?: string;
  consentAccepted: boolean;
};

export type BookingRecord = {
  id: BookingId;
  createdAt: string;
  updatedAt: string;
  status: BookingStatus;
} & BookingCreateInput;

export type BookingDetails = {
  bookingId: string;
  status: BookingStatus;
  fullName: string;
  preferredDate: string;
  preferredTimeWindow: string;
  preferredContactMethod: BookingContactMethod;
};

export type BookingCreateResponse = {
  bookingId: string;
  status: BookingStatus;
  message: string;
};

export type BookingStoreDocument = {
  version: 1;
  bookings: BookingRecord[];
  lastUpdatedAt: string | null;
};
