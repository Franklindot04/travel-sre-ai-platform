const bookings = [
  {
    id: "BK-48120",
    trip: "LON to NYC",
    status: "Confirmed",
    payment: "Authorized",
    inventory: "Reserved",
  },
  {
    id: "BK-39218",
    trip: "BER to LIS",
    status: "Monitoring",
    payment: "Retry queued",
    inventory: "Held",
  },
];

export default function BookingPage() {
  return (
    <div className="space-y-6">
      <header className="card p-6">
        <p className="text-sm font-semibold uppercase text-blue-700 dark:text-blue-300">
          Bookings
        </p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">
          Travel reservations
        </h1>
        <p className="mt-2 text-sm text-muted">
          Mock booking activity for the travel flow and SRE dashboard view.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {bookings.map((booking) => (
          <article key={booking.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {booking.trip}
                </p>
                <p className="mt-1 text-xs text-muted">{booking.id}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
                {booking.status}
              </span>
            </div>

            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-md bg-surface-muted p-3">
                <p className="text-xs font-semibold uppercase text-muted">
                  Payment
                </p>
                <p className="mt-1 text-foreground">{booking.payment}</p>
              </div>
              <div className="rounded-md bg-surface-muted p-3">
                <p className="text-xs font-semibold uppercase text-muted">
                  Inventory
                </p>
                <p className="mt-1 text-foreground">{booking.inventory}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
