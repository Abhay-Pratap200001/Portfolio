import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Download, MapPin, Send } from 'lucide-react'
import { profile, resume } from '../data/portfolio'
import { useResumeStatus } from './ui/useResume'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'
import portrait from '../assets/abhay-pratap.webp'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
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
      className="relative mx-auto w-full max-w-[250px] sm:max-w-[340px] lg:max-w-[380px] xl:max-w-[430px] [perspective:1200px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* Orbit rings */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-8 sm:-inset-10">
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-accent/25"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-6 rounded-full border border-line"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft shadow-[0_0_16px_4px_rgb(139_92_246/0.6)]" />
        </motion.div>
      </div>
      {/* Breathing glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-6 -z-10 rounded-[2rem] bg-accent/30 blur-3xl"
        animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="relative">
        <div className="card overflow-hidden !rounded-[1.75rem] p-2">
          <div className="relative overflow-hidden rounded-[1.35rem]">
            <motion.img
              src={portrait}
              alt="Portrait of Abhay Pratap"
              width="640"
              height="856"
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
        <motion.div
          style={{ transform: 'translateZ(60px)' }}
          className="card absolute -left-6 top-10 hidden items-center gap-2 !rounded-xl px-3 py-2 font-mono text-[11px] text-muted sm:flex"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-accent-soft">&lt;/&gt;</span> React · Next.js
        </motion.div>
        <motion.div
          style={{ transform: 'translateZ(60px)' }}
          className="card absolute -right-6 top-1/2 hidden items-center gap-2 !rounded-xl px-3 py-2 font-mono text-[11px] text-muted sm:flex"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-accent-soft">$</span> docker compose up
        </motion.div>
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
        <motion.div
          className="absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]"
          animate={reduce ? undefined : { x: ['-50%', '-42%', '-58%', '-50%'], y: [0, 30, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-24 bottom-10 h-[320px] w-[320px] rounded-full bg-fuchsia-500/10 blur-[120px]"
          animate={reduce ? undefined : { x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8 xl:gap-20 xl:px-12">
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
          <motion.p variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur">
            <MapPin className="h-3.5 w-3.5 text-accent-soft" aria-hidden="true" />
            {profile.location}
          </motion.p>

          <motion.h1 variants={item} className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl 2xl:text-8xl">
            Hi, I&apos;m{' '}
            <motion.span
              className="inline-block"
              animate={reduce ? undefined : { rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 1.8, delay: 1.2, ease: 'easeInOut' }}
              style={{ transformOrigin: '70% 70%' }}
              aria-hidden="true"
            >
              👋
            </motion.span>{' '}
            <span className="text-gradient">Abhay Pratap</span>
          </motion.h1>

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
            <div className="ml-1 flex items-center gap-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile (opens in new tab)">
                <GitHubIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile (opens in new tab)">
                <LinkedInIcon />
              </a>
            </div>
          </motion.div>

          <motion.dl variants={item} className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              [2, '', 'Internships'],
              [10, '+', 'UI components shipped'],
              [3, '', 'Cloud projects on AWS'],
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

        <div className="order-1 lg:order-2">
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
