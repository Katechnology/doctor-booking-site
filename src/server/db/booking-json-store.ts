import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { isBookingStatus, normalizeBookingInput } from "@/server/domain";
import type { BookingRecord, BookingStoreDocument } from "@/server/types";

export const DEFAULT_BOOKING_STORE_PATH = join(process.cwd(), "src", "data", "bookings.json");

const EMPTY_STORE: BookingStoreDocument = {
  version: 1,
  bookings: [],
  lastUpdatedAt: null
};

let storeLock = Promise.resolve();

function withStoreLock<T>(operation: () => Promise<T>): Promise<T> {
  const next = storeLock.then(operation, operation);
  storeLock = next.then(
    () => undefined,
    () => undefined
  );
  return next;
}

async function ensureStoreFile(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });

  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, `${JSON.stringify(EMPTY_STORE, null, 2)}\n`, "utf8");
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBookingRecord(value: unknown): value is BookingRecord {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string" &&
    typeof value.fullName === "string" &&
    typeof value.ageRange === "string" &&
    typeof value.phone === "string" &&
    typeof value.email === "string" &&
    typeof value.preferredContactMethod === "string" &&
    typeof value.preferredDate === "string" &&
    typeof value.preferredTimeWindow === "string" &&
    typeof value.reasonForVisit === "string" &&
    typeof value.consentAccepted === "boolean" &&
    typeof value.status === "string" &&
    isBookingStatus(value.status)
  );
}

function normalizeBookings(bookings: unknown): BookingRecord[] {
  if (!Array.isArray(bookings)) {
    return [];
  }

  return bookings.filter(isBookingRecord).map((booking) => ({
    ...booking,
    ...normalizeBookingInput(booking)
  }));
}

function parseStoreDocument(raw: string): BookingStoreDocument {
  if (!raw.trim()) {
    return EMPTY_STORE;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<BookingStoreDocument> & { bookings?: unknown };
    return {
      version: 1,
      bookings: normalizeBookings(parsed.bookings),
      lastUpdatedAt: typeof parsed.lastUpdatedAt === "string" ? parsed.lastUpdatedAt : null
    };
  } catch {
    return EMPTY_STORE;
  }
}

async function readStoreDocument(filePath: string): Promise<BookingStoreDocument> {
  await ensureStoreFile(filePath);
  const raw = await readFile(filePath, "utf8");
  return parseStoreDocument(raw);
}

async function persistStoreDocument(filePath: string, document: BookingStoreDocument): Promise<void> {
  await ensureStoreFile(filePath);

  const temporaryPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  const payload: BookingStoreDocument = {
    version: 1,
    bookings: document.bookings,
    lastUpdatedAt: document.lastUpdatedAt
  };

  await writeFile(temporaryPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  await rename(temporaryPath, filePath);
}

export async function readBookingStore(filePath: string = DEFAULT_BOOKING_STORE_PATH): Promise<BookingStoreDocument> {
  return readStoreDocument(filePath);
}

export async function writeBookingStore(
  document: BookingStoreDocument,
  filePath: string = DEFAULT_BOOKING_STORE_PATH
): Promise<BookingStoreDocument> {
  return withStoreLock(async () => {
    const nextDocument: BookingStoreDocument = {
      version: 1,
      bookings: document.bookings,
      lastUpdatedAt: document.lastUpdatedAt ?? new Date().toISOString()
    };

    await persistStoreDocument(filePath, nextDocument);
    return nextDocument;
  });
}

export async function appendBookingToStore(
  booking: BookingRecord,
  filePath: string = DEFAULT_BOOKING_STORE_PATH
): Promise<BookingStoreDocument> {
  return withStoreLock(async () => {
    const current = await readStoreDocument(filePath);
    const nextDocument: BookingStoreDocument = {
      version: 1,
      bookings: [...current.bookings, booking],
      lastUpdatedAt: booking.updatedAt
    };

    await persistStoreDocument(filePath, nextDocument);
    return nextDocument;
  });
}

export async function replaceBookingStore(
  bookings: BookingRecord[],
  filePath: string = DEFAULT_BOOKING_STORE_PATH
): Promise<BookingStoreDocument> {
  return withStoreLock(async () => {
    const nextDocument: BookingStoreDocument = {
      version: 1,
      bookings: [...bookings],
      lastUpdatedAt: new Date().toISOString()
    };

    await persistStoreDocument(filePath, nextDocument);
    return nextDocument;
  });
}

export async function findBookingInStore(
  bookingId: string,
  filePath: string = DEFAULT_BOOKING_STORE_PATH
): Promise<BookingRecord | null> {
  const store = await readStoreDocument(filePath);
  return store.bookings.find((booking) => booking.id === bookingId) ?? null;
}

export async function countBookingsInStore(filePath: string = DEFAULT_BOOKING_STORE_PATH): Promise<number> {
  const store = await readStoreDocument(filePath);
  return store.bookings.length;
}
