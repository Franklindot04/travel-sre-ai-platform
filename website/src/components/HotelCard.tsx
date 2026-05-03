export default function HotelCard({ hotel }: { hotel: any }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-800">{hotel.city}</p>
      <p className="text-xs text-slate-500">
        {hotel.checkIn} → {hotel.checkOut}
      </p>
      <p className="mt-2 text-lg font-bold text-blue-600">
        ${hotel.pricePerNight}/night
      </p>
    </div>
  );
}
