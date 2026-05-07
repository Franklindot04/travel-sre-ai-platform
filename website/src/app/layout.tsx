import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/ThemeToggle";

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
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <Providers>

          {/* FULL-WIDTH TOP BAR */}
          <header className="w-full bg-slate-900 text-white">
            <div className="flex items-center justify-between px-8 py-4">

              {/* Left: Brand + Subtitle */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold tracking-tight">
                  Travel SRE AI
                </span>
                <span className="text-sm text-slate-300">
                  A demo travel platform
                </span>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-6 text-sm">
                <button className="hover:text-sky-300 transition">EUR</button>

                <button className="flex items-center gap-1 hover:text-sky-300 transition">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v18m9-9H3" />
                  </svg>
                  <span>EN</span>
                </button>

                <button className="flex items-center gap-1 hover:text-sky-300 transition">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 115.82 1c0 2-3 2-3 4" />
                    <circle cx="12" cy="17" r="1" />
                  </svg>
                  Help
                </button>

                <button className="hover:text-sky-300 transition">
                  Become a host
                </button>

                <button className="px-4 py-1.5 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition">
                  Register
                </button>

                <button className="px-4 py-1.5 rounded-lg bg-sky-600 font-semibold hover:bg-sky-700 transition">
                  log in
                </button>

                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* CONSTRAINED MAIN CONTENT */}
          <main className="mx-auto max-w-6xl px-4 py-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
