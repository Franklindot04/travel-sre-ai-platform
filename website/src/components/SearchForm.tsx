"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      origin,
      destination,
      date,
    });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="card mt-6 grid gap-4 p-4 sm:grid-cols-4"
    >
      <div className="sm:col-span-1">
        <label className="block text-xs font-semibold uppercase text-muted">
          Origin
        </label>
        <input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="LON"
          className="input mt-1 w-full"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="block text-xs font-semibold uppercase text-muted">
          Destination
        </label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="NYC"
          className="input mt-1 w-full"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="block text-xs font-semibold uppercase text-muted">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input mt-1 w-full"
        />
      </div>
      <div className="flex items-end sm:col-span-1">
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400 dark:focus:ring-offset-slate-950"
        >
          Search trips
        </button>
      </div>
    </form>
  );
}
