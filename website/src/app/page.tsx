import SearchForm from "@/components/SearchForm";

export default function HomePage() {
  return (
    <>
      <div className="space-y-12">

        {/* HERO SECTION */}
        <section className="relative h-[520px] w-full overflow-hidden rounded-3xl shadow-2xl">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1800&q=80"
            alt="Family travel at airport"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/75 via-slate-900/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* HERO CONTENT */}
          <div className="relative z-10 flex h-full items-center px-2 sm:px-0">
            <div className="w-full max-w-none">
              <div className="max-w-3xl pl-4 sm:pl-8 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md border border-white/20">
                  ✈️ Trusted by thousands of travelers
                </div>

                <h1 className="mt-6 text-5xl sm:text-6xl font-bold leading-tight">
                  Find your next adventure
                </h1>

                <p className="mt-5 text-lg sm:text-xl text-white/90 leading-relaxed">
                  Discover flights, hotels, resorts and unforgettable experiences around the world, all in one place.
                </p>
              </div>

              {/* SEARCH CARD */}
              <div className="relative z-10 mt-10 w-full">
                <div className="rounded-3xl bg-white/95 p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:bg-slate-900/90">

                  {/* CATEGORY TABS */}
                  <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 dark:border-slate-700 pb-3 mb-4 text-sm">
                    {/* Flights */}
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-slate-900 dark:text-white dark:bg-sky-900/40">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 16l2 1 7-4 3 7 2-1-2-8 8-2-1-2-7 1-4-6-2 1 2 7-6 3z" />
                      </svg>
                      Flights
                    </button>

                    {/* Hotels */}
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 10l8-6 8 6v10H4V10z" />
                      </svg>
                      Hotels
                    </button>

                    {/* Car rental */}
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 14l1.5-5h13L20 14h1v5h-3a2 2 0 11-4 0H10a2 2 0 11-4 0H3v-5h1z" />
                      </svg>
                      Car rental
                    </button>

                    {/* Airport taxis */}
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 10l1.5-4h11L19 10h2v8h-3a2 2 0 11-4 0H10a2 2 0 11-4 0H3v-8h2z" />
                      </svg>
                      Airport taxis
                    </button>

                    {/* Cruise */}
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17l9 4 9-4-2-7H5l-2 7zM8 8h8l-1.5-4h-5L8 8z" />
                      </svg>
                      Cruise
                    </button>

                    {/* Attractions */}
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3 6h6l-5 4 2 7-6-4-6 4 2-7-5-4h6l3-6z" />
                      </svg>
                      Attractions
                    </button>
                  </div>

                  {/* SEARCH BAR */}
                  <div className="mt-3 grid gap-6 grid-cols-[1.6fr_1.2fr_1.2fr_180px] items-stretch">
                    {/* WHERE */}
                    <div className="flex min-w-0 items-center gap-3 bg-white border border-slate-300 rounded-xl px-5 py-4">
                      <svg
                        className="h-6 w-6 text-slate-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 10h18M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3M5 10v7h14v-7" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Where are you going?"
                        className="w-full min-w-0 bg-transparent outline-none text-slate-900 dark:text-white text-base font-medium placeholder-slate-500 dark:placeholder-slate-400"
                      />
                    </div>

                    {/* DATE */}
                    <div className="flex min-w-0 items-center gap-3 bg-white border border-slate-300 rounded-xl px-5 py-4">
                      <svg
                        className="h-6 w-6 text-slate-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 8h18M8 3v4M16 3v4M5 12h14v8H5z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Check-in — Check-out"
                        className="w-full min-w-0 bg-transparent outline-none text-slate-900 dark:text-white text-base font-medium placeholder-slate-500 dark:placeholder-slate-400"
                      />
                    </div>

                    {/* GUESTS */}
                    <div className="flex min-w-0 items-center gap-3 bg-white border border-slate-300 rounded-xl px-5 py-4">
                      <svg
                        className="h-6 w-6 text-slate-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="7" r="4" />
                        <path d="M5.5 21a6.5 6.5 0 0113 0" />
                      </svg>
                      <input
                        type="text"
                        placeholder="2 adults · 0 children · 1 room"
                        className="w-full min-w-0 bg-transparent outline-none text-slate-900 dark:text-white text-base font-medium placeholder-slate-500 dark:placeholder-slate-400"
                      />
                    </div>

                    {/* SEARCH BUTTON */}
                    <button className="h-[56px] sm:h-auto w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl px-8 text-base sm:text-lg sm:ml-0">
                      Search
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Browse by Property Type */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">
              Discover places to stay
            </h2>
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
              →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                label: "Hotels",
                img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
              },
              {
                label: "Apartments",
                img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
              },
              {
                label: "Resorts",
                img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
              },
              {
                label: "Villas",
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
              },
            ].map((item) => (
              <div key={item.label} className="group cursor-pointer">
                <div className="relative h-56 overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                  {item.label}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section>
          <h2 className="text-2xl font-bold mb-5git status
">
            Popular Destinations
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { city: "Paris", img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80" },
              { city: "New York", img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=80" },
              { city: "Tokyo", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80" },
              { city: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80" },
              { city: "Cape Town (Safari)", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80" },
              { city: "Bangkok", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80" },
              { city: "Philippines", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
              { city: "London", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80" },
              { city: "Rome", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80" },
              { city: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80" },
              { city: "Santorini", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80" },
              { city: "Maldives", img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80" },
            ].map((d) => (
              <div key={d.city} className="group relative h-56 overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                <img
                  src={d.img}
                  alt={d.city}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t 
                             from-black/60 via-black/20 to-transparent 
                             dark:from-black/75 dark:via-black/40"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-slate-900 dark:text-white text-lg font-semibold">
                    {d.city}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY TRAVELERS CHOOSE US */}
        <section className="space-y-6 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Why travelers love us
            </h2>

            <p className="mt-2 font-bold text-slate-900 text-xl">
              Everything you need for smooth and stress-free travel planning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Reserve now, pay later",
                desc: "Flexible booking options on thousands of stays worldwide.",
                icon: (
                  <svg
                    className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                ),
              },
              {
                title: "Millions of trusted reviews",
                desc: "Real experiences and honest ratings from global travelers.",
                icon: (
                  <svg
                    className="h-8 w-8 text-amber-500 dark:text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
                  </svg>
                ),
              },
              {
                title: "Worldwide destinations",
                desc: "Hotels, villas, apartments, resorts, and unique stays.",
                icon: (
                  <svg
                    className="h-8 w-8 text-sky-600 dark:text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
                  </svg>
                ),
              },
              {
                title: "24/7 travel assistance",
                desc: "Our support team is ready anytime you need help.",
                icon: (
                  <svg
                    className="h-8 w-8 text-violet-600 dark:text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 10a6 6 0 10-12 0v4a6 6 0 0012 0v-4z" />
                    <path d="M6 14l-2 2m14-2l2 2" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="mb-4">{item.icon}</div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TRAVEL DEALS */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Text Block */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700">
                <svg
                  className="h-5 w-5 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 12l18-9-9 18-2-8z" />
                </svg>
                Limited-time travel offers
              </div>

              <h2 className="mt-5 text-4xl font-bold text-slate-900 leading-tight">
                Discover more. Spend less.
              </h2>

              <p className="mt-4 text-lg text-slate-700 leading-relaxed">
                Unlock exclusive discounts on hotels, resorts, and vacation stays across the globe.
              </p>

              <button className="mt-7 rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-sky-700">
                Explore Deals
              </button>
            </div>

            {/* Right Image Block */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-sky-200/30 blur-2xl" />

              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
                alt="Beach vacation"
                className="relative h-64 w-full rounded-3xl object-cover shadow-xl border border-slate-200"
              />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
