import { ConfirmationCard } from "@/components/booking/ConfirmationCard";

export default async function ConfirmationPage({
  searchParams
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const params = await searchParams;
  const bookingId = params.bookingId?.trim();
  return <ConfirmationCard bookingId={bookingId} />;
}
