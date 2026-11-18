import { useRef } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUp, Heart } from 'lucide-react'

/*
 * "Thanks for visiting" moment at the very end of the page.
 * No space is reserved up front: when the visitor reaches the end of the
 * Contact section, the gap above the footer opens up while the message rises
 * out of the footer edge (so the space and the message arrive together).
 * Then the heading reveals letter by letter, sparkles burst and the hand waves.
 * Text only — no card background.
 */
const COLORS = ['#a78bfa', '#c4b5fd', '#61DAFB', '#F7DF1E', '#25D366', '#FF9900', '#f472b6', '#ffffff']
const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2 + (i % 2 ? 0.15 : -0.1)
  const dist = 130 + ((i * 37) % 100)
  return {
    x: Math.cos(angle) * dist * 1.7,
    y: Math.sin(angle) * dist * 0.8,
    size: 4 + (i % 4) * 2,
    color: COLORS[i % COLORS.length],
    delay: (i % 6) * 0.04,
    round: i % 3 !== 0,
  }
})

const TITLE = 'Thanks for visiting!'
const RISE = [0.16, 1, 0.3, 1] // long, gentle ease-out

export default function ThankYou() {
  // A 1px marker at the end of the page content: once it's on screen, the
  // visitor has reached the bottom and the message opens up.
  const markerRef = useRef(null)
  const inView = useInView(markerRef, { margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotion()

  return (
    <div className="relative">
      <div ref={markerRef} aria-hidden="true" className="h-px" />

      <AnimatePresence initial={false}>
        {inView && (
          <motion.div
            key="thanks"
            // The space itself grows from 0 while the message rises into it.
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0, transition: { duration: 0.8, ease: 'easeInOut', delay: 0.2 } }}
            transition={{ duration: 1.6, ease: RISE }}
            // Clip only the bottom edge, so the text comes up out of the footer
            // while sparkles can still fly out above and to the sides.
            className="relative [clip-path:inset(-400px_-400px_0_-400px)]"
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 220, rotateX: 35, scale: 0.9, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 120, filter: 'blur(8px)', transition: { duration: 0.5, ease: 'easeIn' } }}
              transition={{ duration: 1.8, delay: 0.15, ease: RISE }}
              className="relative mx-auto max-w-3xl origin-bottom px-4 pb-14 pt-12 text-center [perspective:1200px]"
            >
              {/* Sparkle burst once the message has landed */}
              {!reduce && (
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
                  {PARTICLES.map((p, i) => (
                    <motion.span
                      key={i}
                      className={`absolute ${p.round ? 'rounded-full' : 'rotate-45 rounded-[2px]'}`}
                      style={{ width: p.size, height: p.size, background: p.color, marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{ x: p.x, y: p.y, opacity: [0, 1, 1, 0], scale: [0, 1.3, 1, 0.5] }}
                      transition={{ duration: 2, delay: 1.9 + p.delay, ease: RISE }}
                    />
                  ))}
                </div>
              )}

              <motion.span
                className="inline-block text-4xl sm:text-5xl"
                style={{ transformOrigin: '70% 70%' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, rotate: [0, 18, -10, 18, -6, 12, 0] }}
                transition={{ opacity: { delay: 1.3 }, scale: { delay: 1.3, type: 'spring', stiffness: 260, damping: 12 }, rotate: { duration: 1.8, delay: 1.9 } }}
                aria-hidden="true"
              >
                👋
              </motion.span>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl" aria-label={TITLE}>
                {TITLE.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    aria-hidden="true"
                    className="inline-block text-gradient"
                    initial={{ opacity: 0, y: 28, rotateX: -70 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 1.5 + i * 0.045, type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                ))}
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 0.6 }}
                className="mx-auto mt-4 max-w-md text-muted"
              >
                I hope you enjoyed looking around. Let&apos;s build something great together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.6 }}
                className="mt-7 flex flex-wrap items-center justify-center gap-3"
              >
                <a href="#contact" className="btn btn-primary">
                  <Heart className="h-4 w-4" aria-hidden="true" />
                  Let&apos;s connect
                </a>
                <a href="#home" className="btn btn-ghost group">
                  <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                  Back to top
                </a>
              </motion.div>
            </motion.div>

            {/* Glow line along the footer edge, like a launch pad */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-accent-light to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 0.6] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <div className="absolute inset-x-[20%] -top-6 h-12 rounded-full bg-accent/30 blur-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
