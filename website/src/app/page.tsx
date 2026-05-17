import SearchForm from "@/components/SearchForm";

const propertyTypes = [
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
];

const destinations = [
  {
    city: "Paris",
    img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "New York",
    img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Tokyo",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Dubai",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Cape Town",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Bangkok",
    img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Philippines",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "London",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
  },
];

const reasons = [
  {
    title: "Reserve now, pay later",
    desc: "Flexible booking options on thousands of stays worldwide.",
    icon: "M2 10h20M4 6h16v12H4z",
    color: "text-emerald-600 dark:text-emerald-300",
  },
  {
    title: "Trusted reviews",
    desc: "Real experiences and honest ratings from global travelers.",
    icon: "M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z",
    color: "text-amber-500 dark:text-amber-300",
  },
  {
    title: "Worldwide destinations",
    desc: "Hotels, villas, apartments, resorts, and unique stays.",
    icon: "M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20",
    color: "text-sky-600 dark:text-sky-300",
  },
  {
    title: "24/7 travel assistance",
    desc: "Operational status and incident context are always close by.",
    icon: "M18 10a6 6 0 10-12 0v4a6 6 0 0012 0v-4zM6 14l-2 2m14-2l2 2",
    color: "text-violet-600 dark:text-violet-300",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative min-h-[560px] overflow-hidden rounded-3xl shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1800&q=80"
          alt="Travelers walking through an airport"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-950/55 to-slate-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

        <div className="relative z-10 flex min-h-[560px] flex-col justify-center px-4 py-10 sm:px-8">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
              Trusted by thousands of travelers
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-tight sm:text-6xl">
              Find your next adventure
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Discover flights, hotels, resorts, and unforgettable experiences
              around the world, backed by an SRE-aware travel platform.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-white/20 bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:bg-slate-950/90 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-sm dark:border-slate-800">
              {["Flights", "Hotels", "Car rental", "Airport taxis", "Cruise", "Attractions"].map(
                (label, index) => (
                  <button
                    key={label}
                    className={`rounded-full px-3 py-1.5 font-medium transition ${
                      index === 0
                        ? "bg-sky-100 text-slate-950 dark:bg-sky-900/60 dark:text-white"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
            <SearchForm />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Discover places to stay
          </h2>
          <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-surface shadow-sm transition hover:bg-surface-muted sm:flex">
            →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {propertyTypes.map((item) => (
            <div key={item.label} className="group cursor-pointer">
              <div className="relative h-56 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={item.img}
                  alt={item.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/5" />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {item.label}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-bold text-foreground">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.city}
              className="group relative h-56 cursor-pointer overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={destination.img}
                alt={destination.city}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white">
                  {destination.city}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card space-y-6 rounded-3xl p-6 sm:p-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Why travelers love us
          </h2>
          <p className="mt-2 text-xl font-semibold text-muted">
            Everything you need for smooth, stress-free travel planning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-border bg-surface-muted p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg
                className={`mb-4 h-8 w-8 ${item.color}`}
                fill={item.title === "Trusted reviews" ? "currentColor" : "none"}
                stroke={item.title === "Trusted reviews" ? "none" : "currentColor"}
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d={item.icon} />
              </svg>
              <h3 className="text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="card overflow-hidden rounded-3xl p-8 shadow-xl sm:p-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700 dark:bg-sky-950 dark:text-sky-200">
              Limited-time travel offers
            </div>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-foreground">
              Discover more. Spend less.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Unlock exclusive discounts on hotels, resorts, and vacation stays
              across the globe, with mock availability when APIs are incomplete.
            </p>
            <button className="mt-7 rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">
              Explore Deals
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-sky-200/30 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
              alt="Beach vacation"
              className="relative h-64 w-full rounded-3xl border border-border object-cover shadow-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
