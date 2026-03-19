import { createBookingRecord, toBookingCreateResponse, toBookingDetails } from "@/server/domain";
import {
  DEFAULT_BOOKING_STORE_PATH,
  appendBookingToStore,
  findBookingInStore,
  readBookingStore,
  replaceBookingStore
} from "@/server/db";
import type { BookingCreateInput, BookingRecord } from "@/server/types";

export type BookingRepositoryOptions = {
  storagePath?: string;
};

export type BookingRepository = {
  create(input: BookingCreateInput): Promise<BookingRecord>;
  findById(bookingId: string): Promise<BookingRecord | null>;
  list(): Promise<BookingRecord[]>;
  replaceAll(bookings: BookingRecord[]): Promise<void>;
};

function resolveStoragePath(options?: BookingRepositoryOptions): string {
  return options?.storagePath ?? DEFAULT_BOOKING_STORE_PATH;
}

export function createBookingRepository(options?: BookingRepositoryOptions): BookingRepository {
  const storagePath = resolveStoragePath(options);

  return {
    async create(input: BookingCreateInput): Promise<BookingRecord> {
      const booking = createBookingRecord(input);
      await appendBookingToStore(booking, storagePath);
      return booking;
    },

    async findById(bookingId: string): Promise<BookingRecord | null> {
      return findBookingInStore(bookingId, storagePath);
    },

    async list(): Promise<BookingRecord[]> {
      const store = await readBookingStore(storagePath);
      return [...store.bookings];
    },

    async replaceAll(bookings: BookingRecord[]): Promise<void> {
      await replaceBookingStore(bookings, storagePath);
    }
  };
}

export function toBookingApiResponse(booking: BookingRecord): ReturnType<typeof toBookingCreateResponse> {
  return toBookingCreateResponse(booking);
}

export function toBookingConfirmationDetails(booking: BookingRecord): ReturnType<typeof toBookingDetails> {
  return toBookingDetails(booking);
}

export const bookingRepository = createBookingRepository();
