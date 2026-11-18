import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

/*
 * Scroll-driven decoration placed behind each section:
 *  - thin curved lines that draw themselves as the section scrolls into view
 *  - soft colour "shades" that fade in and drift with a gentle parallax
 * Each section gets one of several layouts so the page doesn't repeat itself.
 */
const layouts = [
  {
    lines: [
      'M-50 120 C 300 20, 520 260, 820 160 S 1300 40, 1500 140',
      'M-50 700 C 260 560, 640 760, 980 620 S 1340 520, 1500 600',
    ],
    shades: [
      { className: '-left-[10%] top-[5%] h-[55%] w-[45%]', color: 'rgb(139 92 246 / 0.07)' },
      { className: '-right-[8%] bottom-[0%] h-[50%] w-[40%]', color: 'rgb(255 255 255 / 0.035)' },
    ],
  },
  {
    lines: [
      'M1500 80 C 1140 200, 900 -20, 600 120 S 140 260, -50 140',
      'M-50 520 C 360 640, 700 420, 1040 560 S 1380 720, 1500 640',
    ],
    shades: [
      { className: '-right-[12%] top-[10%] h-[55%] w-[45%]', color: 'rgb(167 139 250 / 0.07)' },
      { className: '-left-[10%] bottom-[5%] h-[45%] w-[40%]', color: 'rgb(255 255 255 / 0.03)' },
    ],
  },
  {
    lines: [
      'M-50 300 C 240 160, 520 420, 760 300 S 1180 120, 1500 260',
      'M-50 760 C 420 640, 760 800, 1100 680 S 1400 600, 1500 680',
      'M200 -20 C 260 200, 120 380, 260 620',
    ],
    shades: [
      { className: 'left-[25%] top-[0%] h-[45%] w-[50%]', color: 'rgb(139 92 246 / 0.06)' },
      { className: '-right-[10%] bottom-[10%] h-[45%] w-[35%]', color: 'rgb(196 181 253 / 0.05)' },
    ],
  },
]

// Rotate layouts in page order so neighbouring sections always differ.
const order = ['about', 'experience', 'projects', 'skills', 'cloud', 'education', 'resume', 'contact']
function layoutIndex(id) {
  const i = order.indexOf(id)
  if (i >= 0) return i
  let h = 0
  for (let c = 0; c < id.length; c++) h = (h * 31 + id.charCodeAt(c)) | 0
  return Math.abs(h)
}

export default function SectionDecor({ id }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const layout = layouts[layoutIndex(id) % layouts.length]

  // 0 when the section's top meets the bottom of the screen, 1 when its bottom leaves the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })

  const draw = useTransform(progress, [0.05, 0.5], [0, 1])
  const lineOpacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const shadeOpacity = useTransform(progress, [0, 0.3, 0.75, 1], [0, 1, 1, 0])
  const driftUp = useTransform(progress, [0, 1], [80, -80])
  const driftDown = useTransform(progress, [0, 1], [-60, 60])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Shades */}
      {layout.shades.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-[50%] ${s.className}`}
          style={{
            background: `radial-gradient(closest-side, ${s.color}, transparent)`,
            opacity: reduce ? 1 : shadeOpacity,
            y: reduce ? 0 : i % 2 ? driftDown : driftUp,
          }}
        />
      ))}

      {/* Lines */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{ opacity: reduce ? 1 : lineOpacity }}
      >
        <defs>
          <linearGradient id={`fade-${id}`} x1="0" x2="1440" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.25" stopColor="#ffffff" stopOpacity="0.09" />
            <stop offset="0.75" stopColor="#c4b5fd" stopOpacity="0.1" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity="0" />
          </linearGradient>
        </defs>
        {layout.lines.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={`url(#fade-${id})`}
            strokeWidth="1"
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : draw }}
          />
        ))}
      </motion.svg>
    </div>
  )
}
