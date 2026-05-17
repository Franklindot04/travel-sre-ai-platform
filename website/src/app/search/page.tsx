import { searchFlights, searchHotels } from "@/lib/api";
import FlightCard from "@/components/FlightCard";
import HotelCard from "@/components/HotelCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ origin?: string; destination?: string; date?: string }>;
}) {
  const params = await searchParams;

  const rawOrigin = params.origin || "";
  const rawDestination = params.destination || "";
  const rawDate = params.date || "";

  const origin = rawOrigin.toUpperCase();
  const destination = rawDestination.toUpperCase();

  const date = rawDate.includes(".")
    ? rawDate.split(".").reverse().join("-")
    : rawDate;

  if (!origin || !destination || !date) {
    return (
      <div className="card p-6">
        <h1 className="text-xl font-semibold text-red-700 dark:text-red-300">
          Missing search parameters
        </h1>
        <p className="mt-2 text-muted">
          Please go back and enter origin, destination, and date.
        </p>
      </div>
    );
  }

  const flights = await searchFlights({ origin, destination, date });
  const hotels = await searchHotels({
    city: destination,
    checkIn: date,
    checkOut: date,
  });

  return (
    <div className="space-y-8">
      <header className="card p-6">
        <p className="text-sm font-semibold uppercase text-blue-700 dark:text-blue-300">
          Search Results
        </p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">
          {origin} to {destination}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Showing available flights and hotels for {date}.
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Flights</h2>
          <span className="text-sm text-muted">
            {flights.results?.length || 0} options
          </span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {flights.results?.map((f) => (
            <FlightCard key={f.flightId} flight={f} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Hotels</h2>
          <span className="text-sm text-muted">
            {hotels.results?.length || 0} options
          </span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {hotels.results?.map((h) => (
            <HotelCard key={h.hotelId} hotel={h} />
          ))}
        </div>
      </section>
    </div>
  );
}
