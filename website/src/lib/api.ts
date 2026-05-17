const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type TravelSearchType =
  | "flights"
  | "hotels"
  | "cars"
  | "taxis"
  | "cruises"
  | "attractions";

export type FlightResult = {
  flightId: string;
  origin: string;
  destination: string;
  date: string;
  price: number;
};

export type HotelResult = {
  hotelId: string;
  city: string;
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
};

export type CarRentalResult = {
  carId: string;
  company: string;
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  vehicle: string;
  pricePerDay: number;
};

export type AirportTaxiResult = {
  taxiId: string;
  provider: string;
  pickup: string;
  dropoff: string;
  pickupTime: string;
  vehicle: string;
  price: number;
};

export type CruiseResult = {
  cruiseId: string;
  ship: string;
  departurePort: string;
  destination: string;
  departureDate: string;
  nights: number;
  price: number;
};

export type AttractionResult = {
  attractionId: string;
  name: string;
  city: string;
  date: string;
  guests: string;
  category: string;
  price: number;
};

type FlightResponse = {
  results: FlightResult[];
};

type HotelResponse = {
  results: HotelResult[];
};

type CarRentalResponse = {
  results: CarRentalResult[];
};

type AirportTaxiResponse = {
  results: AirportTaxiResult[];
};

type CruiseResponse = {
  results: CruiseResult[];
};

type AttractionResponse = {
  results: AttractionResult[];
};

const mockFlights = (params: {
  origin: string;
  destination: string;
  date: string;
}): FlightResponse => ({
  results: [
    {
      flightId: "FL123",
      origin: params.origin,
      destination: params.destination,
      date: params.date,
      price: 250,
    },
    {
      flightId: "FL456",
      origin: params.origin,
      destination: params.destination,
      date: params.date,
      price: 310,
    },
  ],
});

const mockHotels = (params: {
  city: string;
  checkIn: string;
  checkOut: string;
}): HotelResponse => ({
  results: [
    {
      hotelId: "HTL001",
      city: params.city,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      pricePerNight: 120,
    },
    {
      hotelId: "HTL002",
      city: params.city,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      pricePerNight: 180,
    },
  ],
});

export const mockCarRentals = (params: {
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
}): CarRentalResponse => ({
  results: [
    {
      carId: "CAR-204",
      company: "AeroDrive",
      pickupLocation: params.pickupLocation,
      pickupDate: params.pickupDate,
      returnDate: params.returnDate,
      vehicle: "Compact SUV",
      pricePerDay: 48,
    },
    {
      carId: "CAR-819",
      company: "CityWheel",
      pickupLocation: params.pickupLocation,
      pickupDate: params.pickupDate,
      returnDate: params.returnDate,
      vehicle: "Electric sedan",
      pricePerDay: 62,
    },
  ],
});

export const mockAirportTaxis = (params: {
  pickup: string;
  dropoff: string;
  pickupTime: string;
}): AirportTaxiResponse => ({
  results: [
    {
      taxiId: "TAXI-118",
      provider: "SkyCab Express",
      pickup: params.pickup,
      dropoff: params.dropoff,
      pickupTime: params.pickupTime,
      vehicle: "Executive saloon",
      price: 39,
    },
    {
      taxiId: "TAXI-276",
      provider: "Airport Shuttle Co.",
      pickup: params.pickup,
      dropoff: params.dropoff,
      pickupTime: params.pickupTime,
      vehicle: "Shared van",
      price: 24,
    },
  ],
});

export const mockCruises = (params: {
  departurePort: string;
  destination: string;
  departureDate: string;
}): CruiseResponse => ({
  results: [
    {
      cruiseId: "CRS-502",
      ship: "Azure Horizon",
      departurePort: params.departurePort,
      destination: params.destination,
      departureDate: params.departureDate,
      nights: 7,
      price: 899,
    },
    {
      cruiseId: "CRS-744",
      ship: "Nordic Star",
      departurePort: params.departurePort,
      destination: params.destination,
      departureDate: params.departureDate,
      nights: 10,
      price: 1240,
    },
  ],
});

export const mockAttractions = (params: {
  city: string;
  date: string;
  guests: string;
}): AttractionResponse => ({
  results: [
    {
      attractionId: "ATT-310",
      name: "City highlights walking tour",
      city: params.city,
      date: params.date,
      guests: params.guests,
      category: "Guided tour",
      price: 35,
    },
    {
      attractionId: "ATT-592",
      name: "Skip-the-line museum pass",
      city: params.city,
      date: params.date,
      guests: params.guests,
      category: "Culture",
      price: 29,
    },
  ],
});

export async function searchFlights(params: {
  origin: string;
  destination: string;
  date: string;
}): Promise<FlightResponse> {
  try {
    const searchParams = new URLSearchParams({
      type: "flight",
      origin: params.origin,
      destination: params.destination,
      date: params.date,
    });
    const res = await fetch(`${API_BASE}/search?${searchParams.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return mockFlights(params);
    }

    const data = await res.json();
    return data?.results?.length ? data : mockFlights(params);
  } catch {
    return mockFlights(params);
  }
}

export async function searchHotels(params: {
  city: string;
  checkIn: string;
  checkOut: string;
}): Promise<HotelResponse> {
  try {
    const searchParams = new URLSearchParams({
      type: "hotel",
      city: params.city,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
    });
    const res = await fetch(`${API_BASE}/search?${searchParams.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return mockHotels(params);
    }

    const data = await res.json();
    return data?.results?.length ? data : mockHotels(params);
  } catch {
    return mockHotels(params);
  }
}
