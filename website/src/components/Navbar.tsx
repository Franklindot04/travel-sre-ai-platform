"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        {/* Left: Branding */}
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded bg-blue-600 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Travel SRE AI
          </span>
          <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-300">
            Demo Travel Agency
          </span>
        </Link>

        {/* Right: Navigation */}
        <div className="flex items-center gap-5 text-sm text-slate-600 dark:text-slate-300">
          <Link href="/search" className="hover:text-blue-600 dark:hover:text-blue-400">
            Search
          </Link>
          <Link href="/bookings" className="hover:text-blue-600 dark:hover:text-blue-400">
            Bookings
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}