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
      className="mt-6 grid gap-4 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-4"
    >
      <div className="sm:col-span-1">
        <label className="block text-xs font-medium text-slate-600">
          Origin
        </label>
        <input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="LON"
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="block text-xs font-medium text-slate-600">
          Destination
        </label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="NYC"
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="block text-xs font-medium text-slate-600">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-end sm:col-span-1">
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          Search trips
        </button>
      </div>
    </form>
  );
}
