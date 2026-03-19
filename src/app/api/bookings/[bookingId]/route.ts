import { bookingService } from "@/server/http/bookings";
import { badRequestResponse, jsonResponse, notFoundResponse } from "@/server/http/response";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    bookingId?: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { bookingId } = await context.params;
  const normalizedBookingId = bookingId?.trim();

  if (!normalizedBookingId) {
    return badRequestResponse("A booking reference is required.");
  }

  const booking = await bookingService.getBookingById(normalizedBookingId);
  if (!booking) {
    return notFoundResponse();
  }

  return jsonResponse(booking);
}
