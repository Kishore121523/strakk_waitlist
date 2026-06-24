"use client";

import { useEffect, useState } from "react";

// Full-page splash shown until the page (and its assets) finish loading. It is
// part of the SSR output, so it covers the page immediately with no flash of
// unstyled content, then fades out once `window` fires "load".
export default function PageLoader() {
  const [fading, setFading] = useState(false); // opacity 0 once ready
  const [removed, setRemoved] = useState(false); // unmounted after fade

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setFading(true);
      // remove from the DOM after the fade-out transition completes
      window.setTimeout(() => setRemoved(true), 600);
    };

    if (document.readyState === "complete") {
      // brief minimum so the loader doesn't just flash
      const t = window.setTimeout(finish, 400);
      return () => window.clearTimeout(t);
    }

    window.addEventListener("load", finish);
    const safety = window.setTimeout(finish, 8000); // fallback cap
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(safety);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated Strakk mark: slashes + dot pulse in sequence */}
      <svg
        viewBox="0 0 100 100"
        fill="#FF5A1F"
        aria-hidden="true"
        className="h-16 w-16"
      >
        <g transform="translate(3.5 0)">
          <polygon points="7 80 19 80 37 20 25 20" className="logo-wave" />
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
    </div>
  );
}
