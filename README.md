 ---
  Build a single-page waitlist landing page for a mobile app called Strakk — a social gym-tracking app (think Strava meets a workout logger: log lifts & cardio, earn points, compete on leaderboards
  with friends). Use Next.js (App Router) + TypeScript + Tailwind CSS. It will be deployed on Vercel.
  
  Layout (desktop)

  A two-column hero, vertically centered, full viewport height:
  - Left column: logo + wordmark at top, then a big bold headline, a one-line subheadline, then the email capture form, then a small "follow for updates" line.
  - Right column: a phone mockup (iPhone-style frame) showing a screenshot of the app. I'll drop a screenshot image at /public/app-screenshot.png — render it inside a rounded phone frame with a
  subtle shadow/glow. If the image is missing, show a placeholder.
 
  On mobile, stack to a single column: logo → headline → subheadline → form → phone mockup below.

  Copy (use this text)

  - Wordmark: Strakk
  - Headline: Your gym, but make it a competition
  - Subheadline: Log your lifts, track every PR, and climb the leaderboard with your crew. Stop training alone.
  - Button label: Join waitlist
  - Email input placeholder: Enter your email
  - Small line under the form: Be the first in when we launch.

  Brand / theme — DARK theme, these exact colors

  Add these to the Tailwind config as custom colors and use them throughout:
  - Background / surface: #0E1116
  - Card / elevated surface: #191D24
  - Primary text (ink): #ECEEF3
  - Muted text: #9BA6B5
  - Borders / hairlines: #2A2F38
  - Brand (primary accent / button): #FF5A1F (a vivid orange)
  - Secondary accent: #12B6A0 (teal) — use sparingly, e.g. a subtle glow or a success state

  Design direction: modern, premium, dark. The page background is near-black (#0E1116) with a subtle radial gradient glow in the brand orange behind the headline/phone (very low opacity, like
  rgba(255,90,31,0.12)). Headline in #ECEEF3, bold, large (clamp for responsiveness). Subheadline in #9BA6B5. Rounded corners (xl/2xl), generous spacing.

  Logo mark

  Create a small inline SVG brand mark to sit left of the "Strakk" wordmark: three forward-leaning parallel slashes followed by a dot ("///.", like a speed/motion mark), filled in the brand orange
  #FF5A1F, with the three slashes at increasing opacity (0.5, 0.78, 1.0) and a solid dot. Render it ~24px tall next to the bold white wordmark.

  Email form — Formspark backend

  The form should POST the email to Formspark. Put the endpoint in an env var:
  - .env.local: NEXT_PUBLIC_FORMSPARK_ACTION=https://submit-form.com/YOUR_FORM_ID

  Behavior: 
  - Email input + "Join waitlist" button laid out as a single inline pill on desktop (input on the left, orange button on the right), stacked on mobile.
  - On submit: client-side validate the email; then POST to the Formspark action URL with Content-Type: application/json and Accept: application/json, body { email }. Include a hidden honeypot field
  named _honeypot (leave empty; bots fill it).
  - Manage idle | submitting | success | error states. While submitting, disable the button and show a spinner/"Joining…".
  - On success, replace the form with a friendly confirmation: a teal check + "You're on the list 🎉 — we'll email you when Strakk opens up."
  - On error, show an inline error message in a soft red and let them retry.
  - Make it accessible: proper <form>, <label> (visually hidden is fine), type="email", required, aria-live region for status messages.

  Technical requirements

  - App Router, a single app/page.tsx (plus a small WaitlistForm client component with "use client").
  - Tailwind configured with the custom colors above; set the dark background globally on <body>.
  - Fully responsive, looks great on mobile and desktop.
  - Use a clean system/sans font stack (or Inter via next/font), with tight, bold headline tracking.
  - SEO/social: set metadata (title "Strakk — Join the waitlist", description, and Open Graph tags) so link previews look good. Add a favicon note.
  - No backend routes needed — submission goes straight to Formspark from the client.
  - Add brief comments and a short README snippet explaining where to set NEXT_PUBLIC_FORMSPARK_ACTION.

  Keep it to one cohesive, polished page. Prioritize a premium dark aesthetic that matches the brand orange.

  ---

# Strakk — Waitlist

A single-page waitlist landing page for **Strakk**, built with Next.js (App Router) +
TypeScript + Tailwind CSS. Dark, premium aesthetic with the brand-orange accent.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Configure the Formspark endpoint

The email form POSTs straight to [Formspark](https://formspark.io) from the client —
there is no backend route. Set your form's submit URL in **`.env.local`**:

```bash
# .env.local
NEXT_PUBLIC_FORMSPARK_ACTION=https://submit-form.com/YOUR_FORM_ID
```

Replace `YOUR_FORM_ID` with the ID from your Formspark dashboard. The `NEXT_PUBLIC_`
prefix is required so the value is available in the browser (Formspark submit URLs are
public by design). Until a real URL is set, the form shows a friendly "not configured"
error instead of submitting. A hidden `_honeypot` field is included for basic spam
filtering.

On Vercel, add `NEXT_PUBLIC_FORMSPARK_ACTION` under **Project → Settings → Environment
Variables**, then redeploy.

## Assets

- `public/app-screenshot.png` — phone-mockup screenshot (swap in your own anytime).
- `public/favicon-*.png`, `apple-touch-icon.png`, `icon-*.png` — favicons / PWA icons.
- `public/og-image.png` — Open Graph / Twitter card image.

## Build & deploy

```bash
npm run build
npm run start
```

Deploys to Vercel as-is (zero config). Push the repo and import it in Vercel.