const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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

type FlightResponse = {
  results: FlightResult[];
};

type HotelResponse = {
  results: HotelResult[];
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
