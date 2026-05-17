"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { TravelSearchType } from "@/lib/api";

type Field = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
};

type Tab = {
  id: TravelSearchType;
  label: string;
  icon: ReactNode;
  fields: Field[];
};

const tabs: Tab[] = [
  {
    id: "flights",
    label: "Flights",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M16 2l6 6-8 3-3 8-3-3 2-5-5 2-3-3 8-3z" />
      </svg>
    ),
    fields: [
      { id: "origin", label: "Origin", placeholder: "LON" },
      { id: "destination", label: "Destination", placeholder: "NYC" },
      { id: "date", label: "Date", placeholder: "", type: "date" },
    ],
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 21V8a2 2 0 012-2h14a2 2 0 012 2v13M7 21v-6h10v6M7 10h.01M12 10h.01M17 10h.01" />
      </svg>
    ),
    fields: [
      { id: "city", label: "City", placeholder: "Paris" },
      { id: "checkIn", label: "Check-in", placeholder: "", type: "date" },
      { id: "checkOut", label: "Check-out", placeholder: "", type: "date" },
      { id: "guests", label: "Guests", placeholder: "2 adults" },
    ],
  },
  {
    id: "cars",
    label: "Car rental",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 17h14M6 17a2 2 0 104 0M14 17a2 2 0 104 0M4 13l2-5h12l2 5M3 13h18v4H3z" />
      </svg>
    ),
    fields: [
      { id: "pickupLocation", label: "Pickup location", placeholder: "Heathrow Airport" },
      { id: "pickupDate", label: "Pickup date", placeholder: "", type: "date" },
      { id: "returnDate", label: "Return date", placeholder: "", type: "date" },
    ],
  },
  {
    id: "taxis",
    label: "Airport taxis",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 13l2-5h12l2 5M5 17h14M7 17a2 2 0 104 0M13 17a2 2 0 104 0M3 13h18v4H3zM9 5h6" />
      </svg>
    ),
    fields: [
      { id: "pickup", label: "Pickup", placeholder: "JFK Airport" },
      { id: "dropoff", label: "Dropoff", placeholder: "Manhattan" },
      { id: "pickupTime", label: "Date/time", placeholder: "", type: "datetime-local" },
    ],
  },
  {
    id: "cruises",
    label: "Cruise",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 17l8 4 8-4 1-6H3l1 6zM8 11V6h8v5M10 6V3h4v3M7 15h10" />
      </svg>
    ),
    fields: [
      { id: "departurePort", label: "Departure port", placeholder: "Barcelona" },
      { id: "destination", label: "Destination", placeholder: "Greek Islands" },
      { id: "departureDate", label: "Departure date", placeholder: "", type: "date" },
    ],
  },
  {
    id: "attractions",
    label: "Attractions",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2l2.8 6 6.2.6-4.7 4.2 1.4 6.2L12 15.8 6.3 19l1.4-6.2L3 8.6 9.2 8z" />
      </svg>
    ),
    fields: [
      { id: "city", label: "City/destination", placeholder: "Rome" },
      { id: "date", label: "Date", placeholder: "", type: "date" },
      { id: "guests", label: "Guests", placeholder: "2 adults" },
    ],
  },
];

const defaultValues: Record<TravelSearchType, Record<string, string>> = {
  flights: { origin: "LON", destination: "NYC", date: "2026-06-01" },
  hotels: {
    city: "Paris",
    checkIn: "2026-06-01",
    checkOut: "2026-06-05",
    guests: "2 adults",
  },
  cars: {
    pickupLocation: "Heathrow Airport",
    pickupDate: "2026-06-01",
    returnDate: "2026-06-05",
  },
  taxis: {
    pickup: "JFK Airport",
    dropoff: "Manhattan",
    pickupTime: "2026-06-01T10:30",
  },
  cruises: {
    departurePort: "Barcelona",
    destination: "Greek Islands",
    departureDate: "2026-06-01",
  },
  attractions: { city: "Rome", date: "2026-06-01", guests: "2 adults" },
};

export default function SearchForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TravelSearchType>("flights");
  const [values, setValues] = useState(defaultValues);

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const currentValues = values[activeTab];

  function updateValue(field: string, value: string) {
    setValues((previous) => ({
      ...previous,
      [activeTab]: {
        ...previous[activeTab],
        [field]: value,
      },
    }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams({ type: activeTab });
    Object.entries(currentValues).forEach(([key, value]) => {
      if (value.trim()) {
        params.set(key, value.trim());
      }
    });

    router.push(`/search?${params.toString()}`);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-slate-300 pb-4 text-sm dark:border-slate-700">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-semibold transition ${
                isActive
                  ? "border-sky-300 bg-sky-100 text-slate-950 shadow-sm dark:border-sky-700 dark:bg-sky-900/70 dark:text-white"
                  : "border-transparent text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800"
              }`}
              aria-pressed={isActive}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 lg:grid-cols-4">
        {currentTab.fields.map((field) => (
          <div key={field.id} className="lg:col-span-1">
            <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-200">
              {field.label}
            </label>
            <input
              value={currentValues[field.id] || ""}
              onChange={(event) => updateValue(field.id, event.target.value)}
              placeholder={field.placeholder}
              type={field.type || "text"}
              className="mt-1 w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-sm font-medium text-slate-950 shadow-sm outline-none transition placeholder:text-slate-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-blue-400"
            />
          </div>
        ))}

        <div className="flex items-end lg:col-span-1">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400 dark:focus:ring-offset-slate-950"
          >
            Search {currentTab.label.toLowerCase()}
          </button>
        </div>
      </form>
    </div>
  );
}
