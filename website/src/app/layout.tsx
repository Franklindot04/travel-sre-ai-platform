import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";

export const metadata: Metadata = {
  title: "Travel SRE AI Platform",
  description: "Demo travel agency UI powered by an AI-driven SRE platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <header className="w-full bg-slate-950 text-white shadow-lg">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <Link href="/" className="flex items-baseline gap-3">
                <span className="text-2xl font-bold tracking-tight">
                  Travel SRE AI
                </span>
                <span className="hidden text-sm text-slate-300 sm:inline">
                  A demo travel platform
                </span>
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-sm lg:gap-5">
                <Link
                  href="/search"
                  className="rounded-md px-2 py-1 text-slate-200 transition hover:bg-white/10 hover:text-sky-200"
                >
                  Search
                </Link>
                <Link
                  href="/booking"
                  className="rounded-md px-2 py-1 text-slate-200 transition hover:bg-white/10 hover:text-sky-200"
                >
                  Bookings
                </Link>
                <button className="rounded-md px-2 py-1 text-slate-200 transition hover:bg-white/10 hover:text-sky-200">
                  EUR
                </button>
                <LanguageSelector />
                <button className="hidden rounded-md px-2 py-1 text-slate-200 transition hover:bg-white/10 hover:text-sky-200 sm:inline-flex">
                  Become a host
                </button>
                <button className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-950 transition hover:bg-slate-100">
                  Register
                </button>
                <button className="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-500">
                  Log in
                </button>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
