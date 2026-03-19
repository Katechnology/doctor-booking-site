import { NextResponse } from "next/server";
import type { BookingFieldErrors } from "@/server/validation/bookings";

export function jsonResponse<T>(body: T, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

export function validationErrorResponse(message: string, fieldErrors: BookingFieldErrors) {
  return jsonResponse(
    {
      error: "VALIDATION_ERROR",
      message,
      fieldErrors
    },
    { status: 400 }
  );
}

export function notFoundResponse(message = "Booking request not found.") {
  return jsonResponse(
    {
      error: "NOT_FOUND",
      message
    },
    { status: 404 }
  );
}

export function badRequestResponse(message = "Unable to process the request.") {
  return jsonResponse(
    {
      error: "BAD_REQUEST",
      message
    },
    { status: 400 }
  );
}

