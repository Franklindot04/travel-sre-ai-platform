import type { HotelResult } from "@/lib/api";

export default function HotelCard({ hotel }: { hotel: HotelResult }) {
  return (
    <article className="card p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm font-semibold text-foreground">{hotel.city}</p>
      <p className="mt-1 text-xs text-muted">
        {hotel.checkIn} → {hotel.checkOut}
      </p>
      <p className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
        {hotel.hotelId}
      </p>
      <p className="mt-3 text-lg font-bold text-blue-700 dark:text-blue-300">
        ${hotel.pricePerNight}/night
      </p>
    </article>
  );
}
