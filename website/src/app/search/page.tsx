import { searchFlights, searchHotels } from "@/lib/api";
import FlightCard from "@/components/FlightCard";
import HotelCard from "@/components/HotelCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ origin?: string; destination?: string; date?: string }>;
}) {
  // FIX: you MUST await searchParams
  const params = await searchParams;

  const rawOrigin = params.origin || "";
  const rawDestination = params.destination || "";
  const rawDate = params.date || "";

  // Normalize
  const origin = rawOrigin.toUpperCase();
  const destination = rawDestination.toUpperCase();

  // Convert DD.MM.YYYY → YYYY-MM-DD
  const date = rawDate.includes(".")
    ? rawDate.split(".").reverse().join("-")
    : rawDate;

  if (!origin || !destination || !date) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-600">
          Missing search parameters
        </h1>
        <p className="text-slate-600 mt-2">
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
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold text-slate-800">Search Results</h1>

      <section>
        <h2 className="text-lg font-semibold text-slate-700">Flights</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {flights.results?.map((f: any) => (
            <FlightCard key={f.flightId} flight={f} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-700">Hotels</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {hotels.results?.map((h: any) => (
            <HotelCard key={h.hotelId} hotel={h} />
          ))}
        </div>
      </section>
    </div>
  );
}
