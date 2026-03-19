export type BookingPayload = {
  fullName: string;
  ageRange: string;
  phone: string;
  email: string;
  preferredContactMethod: "phone" | "email";
  preferredDate: string;
  preferredTimeWindow: string;
  reasonForVisit: string;
  existingConditions?: string;
  preferredDoctorNote?: string;
  consentAccepted: boolean;
};

export type BookingResponse = {
  bookingId: string;
  status: string;
  message: string;
};

export type BookingDetails = {
  bookingId: string;
  status: string;
  fullName: string;
  preferredDate: string;
  preferredTimeWindow: string;
  preferredContactMethod: string;
};

export type ApiErrorShape = {
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string>;
};

export class ApiClientError extends Error {
  fieldErrors?: Record<string, string>;

  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = "ApiClientError";
    this.fieldErrors = fieldErrors;
  }
}

async function readError(response: Response) {
  try {
    const payload = (await response.json()) as ApiErrorShape;
    return new ApiClientError(payload.message ?? "Something went wrong.", payload.fieldErrors);
  } catch {
    return new ApiClientError("Something went wrong. Please try again.");
  }
}

export async function createBooking(payload: BookingPayload): Promise<BookingResponse> {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw await readError(response);
  }

  return (await response.json()) as BookingResponse;
}

export async function fetchBookingDetails(bookingId: string): Promise<BookingDetails> {
  const response = await fetch(`/api/bookings/${bookingId}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw await readError(response);
  }

  return (await response.json()) as BookingDetails;
}
