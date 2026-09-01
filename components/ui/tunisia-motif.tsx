export function TunisiaMotif({ className = "", opacity = 0.06 }: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M118 60a44 44 0 1 0 0 80 54 54 0 1 1 0-80Z"
        fill="currentColor"
      />
      <g transform="translate(140,100)">
        <path
          d="M0 -16 L4.5 -5 L16 -4 L7 3.5 L9.5 15 L0 8.5 L-9.5 15 L-7 3.5 L-16 -4 L-4.5 -5 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
