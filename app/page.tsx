import BrandMark from "@/components/BrandMark";
import WaitlistForm from "@/components/WaitlistForm";
import PhoneDuo from "@/components/PhoneDuo";
import FeatureCarousel from "@/components/FeatureCarousel";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Subtle brand-orange radial glow behind the headline / phone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 35%, rgba(255,90,31,0.12), transparent 70%), radial-gradient(45% 45% at 85% 60%, rgba(18,182,160,0.06), transparent 70%)",
        }}
      />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:gap-24 lg:pb-0 lg:pt-8">
        {/* Left column — brand, copy, form */}
        <div className="flex w-full max-w-2xl flex-col items-start lg:flex-1">
          {/* Logo + wordmark */}
          <div className="flex items-center gap-3">
            <BrandMark className="h-9 w-9" />
            <span className="text-4xl font-extrabold tracking-tight text-ink">
              Strakk
            </span>
          </div>

          {/* Headline */}
          <h1 className="headline mt-8 max-w-[15ch] font-extrabold text-ink [font-size:clamp(2.25rem,6vw,4rem)]">
            Race your crew, chase your best.
          </h1>

          {/* Subheadline */}
          <p className="mt-5 max-w-2xl text-[15px] text-muted sm:text-base">
            Create rooms, bring your crew, and turn every workout into points and
            streaks. All in a clean, seamless app where everything sits right
            where you need it, with plenty more on the way.
          </p>

          {/* Features */}
          <FeatureCarousel />

          {/* Email capture */}
          <div className="mt-8 w-full">
            <WaitlistForm />
          </div>

          {/* Small line under the form */}
          <p className="mt-4 text-sm text-muted">
            Be the first in when we launch.
          </p>
        </div>

        {/* Right column — two-phone hero */}
        <div className="flex w-full justify-center lg:flex-1">
          <PhoneDuo />
        </div>
      </div>
    </main>
  );
}
