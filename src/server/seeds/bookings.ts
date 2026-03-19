import { createBookingRecord } from "@/server/domain";
import type { BookingCreateInput, BookingRecord } from "@/server/types";
import type { BookingRepository } from "@/server/repositories";

export const demoBookingSeedInputs: BookingCreateInput[] = [
  {
    fullName: "Maya Chen",
    ageRange: "45-54",
    phone: "+1 415 555 0128",
    email: "maya.chen@example.com",
    preferredContactMethod: "phone",
    preferredDate: "2026-03-25",
    preferredTimeWindow: "morning",
    reasonForVisit: "Annual preventive health check and a review of recent fatigue.",
    existingConditions: "Mild hypertension",
    preferredDoctorNote: "Prefer a mid-morning call if possible.",
    consentAccepted: true
  },
  {
    fullName: "Daniel Brooks",
    ageRange: "55-64",
    phone: "+1 212 555 0194",
    email: "daniel.brooks@example.com",
    preferredContactMethod: "email",
    preferredDate: "2026-03-27",
    preferredTimeWindow: "afternoon",
    reasonForVisit: "Requesting a comprehensive health check before a long trip.",
    existingConditions: "",
    preferredDoctorNote: "",
    consentAccepted: true
  }
];

export async function seedDemoBookings(
  repository: Pick<BookingRepository, "list" | "replaceAll">,
  options: { force?: boolean } = {}
): Promise<BookingRecord[]> {
  const current = await repository.list();

  if (current.length > 0 && !options.force) {
    return current;
  }

  const now = Date.now();
  const seededBookings = demoBookingSeedInputs.map((input, index) =>
    createBookingRecord(input, new Date(now - (demoBookingSeedInputs.length - index) * 60 * 60 * 1000))
  );

  await repository.replaceAll(seededBookings);
  return seededBookings;
}
