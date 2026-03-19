import { bookingService } from "@/server/http/bookings";
import { badRequestResponse, jsonResponse, validationErrorResponse } from "@/server/http/response";
import { validateBookingPayload } from "@/server/validation/bookings";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return badRequestResponse("Request body must be valid JSON.");
  }

  const validation = validateBookingPayload(payload);
  if (!validation.ok) {
    return validationErrorResponse(validation.message, validation.fieldErrors);
  }

  const booking = await bookingService.createBooking(validation.data);

  return jsonResponse({
    bookingId: booking.bookingId,
    status: booking.status,
    message: booking.message
  });
}
