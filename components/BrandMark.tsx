// Inline Strakk brand mark: three forward-leaning parallel slashes ("///")
// followed by a solid dot, in brand orange. The three slashes ramp in opacity
// (0.5 / 0.78 / 1.0) to read as a speed / motion mark. Geometry matches the
// official brand glyph (assets/brand-assets/svg/strakk-glyph-orange.svg).
export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Strakk logo"
      className={className}
    >
      <g transform="translate(3.5 0)" fill="#FF5A1F">
        <polygon points="7 80 19 80 37 20 25 20" opacity="0.5" />
        <polygon points="29 80 41 80 59 20 47 20" opacity="0.78" />
        <polygon points="51 80 63 80 81 20 69 20" />
        <circle cx="86" cy="74" r="8" />
      </g>
    </svg>
  );
}
