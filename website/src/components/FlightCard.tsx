export default function FlightCard({ flight }: { flight: any }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            {flight.origin} → {flight.destination}
          </p>
          <p className="text-xs text-slate-500">{flight.date}</p>
        </div>
        <p className="text-lg font-bold text-blue-600">${flight.price}</p>
      </div>
    </div>
  );
}
