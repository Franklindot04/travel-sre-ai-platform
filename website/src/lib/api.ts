const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function searchFlights(params: {
  origin: string;
  destination: string;
  date: string;
}) {
  const res = await fetch(
    `${API_BASE}/search?type=flight&origin=${params.origin}&destination=${params.destination}&date=${params.date}`,
    { cache: "no-store" }
  );
  return res.json();
}

export async function searchHotels(params: {
  city: string;
  checkIn: string;
  checkOut: string;
}) {
  const res = await fetch(
    `${API_BASE}/search?type=hotel&city=${params.city}&checkIn=${params.checkIn}&checkOut=${params.checkOut}`,
    { cache: "no-store" }
  );
  return res.json();
}
