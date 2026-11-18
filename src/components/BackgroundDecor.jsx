import { motion, useReducedMotion } from 'framer-motion'

/*
 * Page-wide decoration that sits behind every section:
 * soft light "shades" and long, hair-thin flowing curves. Pure SVG/CSS — no images.
 * Each curve uses a gradient stroke that fades out at both ends, so the lines
 * feel like light streaks rather than hard strokes.
 */
const curves = [
  { d: 'M-100 260 C 260 120, 520 520, 860 380 S 1380 160, 1560 300', o: 0.09 },
  { d: 'M-100 620 C 300 460, 600 820, 980 640 S 1400 420, 1560 560', o: 0.07 },
  { d: 'M-100 140 C 380 300, 700 40, 1040 200 S 1420 380, 1560 220', o: 0.05 },
]

export default function BackgroundDecor() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Shades: a faint spotlight from the top and gentle glows at the edges */}
      <div className="absolute left-1/2 top-[-20%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(255_255_255/0.03),transparent)]" />
      <div className="absolute -left-[15%] top-[30%] h-[60vh] w-[50vw] rounded-[50%] bg-[radial-gradient(closest-side,rgb(139_92_246/0.045),transparent)]" />
      <div className="absolute -right-[15%] bottom-[-10%] h-[60vh] w-[50vw] rounded-[50%] bg-[radial-gradient(closest-side,rgb(167_139_250/0.04),transparent)]" />
      {/* Vignette: darkens the corners so the centre feels lit */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(0_0_0/0.3))]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          {/* Fade each line in from the left and out to the right */}
          <linearGradient id="curve-fade" x1="0" x2="1440" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.3" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="0.7" stopColor="#c4b5fd" stopOpacity="1" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity="0" />
          </linearGradient>
        </defs>

        {curves.map((c, i) => (
          <motion.path
            key={i}
            d={c.d}
            stroke="url(#curve-fade)"
            strokeOpacity={c.o}
            strokeWidth="0.8"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.2, delay: 0.3 + i * 0.4, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
