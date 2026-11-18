import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Download, MapPin, Send } from 'lucide-react'
import { profile, resume } from '../data/portfolio'
import { useResumeStatus } from './ui/useResume'
import CodeBackdrop from './CodeBackdrop'
import { GitHubIcon, LinkedInColorIcon, WhatsAppIcon } from './ui/BrandIcons'
import portrait from '../assets/abhay-pratap.webp'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

/* ---------- Heading: letters appear one by one ---------- */
const LETTER_START = 0.35 // seconds before the first letter
const LETTER_STEP = 0.12 // gap between letters (seconds)

// Each letter of the name gets its own shade, running light violet → violet →
// soft violet, so the name still reads as a gradient once the letters land.
const NAME_COLORS = (() => {
  const stops = [
    [237, 233, 254], // near-white violet
    [196, 181, 253], // accent-light
    [139, 92, 246], // accent
    [167, 139, 250], // accent-soft
  ]
  const n = 11
  return Array.from({ length: n }, (_, i) => {
    const t = (i / (n - 1)) * (stops.length - 1)
    const a = stops[Math.floor(t)]
    const b = stops[Math.min(stops.length - 1, Math.floor(t) + 1)]
    const f = t - Math.floor(t)
    const c = a.map((v, k) => Math.round(v + (b[k] - v) * f))
    return `rgb(${c.join(' ')})`
  })
})()

const letterVariants = {
  hidden: { opacity: 0, y: '0.55em', rotateX: -90, filter: 'blur(8px)' },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { delay: LETTER_START + i * LETTER_STEP, type: 'spring', stiffness: 110, damping: 16, mass: 1.2 },
  }),
}

/** A word whose letters drop in one at a time; each letter hops on hover. */
function AnimatedWord({ text, start, colors }) {
  const reduce = useReducedMotion()
  return (
    <span className="inline-block whitespace-nowrap" aria-hidden="true">
      {text.split('').map((ch, i) => (
        // Outer span: one-time entrance. Inner span: playful hop on hover.
        <motion.span
          key={i}
          custom={start + i}
          variants={letterVariants}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="inline-block origin-bottom"
        >
          <motion.span
            whileHover={reduce ? undefined : { y: '-0.12em', scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 500, damping: 14 }}
            className="inline-block cursor-default"
            style={colors ? { color: colors[i] } : undefined}
          >
            {ch}
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}

const roles = ['MERN Stack Developer', 'React.js & Next.js Developer', 'Full Stack Developer', 'Node.js & REST API Developer']

/** Types and deletes each role in turn. */
function TypingRoles() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(reduce ? roles[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const full = roles[index]
    let delay = deleting ? 35 : 70
    if (!deleting && text === full) delay = 1800
    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % roles.length)
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, reduce])

  return (
    <span aria-label={roles[0]}>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block w-[2px] animate-blink self-stretch bg-accent-soft align-[-0.1em]" style={{ height: '1em' }} />
    </span>
  )
}

/** Counts up from 0 when scrolled into view. */
function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, delay: 0.8, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

function PortraitCard() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 150, damping: 18 })
  const glareX = useTransform(mx, [-0.5, 0.5], ['20%', '80%'])
  const glare = useTransform(glareX, (x) => `radial-gradient(circle at ${x} 0%, rgba(255,255,255,0.45), transparent 55%)`)

  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[200px] sm:max-w-[272px] lg:max-w-[304px] xl:max-w-[344px] [perspective:1200px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* Orbit rings */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-8 sm:-inset-10">
        <div className="absolute inset-0 animate-orbit rounded-full border border-dashed border-accent/25" />
        <div className="absolute inset-6 animate-orbit-rev rounded-full border border-line">
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft shadow-[0_0_16px_4px_rgb(139_92_246/0.6)]" />
        </div>
      </div>
      {/* Breathing glow */}
      <div aria-hidden="true" className="absolute inset-6 -z-10 animate-breathe rounded-[2rem] bg-accent/30 blur-3xl" />

      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="relative">
        <div className="card overflow-hidden !rounded-[1.75rem] p-2">
          <div className="relative overflow-hidden rounded-[1.35rem]">
            <motion.img
              src={portrait}
              alt="Portrait of Abhay Pratap"
              width="637"
              height="727"
              fetchPriority="high"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/5] w-full object-cover object-[50%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent" />
            <motion.div aria-hidden="true" className="absolute inset-0 opacity-60 mix-blend-soft-light" style={{ background: glare }} />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-end gap-3 sm:inset-x-4 sm:bottom-4 sm:justify-between" style={{ transform: 'translateZ(40px)' }}>
              <div className="hidden sm:block">
                <p className="font-display text-lg font-semibold leading-tight">Abhay Pratap</p>
                <p className="font-mono text-[11px] text-accent-light">MERN · Next.js · AWS</p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Open to work
              </span>
            </div>
          </div>
        </div>

        {/* Floating chips */}
        <div
          style={{ transform: 'translateZ(60px)' }}
          className="card absolute -left-6 top-10 hidden animate-bob items-center gap-2 !rounded-xl px-3 py-2 font-mono text-[11px] text-muted sm:flex"
        >
          <span className="text-accent-soft">&lt;/&gt;</span> React · Next.js
        </div>
        <div
          style={{ transform: 'translateZ(60px)' }}
          className="card absolute -right-6 top-1/2 hidden animate-bob-down items-center gap-2 !rounded-xl px-3 py-2 font-mono text-[11px] text-muted sm:flex"
        >
          <span className="text-accent-soft">$</span> docker compose up
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const resumeReady = useResumeStatus() === 'ready'
  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <CodeBackdrop />
        {/* Static soft glows (drifting huge blurs were costly to redraw every frame) */}
        <div className="absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute -left-24 bottom-10 h-[320px] w-[320px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8 xl:gap-20 xl:px-12">
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
          <motion.p variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 text-accent-soft" aria-hidden="true" />
            {profile.location}
          </motion.p>

          <h1
            aria-label="Hi, I'm Abhay Pratap"
            className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight [perspective:800px] sm:text-6xl lg:text-7xl 2xl:text-8xl"
          >
            <AnimatedWord text="Hi," start={0} />{' '}
            <AnimatedWord text="I'm" start={3} />{' '}
            {/* The wave pops in after "Hi, I'm", then waves */}
            <motion.span
              className="inline-block"
              initial={reduce ? false : { opacity: 0, scale: 0, rotate: -40 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1, rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{
                opacity: { delay: LETTER_START + 6 * LETTER_STEP, duration: 0.2 },
                scale: { delay: LETTER_START + 6 * LETTER_STEP, type: 'spring', stiffness: 300, damping: 12 },
                rotate: { delay: LETTER_START + 6 * LETTER_STEP + 0.3, duration: 1.8, ease: 'easeInOut' },
              }}
              style={{ transformOrigin: '70% 70%' }}
              aria-hidden="true"
            >
              👋
            </motion.span>{' '}
            <AnimatedWord text="Abhay" start={8} colors={NAME_COLORS.slice(0, 5)} />{' '}
            <AnimatedWord text="Pratap" start={13} colors={NAME_COLORS.slice(5)} />
          </h1>

          <motion.p variants={item} className="mt-5 min-h-[2em] font-display text-xl font-medium text-fg/90 sm:text-2xl">
            <TypingRoles />
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary group">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-ghost group">
              <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              Contact Me
            </a>
            {resumeReady && (
              <a href={resume.file} download={resume.downloadName} className="btn btn-ghost group">
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                Download Resume
              </a>
            )}
            {/* Social links in their real brand colours */}
            <div className="ml-1 flex items-center gap-2.5">
              {[
                { href: profile.github, label: 'GitHub profile', glow: '#ffffff', icon: <GitHubIcon className="h-6 w-6 text-white" /> },
                { href: profile.linkedin, label: 'LinkedIn profile', glow: '#0A66C2', icon: <LinkedInColorIcon className="h-6 w-6" /> },
                { href: profile.whatsapp, label: 'Chat on WhatsApp', glow: '#25D366', icon: <WhatsAppIcon className="h-6 w-6" color="#25D366" /> },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in new tab)`}
                  title={s.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 transition-[border-color,box-shadow] duration-300"
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 24px -6px ${s.glow}88`)}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.dl variants={item} className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              [2, '', 'Internships'],
              [100, '+', 'UI components shipped'],
              [3, '', 'Cloud projects on AWS'],
              [11, '', 'Full Stack Projects'],
            ].map(([n, s, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-2xl font-semibold text-fg sm:text-3xl">
                  <CountUp to={n} suffix={s} />
                </dd>
                <dd className="mt-1 text-xs leading-snug text-faint">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="order-1 lg:order-2 lg:self-start lg:pt-10">
          <PortraitCard />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-line-strong pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent-soft"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
