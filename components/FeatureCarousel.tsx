"use client";

import { useState } from "react";

type Feature = {
  label: string;
  desc: string;
  icon: React.ReactNode;
};

// Strakk's feature set. Shown two at a time and paged through with the arrows.
const FEATURES: Feature[] = [
  {
    label: "Post your wins",
    desc: "Share to your crew or socials, with dynamic overlays",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="3" />
        <circle cx="12" cy="12.5" r="3" />
        <path d="M8 6l1.2-2h5.6L16 6" />
      </>
    ),
  },
  {
    label: "Rooms & rivalries",
    desc: "Compete with friends for the top spot",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20a6 6 0 0 1 12 0" />
        <path d="M16 6a3 3 0 0 1 0 6" />
        <path d="M19 20a6 6 0 0 0-4-5.7" />
      </>
    ),
  },
  {
    label: "Plan & train",
    desc: "Full exercise library with step-by-step guides",
    icon: (
      <>
        <path d="M6 6v12" />
        <path d="M3 9v6" />
        <path d="M18 6v12" />
        <path d="M21 9v6" />
        <path d="M6 12h12" />
      </>
    ),
  },
  {
    label: "Muscle balance",
    desc: "Train every muscle group, skip nothing",
    icon: (
      <>
        <path d="M12 3v18" />
        <path d="M8 21h8" />
        <path d="M3 7l9-2 9 2" />
        <path d="M3 7 1 13a3 3 0 0 0 6 0L5 7" />
        <path d="M19 7l-2 6a3 3 0 0 0 6 0l-2-6" />
      </>
    ),
  },
  {
    label: "Climb the leaderboard",
    desc: "Earn points and outrank your crew",
    icon: (
      <>
        <path d="M7 21h10" />
        <path d="M12 17v4" />
        <path d="M6 4h12v4a6 6 0 0 1-12 0V4z" />
        <path d="M18 5h2.5a2.5 2.5 0 0 1-2.5 4M6 5H3.5A2.5 2.5 0 0 0 6 9" />
      </>
    ),
  },
  {
    label: "Keep your streak",
    desc: "Daily momentum that pushes you to show up",
    icon: (
      <path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-1.5.6-2.7 1.4-3.6C9 9.9 10 9 10 7c1.3.7 2 1.8 2 3 .8-.8 1-2 0-4z" />
    ),
  },
  {
    label: "Track every PR",
    desc: "Log your lifts and watch the numbers climb",
    icon: (
      <>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </>
    ),
  },
  {
    label: "Plan your week",
    desc: "Schedule sessions and never miss a day",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="m9 16 2 2 4-4" />
      </>
    ),
  },
  {
    label: "Machine busy?",
    desc: "Get instant swaps that train the same muscles",
    icon: (
      <>
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      </>
    ),
  },
  {
    label: "Post in your room",
    desc: "Drop updates your crew can react to and comment on",
    icon: (
      <>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
        <path d="M12 8.4c-1-1.1-2.9-.9-2.9.7 0 1.1 1.5 2.1 2.9 3 1.4-.9 2.9-1.9 2.9-3 0-1.6-1.9-1.8-2.9-.7z" />
      </>
    ),
  },
];

const PAGE_SIZE = 2;
const PAGES = Array.from(
  { length: Math.ceil(FEATURES.length / PAGE_SIZE) },
  (_, i) => FEATURES.slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE),
);

function Item({ f }: { f: Feature }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface text-brand">
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {f.icon}
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-ink">{f.label}</span>
        <span className="block text-xs text-muted">{f.desc}</span>
      </span>
    </li>
  );
}

export default function FeatureCarousel() {
  const [page, setPage] = useState(0);
  const total = PAGES.length;

  const go = (dir: 1 | -1) => setPage((p) => (p + dir + total) % total);

  return (
    <div className="mt-7 w-full max-w-2xl">
      {/* Two features per page, side by side */}
      <div className="min-h-[64px]">
        <ul
          key={page}
          className="animate-fade-in grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2"
        >
          {PAGES[page].map((f) => (
            <Item key={f.label} f={f} />
          ))}
        </ul>
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm text-muted">
          <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
          And plenty more on the way.
        </p>

        <div className="flex items-center gap-3">
          {/* page dots */}
          <div className="flex items-center gap-1.5">
            {PAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to features page ${i + 1}`}
                aria-current={i === page}
                className={`h-1.5 rounded-full transition-all ${
                  i === page ? "w-4 bg-brand" : "w-1.5 bg-hairline hover:bg-muted"
                }`}
              />
            ))}
          </div>

          {/* arrows */}
          <div className="flex items-center gap-1.5">
            <Arrow dir="prev" onClick={() => go(-1)} />
            <Arrow dir="next" onClick={() => go(1)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "next" ? "Next features" : "Previous features"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-surface text-muted transition hover:border-brand/50 hover:text-ink focus:outline-none focus:ring-2 focus:ring-brand/50"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === "next" ? <path d="m9 18 6-6-6-6" /> : <path d="m15 18-6-6 6-6" />}
      </svg>
    </button>
  );
}
