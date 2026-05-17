import {
  mockAirportTaxis,
  mockAttractions,
  mockCarRentals,
  mockCruises,
  searchFlights,
  searchHotels,
  type TravelSearchType,
} from "@/lib/api";
import FlightCard from "@/components/FlightCard";
import HotelCard from "@/components/HotelCard";
import TravelResultCard from "@/components/TravelResultCard";
import type { ReactNode } from "react";

type SearchParams = {
  type?: string;
  origin?: string;
  destination?: string;
  date?: string;
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  pickupLocation?: string;
  pickupDate?: string;
  returnDate?: string;
  pickup?: string;
  dropoff?: string;
  pickupTime?: string;
  departurePort?: string;
  departureDate?: string;
};

function normalizeType(type?: string): TravelSearchType {
  const aliases: Record<string, TravelSearchType> = {
    flight: "flights",
    hotel: "hotels",
    car: "cars",
    "car-rental": "cars",
    "car rental": "cars",
    taxi: "taxis",
    "airport-taxis": "taxis",
    "airport taxis": "taxis",
    cruise: "cruises",
    attraction: "attractions",
  };
  const normalizedType = (type || "").toLowerCase();
  const supportedTypes: TravelSearchType[] = [
    "flights",
    "hotels",
    "cars",
    "taxis",
    "cruises",
    "attractions",
  ];

  return supportedTypes.includes(normalizedType as TravelSearchType)
    ? (normalizedType as TravelSearchType)
    : aliases[normalizedType]
      ? aliases[normalizedType]
    : "flights";
}

function titleForType(type: TravelSearchType) {
  return {
    flights: "Flight results",
    hotels: "Hotel results",
    cars: "Car rental results",
    taxis: "Airport taxi results",
    cruises: "Cruise results",
    attractions: "Attraction results",
  }[type];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const type = normalizeType(params.type);

  if (type === "flights") {
    const origin = (params.origin || "").toUpperCase();
    const destination = (params.destination || "").toUpperCase();
    const date = params.date || "";

    if (!origin || !destination || !date) {
      const flights = await searchFlights({
        origin: origin || "LON",
        destination: destination || "NYC",
        date: date || "2026-06-01",
      });

      return (
        <div className="space-y-8">
          <ResultsHeader
            title="LON to NYC"
            label={titleForType(type)}
            description="Showing mock flight results because search parameters were incomplete."
          />
          <ResultSection title="Flights" count={flights.results.length}>
            {flights.results.map((flight) => (
              <FlightCard key={flight.flightId} flight={flight} />
            ))}
          </ResultSection>
        </div>
      );
    }

    const flights = await searchFlights({ origin, destination, date });

    return (
      <div className="space-y-8">
        <ResultsHeader
          title={`${origin} to ${destination}`}
          label={titleForType(type)}
          description={`Showing available flights for ${date}.`}
        />
        <ResultSection title="Flights" count={flights.results.length}>
          {flights.results.map((flight) => (
            <FlightCard key={flight.flightId} flight={flight} />
          ))}
        </ResultSection>
      </div>
    );
  }

  if (type === "hotels") {
    const city = params.city || "";
    const checkIn = params.checkIn || "";
    const checkOut = params.checkOut || checkIn;

    if (!city || !checkIn || !checkOut) {
      const hotels = await searchHotels({
        city: city || "Paris",
        checkIn: checkIn || "2026-06-01",
        checkOut: checkOut || "2026-06-05",
      });

      return (
        <div className="space-y-8">
          <ResultsHeader
            title={city || "Paris"}
            label={titleForType(type)}
            description="Showing mock hotel results because search parameters were incomplete."
          />
          <ResultSection title="Hotels" count={hotels.results.length}>
            {hotels.results.map((hotel) => (
              <HotelCard key={hotel.hotelId} hotel={hotel} />
            ))}
          </ResultSection>
        </div>
      );
    }

    const hotels = await searchHotels({ city, checkIn, checkOut });

    return (
      <div className="space-y-8">
        <ResultsHeader
          title={city}
          label={titleForType(type)}
          description={`Showing stays from ${checkIn} to ${checkOut}.`}
        />
        <ResultSection title="Hotels" count={hotels.results.length}>
          {hotels.results.map((hotel) => (
            <HotelCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </ResultSection>
      </div>
    );
  }

  if (type === "cars") {
    const pickupLocation = params.pickupLocation || "Airport terminal";
    const pickupDate = params.pickupDate || "Flexible pickup";
    const returnDate = params.returnDate || "Flexible return";
    const cars = mockCarRentals({ pickupLocation, pickupDate, returnDate });

    return (
      <div className="space-y-8">
        <ResultsHeader
          title={pickupLocation}
          label={titleForType(type)}
          description={`Mock rental availability from ${pickupDate} to ${returnDate}.`}
        />
        <ResultSection title="Car rentals" count={cars.results.length}>
          {cars.results.map((car) => (
            <TravelResultCard
              key={car.carId}
              eyebrow={car.carId}
              title={`${car.company} ${car.vehicle}`}
              description={`${car.pickupLocation} pickup`}
              meta={`${car.pickupDate} to ${car.returnDate}`}
              price={`$${car.pricePerDay}/day`}
            />
          ))}
        </ResultSection>
      </div>
    );
  }

  if (type === "taxis") {
    const pickup = params.pickup || "Airport";
    const dropoff = params.dropoff || "City center";
    const pickupTime = params.pickupTime || "Flexible time";
    const taxis = mockAirportTaxis({ pickup, dropoff, pickupTime });

    return (
      <div className="space-y-8">
        <ResultsHeader
          title={`${pickup} to ${dropoff}`}
          label={titleForType(type)}
          description={`Mock transfer options for ${pickupTime}.`}
        />
        <ResultSection title="Airport taxis" count={taxis.results.length}>
          {taxis.results.map((taxi) => (
            <TravelResultCard
              key={taxi.taxiId}
              eyebrow={taxi.taxiId}
              title={`${taxi.provider} ${taxi.vehicle}`}
              description={`${taxi.pickup} to ${taxi.dropoff}`}
              meta={taxi.pickupTime}
              price={`$${taxi.price}`}
            />
          ))}
        </ResultSection>
      </div>
    );
  }

  if (type === "cruises") {
    const departurePort = params.departurePort || "Barcelona";
    const destination = params.destination || "Mediterranean";
    const departureDate = params.departureDate || "Flexible date";
    const cruises = mockCruises({
      departurePort,
      destination,
      departureDate,
    });

    return (
      <div className="space-y-8">
        <ResultsHeader
          title={`${departurePort} to ${destination}`}
          label={titleForType(type)}
          description={`Mock sailings from ${departureDate}.`}
        />
        <ResultSection title="Cruises" count={cruises.results.length}>
          {cruises.results.map((cruise) => (
            <TravelResultCard
              key={cruise.cruiseId}
              eyebrow={cruise.cruiseId}
              title={cruise.ship}
              description={`${cruise.departurePort} to ${cruise.destination}`}
              meta={`${cruise.departureDate} · ${cruise.nights} nights`}
              price={`$${cruise.price}`}
            />
          ))}
        </ResultSection>
      </div>
    );
  }

  const city = params.city || params.destination || "Selected destination";
  const date = params.date || "Flexible date";
  const guests = params.guests || "2 guests";
  const attractions = mockAttractions({ city, date, guests });

  return (
    <div className="space-y-8">
      <ResultsHeader
        title={city}
        label={titleForType(type)}
        description={`Mock attraction availability for ${date}.`}
      />
      <ResultSection title="Attractions" count={attractions.results.length}>
        {attractions.results.map((attraction) => (
          <TravelResultCard
            key={attraction.attractionId}
            eyebrow={attraction.attractionId}
            title={attraction.name}
            description={`${attraction.city} · ${attraction.category}`}
            meta={`${attraction.date} · ${attraction.guests}`}
            price={`$${attraction.price}`}
          />
        ))}
      </ResultSection>
    </div>
  );
}

function ResultsHeader({
  title,
  label,
  description,
}: {
  title: string;
  label: string;
  description: string;
}) {
  return (
    <header className="card p-6">
      <p className="text-sm font-semibold uppercase text-blue-700 dark:text-blue-300">
        {label}
      </p>
      <h1 className="mt-2 text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </header>
  );
}

function ResultSection({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <span className="text-sm text-muted">{count} options</span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}
