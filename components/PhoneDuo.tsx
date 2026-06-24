import Image from "next/image";

// Two pre-rendered phone mockups (frame + 3D tilt already baked into the PNGs,
// transparent background). We just layer them diagonally — the "top" screen in
// front to the upper-left, the "bottom" screen behind to the lower-right — and
// add silhouette drop-shadows for depth.
export default function PhoneDuo() {
  return (
    <div className="relative aspect-[9/10] w-full max-w-[530px]">
      {/* soft brand glow behind the devices */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.10] blur-[90px]"
      />

      {/* Back phone — lower-right, behind */}
      <Image
        src="/phone-bottom.png"
        alt="Strakk app, room leaderboard and activity"
        width={5239}
        height={7988}
        sizes="320px"
        className="absolute bottom-0 right-0 w-[60%] [filter:drop-shadow(0_25px_35px_rgba(0,0,0,0.45))]"
      />

      {/* Front phone — upper-left, in front */}
      <Image
        src="/phone-top.png"
        alt="Strakk app, daily home dashboard"
        width={4410}
        height={7350}
        sizes="320px"
        priority
        className="absolute left-0 top-0 w-[58%] [filter:drop-shadow(0_45px_55px_rgba(0,0,0,0.6))]"
      />
    </div>
  );
}
