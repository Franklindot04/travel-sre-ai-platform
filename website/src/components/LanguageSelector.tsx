"use client";

import { useEffect, useRef, useState } from "react";

const languages = [
  { label: "English", flag: "🇬🇧" },
  { label: "French", flag: "🇫🇷" },
  { label: "Spanish", flag: "🇪🇸" },
  { label: "German", flag: "🇩🇪" },
  { label: "Dutch", flag: "🇳🇱" },
  { label: "Portuguese", flag: "🇵🇹" },
  { label: "Italian", flag: "🇮🇹" },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="relative" ref={selectorRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-md px-2 py-1 text-slate-200 transition hover:bg-white/10 hover:text-sky-200"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span aria-hidden="true">{selectedLanguage.flag}</span>
        <span>{selectedLanguage.label}</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-sm text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          {languages.map((language) => (
            <button
              key={language.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setSelectedLanguage(language);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span aria-hidden="true">{language.flag}</span>
              {language.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
