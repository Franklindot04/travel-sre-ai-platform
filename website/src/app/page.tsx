import SearchForm from "@/components/SearchForm";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 px-8 py-20 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Discover your next adventure.
          </h1>

          <p className="mt-4 max-w-xl text-blue-50 text-lg">
            Flights, hotels, and car rentals — all in one place.  
            Powered by your AI‑driven SRE platform for reliability and speed.
          </p>

          <ul className="mt-6 flex flex-wrap gap-3 text-sm">
            <li className="rounded-full bg-white/10 px-4 py-1 backdrop-blur">
              Realistic search experience
            </li>
            <li className="rounded-full bg-white/10 px-4 py-1 backdrop-blur">
              Booking simulation
            </li>
            <li className="rounded-full bg-white/10 px-4 py-1 backdrop-blur">
              AI‑powered reliability
            </li>
          </ul>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Search flights and hotels
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Enter your route and date to see available options.
        </p>

        <SearchForm />
      </section>
    </div>
  );
}
