import type { BookingCreateInput } from "@/server/types";
import {
  bookingRepository,
  toBookingApiResponse,
  toBookingConfirmationDetails
} from "@/server/repositories";

export const bookingService = {
  async createBooking(input: BookingCreateInput) {
    const booking = await bookingRepository.create(input);
    return toBookingApiResponse(booking);
  },

  async getBookingById(bookingId: string) {
    const booking = await bookingRepository.findById(bookingId);
    return booking ? toBookingConfirmationDetails(booking) : null;
  }
};
