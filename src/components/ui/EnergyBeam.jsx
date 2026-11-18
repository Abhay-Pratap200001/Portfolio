import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

/*
 * One continuous violet energy beam down the right margin of the page, from just
 * under the navbar to the bottom of the page. As you scroll, its
 * glowing head travels down with you and the beam is revealed behind it.
 *  - wide violet beam with a white-hot core and energy flowing through it
 *  - crackling electricity along the whole length: three different lightning
 *    shapes flicker in turn, so the arcs keep changing like live current
 *  - energy ball at the head with orbiting sparks and arcs
 *  - a node lights up at each section, and a burst fires at the end
 * The beam sits behind the cards and never blocks clicks.
 */

const HEAD_AT = 0.62 // the head sits at this fraction of the screen height
const ARC_W = 70 // width of the electricity band (px), kept tight around the beam

// Small seeded random so the lightning shapes are stable between renders.
function rng(seed) {
  let s = seed * 9301 + 49297
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// A jagged zig-zag running the full length of the beam, plus short forks.
function zigzag(len, seed, spread) {
  const r = rng(seed)
  const cx = ARC_W / 2
  let d = `M${cx} 0`
  const forks = []
  for (let y = 0; y <= len; y += 14 + r() * 16) {
    const x = cx + (r() - 0.5) * spread
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`
    if (r() > 0.93) {
      const dir = r() > 0.5 ? 1 : -1
      const fx = x + dir * (14 + r() * 18)
      const fy = y + 6 + r() * 14
      forks.push(`M${x.toFixed(1)} ${y.toFixed(1)} L${fx.toFixed(1)} ${fy.toFixed(1)} L${(fx + dir * 8).toFixed(1)} ${(fy + 10).toFixed(1)}`)
    }
  }
  return { d, forks: forks.join(' ') }
}

export default function BeamTrack({ children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [m, setM] = useState({ top: 0, start: 0, len: 1, nodes: [] })
  const mRef = useRef(m)

  // Measure where the beam starts/ends and where each section heading is.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY
      const sections = [...el.querySelectorAll(':scope > section')]
      const headY = (s) => {
        const h = s.querySelector('header') || s
        return h.getBoundingClientRect().top + window.scrollY - top + 8
      }
      // Start just under the fixed navbar at the very top of the page.
      const nav = document.querySelector('header')
      const start = (nav ? nav.offsetHeight : 64) - top
      // End at the very bottom of the page (the bottom edge of the footer).
      const footer = document.querySelector('footer')
      const end = footer ? footer.getBoundingClientRect().bottom + window.scrollY - top : el.offsetHeight - 48
      const next = { top, start, len: Math.max(1, Math.round(end - start)), nodes: sections.map((s) => headY(s) - start) }
      mRef.current = next
      setM(next)
    }
    measure()
    // Re-measure when anything changes size — including the thank-you message
    // opening above the footer, which pushes the footer (and the beam's end) down.
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    ro.observe(document.body)
    window.addEventListener('load', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('load', measure)
    }
  }, [])

  // The beam stays hidden until the visitor starts scrolling; half a second after
  // that first scroll it fades in and draws itself down from the navbar.
  const gate = useMotionValue(0)
  const [active, setActive] = useState(false)
  // Back at the very top it hides again, and reappears once the visitor scrolls down.
  useEffect(() => {
    const TOP = 8 // px from the top that counts as "at the top"
    let timer = null
    let on = false
    const show = () => {
      if (on || timer) return
      timer = setTimeout(() => {
        timer = null
        on = true
        setActive(true)
        gate.set(1)
      }, 500)
    }
    const hide = () => {
      clearTimeout(timer)
      timer = null
      if (!on) return
      on = false
      setActive(false)
      gate.set(0)
    }
    const onScroll = () => (window.scrollY <= TOP ? hide() : show())
    window.addEventListener('scroll', onScroll, { passive: true })
    // Opened part-way down the page (e.g. a refresh): treat that as scrolling.
    if (window.scrollY > TOP) show()
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [gate])

  // Head position (px from the beam start) follows the scroll.
  const { scrollY } = useScroll()
  const raw = useTransform([scrollY, gate], ([y, g]) => {
    if (!g) return 0
    const { top, start, len } = mRef.current
    // Over the last screen of the page the head speeds up from 62% to 100% of
    // the screen height, so at the very bottom it always reaches the footer.
    const vh = window.innerHeight
    const maxScroll = document.documentElement.scrollHeight - vh
    const k = Math.min(1, Math.max(0, (y - (maxScroll - vh)) / vh))
    const t = y + vh * (HEAD_AT + (1 - HEAD_AT) * k) - top - start
    return Math.min(len, Math.max(0, t))
  })
  const tip = useSpring(raw, { stiffness: 160, damping: 26, restDelta: 0.5 })
  const started = useTransform(tip, [0, 12], [0, 1])
  // 'tail' = how much of the beam has dissolved from the top (used at the end).
  const tail = useMotionValue(0)
  // Reveal everything above the head; allow the glow to spill out sideways.
  const clip = useTransform([tip, tail], ([t, tl]) => `inset(${tl === 0 ? -30 : tl}px -80px ${Math.max(0, mRef.current.len - t)}px -80px)`)
  const orbOpacity = useTransform([started, tail], ([s, tl]) => (tl > 4 ? 0 : s))
  // The head fades away once the dissolve has nearly reached the bottom.
  const headOpacity = useTransform([started, tail], ([s, tl]) => {
    const len = mRef.current.len
    return tl > len * 0.8 ? s * Math.max(0, 1 - (tl - len * 0.8) / (len * 0.2)) : s
  })

  const [done, setDone] = useState(false)
  useMotionValueEvent(tip, 'change', (t) => {
    const { len } = mRef.current
    if (t >= len - 2 && !done) {
      setDone(true)
      // Reached the end: after the burst, the beam slowly dissolves from top to bottom.
      // Start from the top of the screen (the part above is out of view anyway),
      // so the whole dissolve plays where the visitor can see it.
      const { top, start } = mRef.current
      const visibleTop = Math.max(0, Math.min(len, window.scrollY + 70 - top - start))
      tail.set(visibleTop)
      animate(tail, len, { duration: 2.6, delay: 0.5, ease: [0.45, 0, 0.25, 1] })
    } else if (t < len - 60 && done) {
      setDone(false)
      animate(tail, 0, { duration: 0.5, ease: 'easeOut' })
    }
  })

  // Three lightning shapes that take turns flickering along the beam.
  const arcs = useMemo(() => [zigzag(m.len, 3, 15), zigzag(m.len, 11, 20), zigzag(m.len, 23, 11)], [m.len])

  return (
    // overflow-x: clip trims the beam glow at the screen edge (no sideways scroll)
    // without affecting vertical overflow or sticky elements inside.
    <div ref={ref} className="relative [overflow-x:clip]">
      {!reduce && (
        <motion.div
          aria-hidden="true"
          // Hidden on phones: there is no side margin for it there, and it would
          // stick out past the screen edge (causing sideways scrolling).
          className="pointer-events-none absolute inset-y-0 -z-[5] hidden md:block [--pad:1rem] sm:[--pad:1.5rem] lg:[--pad:2rem] xl:[--pad:3rem]"
          // Right margin: centred in the empty space to the right of the content,
          // slightly dimmed and softly blurred so it stays behind everything.
          style={{ left: 'calc(100% - (max(0px, (100% - 1400px) / 2) + var(--pad)) / 2)', filter: 'blur(0.8px) brightness(0.85)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 0.62 : 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Clip box: cuts everything off exactly at the page bottom, so the head and
              burst hit the bottom edge without making the page scroll any further. */}
          <div className="absolute left-0 [overflow-x:visible] [overflow-y:clip]" style={{ top: m.start - 60, height: m.len + 60 }}>
          <div className="absolute left-0" style={{ top: 60, height: m.len }}>
            {/* Charging orb at the start point */}
            <motion.div style={{ opacity: orbOpacity }} className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
              <div className="beam-orb h-7 w-7 rounded-full md:h-9 md:w-9" />
            </motion.div>

            {/* Everything above the head is revealed by the clip */}
            <motion.div style={{ clipPath: clip }} className="absolute left-0 top-0 h-full">
              {/* Wide soft aura */}
              <div className="absolute inset-y-0 left-0 w-16 -translate-x-1/2 rounded-full bg-accent/25 blur-xl md:w-24" />
              {/* Beam body with flowing energy */}
              <div className="beam-body absolute inset-y-0 left-0 w-[10px] -translate-x-1/2 overflow-hidden rounded-full md:w-[14px]">
                <div className="beam-surge absolute inset-x-0 top-0 h-56" style={{ '--len': `${m.len}px` }} />
              </div>
              {/* White-hot core */}
              <div className="absolute inset-y-0 left-0 w-[3px] -translate-x-1/2 rounded-full bg-white md:w-1" />

              {/* Electricity along the whole length. Each arc is its own <svg> layer
                  so the GPU can crossfade them smoothly without redrawing the
                  (very tall) shapes every frame. */}
              {arcs.map((a, i) => (
                <svg
                  key={i}
                  width={ARC_W}
                  height={m.len}
                  viewBox={`0 0 ${ARC_W} ${m.len}`}
                  className={`beam-arc beam-arc-${i} absolute left-0 top-0 -translate-x-1/2 overflow-visible`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={a.d} stroke="#a78bfa" strokeOpacity="0.22" strokeWidth="4" />
                  <path d={a.d} stroke="#ddd6fe" strokeOpacity="0.85" strokeWidth="1.1" />
                  <path d={a.forks} stroke="#ede9fe" strokeOpacity="0.8" strokeWidth="0.8" />
                </svg>
              ))}
            </motion.div>

            {/* Section nodes light up as the beam reaches them */}
            {m.nodes.map((y, i) => (
              <BeamNode key={i} y={y} tip={tip} tail={tail} />
            ))}

            {/* Energy ball riding the head of the beam */}
            <motion.div style={{ y: tip, opacity: headOpacity }} className="absolute left-0 top-0">
              <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="relative h-12 w-12 md:h-16 md:w-16">
                  <div className="beam-head-glow absolute -inset-8 rounded-full" />
                  <div className="beam-head-core absolute inset-0 rounded-full" />
                  <div className="beam-sparks absolute -inset-4">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <span
                        key={deg}
                        className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-100"
                        style={{ transform: `rotate(${deg}deg)`, transformOrigin: '50% calc(50% + 2.4rem)' }}
                      />
                    ))}
                  </div>
                  <svg viewBox="-30 -30 60 60" className="beam-arcs absolute -inset-6 overflow-visible" fill="none" strokeLinecap="round">
                    <path d="M-4 -6 L-12 -10 L-10 -16 L-19 -21" stroke="#f5f3ff" strokeWidth="1.3" />
                    <path d="M6 -2 L14 -6 L13 2 L22 0" stroke="#ddd6fe" strokeWidth="1.2" />
                    <path d="M-2 7 L-8 14 L-2 16 L-7 24" stroke="#f5f3ff" strokeWidth="1.2" />
                    <path d="M4 8 L11 12 L9 18 L16 22" stroke="#ddd6fe" strokeWidth="1.1" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Burst when the beam reaches the end */}
            {done && (
              <div className="absolute left-0 -translate-x-1/2 -translate-y-1/2" style={{ top: m.len }}>
                <div className="beam-burst h-40 w-40 rounded-full" />
              </div>
            )}
          </div>
          </div>
        </motion.div>
      )}
      {children}
    </div>
  )
}

function BeamNode({ y, tip, tail }) {
  const lit = useTransform(tip, [y - 20, y], [0, 1])
  const gone = useTransform(tail, (tl) => (tl > y ? 0 : 1))
  return (
    <motion.div className="absolute left-0 -translate-x-1/2 -translate-y-1/2" style={{ top: y, opacity: gone }}>
      <div className="h-5 w-5 rounded-full border border-accent/40 bg-ink" />
      <motion.div style={{ opacity: lit }} className="beam-node absolute inset-0 rounded-full" />
    </motion.div>
  )
}
