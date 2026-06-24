"use client";

import { useEffect, useState } from "react";

// "celebrate" plays the logo animation; it then transitions to "success".
type Status = "idle" | "submitting" | "celebrate" | "success" | "error";

// Pragmatic email check — the browser also enforces type="email" + required.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORMSPARK_ACTION = process.env.NEXT_PUBLIC_FORMSPARK_ACTION ?? "";

// When true, submitting skips the network call entirely and just runs the
// animation -> success flow. Lets you preview the UX without spending form
// submissions. Set NEXT_PUBLIC_WAITLIST_TEST=true in .env.local to enable.
const TEST_MODE = process.env.NEXT_PUBLIC_WAITLIST_TEST === "true";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Busy = network in flight or the logo animation playing in the button.
  const busy = status === "submitting" || status === "celebrate";

  // After the logo animation plays, settle into the final confirmation.
  useEffect(() => {
    if (status !== "celebrate") return;
    const t = setTimeout(() => setStatus("success"), 1900);
    return () => clearTimeout(t);
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || status === "celebrate") return;

    // Honeypot: if a bot filled the hidden field, silently "succeed".
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("_honeypot") as HTMLInputElement)?.value;
    if (honeypot) {
      setStatus("celebrate");
      return;
    }

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    // Test mode: play the animation without submitting anything.
    if (TEST_MODE) {
      setError("");
      setStatus("celebrate");
      setEmail("");
      return;
    }

    if (!FORMSPARK_ACTION || FORMSPARK_ACTION.includes("YOUR_FORM_ID")) {
      setError("Waitlist isn't configured yet. Please try again later.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(FORMSPARK_ACTION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      setStatus("celebrate");
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  // Success: short confirmation once the animation has played.
  if (status === "success") {
    return (
      <div
        aria-live="polite"
        className="animate-morph-in flex min-h-[64px] w-full max-w-md items-center gap-3 rounded-2xl border border-teal/30 bg-teal/10 px-5 py-4"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
          {/* check icon */}
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="text-sm font-semibold text-ink sm:text-base">
          You&apos;re in! You&apos;ve joined the waitlist 🎉
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      {/* Visually-hidden label for screen readers */}
      <label htmlFor="email" className="sr-only">
        Email address
      </label>

      {/* Honeypot: hidden from humans, tempting to bots. */}
      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {/* Inline pill on desktop, stacked on mobile */}
      <div className="flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-2 sm:flex-row sm:items-center sm:rounded-full sm:p-1.5">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={busy}
          className="w-full flex-1 rounded-xl bg-transparent px-4 py-3 text-ink placeholder:text-muted/70 focus:outline-none sm:rounded-full disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          className="relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-xl bg-brand px-6 py-3 font-semibold text-white shadow-[0_8px_24px_-8px_rgba(255,90,31,0.6)] transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/60 focus:ring-offset-2 focus:ring-offset-bg active:scale-[0.99] disabled:cursor-not-allowed sm:rounded-full"
        >
          {/* Keep the label in flow (invisible while busy) so the button never
              changes size between states. */}
          <span className={busy ? "invisible" : ""}>Join waitlist</span>
          {busy && (
            <>
              {/* White Strakk mark (no box) with its slashes + dot pulsing in
                  sequence as a loading animation. */}
              <svg
                viewBox="0 0 100 100"
                fill="#fff"
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2"
              >
                <g transform="translate(3.5 0)">
                  <polygon
                    points="7 80 19 80 37 20 25 20"
                    className="logo-wave"
                  />
                  <polygon
                    points="29 80 41 80 59 20 47 20"
                    className="logo-wave"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <polygon
                    points="51 80 63 80 81 20 69 20"
                    className="logo-wave"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <circle
                    cx="86"
                    cy="74"
                    r="8"
                    className="logo-wave"
                    style={{ animationDelay: "0.45s" }}
                  />
                </g>
              </svg>
              <span className="sr-only">Joining…</span>
            </>
          )}
        </button>
      </div>

      {/* aria-live status region for errors */}
      <div aria-live="polite" className="min-h-[1.25rem]">
        {status === "error" && error && (
          <p className="mt-2 px-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    </form>
  );
}
