import type { FlightResult } from "@/lib/api";

export default function FlightCard({ flight }: { flight: FlightResult }) {
  return (
    <article className="card p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {flight.origin} → {flight.destination}
          </p>
          <p className="mt-1 text-xs text-muted">{flight.date}</p>
          <p className="mt-3 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-200">
            {flight.flightId}
          </p>
        </div>
        <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
          ${flight.price}
        </p>
      </div>
    </article>
  );
}
