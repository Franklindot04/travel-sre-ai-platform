export default function SearchPage() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Search Results</h1>

      {/* Flights */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Flights</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card">Flight result placeholder</div>
          <div className="card">Flight result placeholder</div>
        </div>
      </section>

      {/* Hotels */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Hotels</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card">Hotel result placeholder</div>
          <div className="card">Hotel result placeholder</div>
        </div>
      </section>
    </div>
  );
}
