import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { projects } from '../data/portfolio'
import { GitHubIcon } from './ui/BrandIcons'
import { Section } from './ui/Section'
import { fadeUp, stagger } from './ui/motion'

/* Stylised UI previews drawn in CSS — lightweight and always available, unlike
   screenshots of the free-tier live demos which sleep when idle. */
function BrowserFrame({ url, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-ink shadow-2xl shadow-black/60">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 truncate rounded-md bg-ink px-2 py-0.5 font-mono text-[10px] text-faint">{url}</span>
      </div>
      <div className="aspect-[16/10] p-3">{children}</div>
    </div>
  )
}

const grow = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function EstatePreview() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-bold text-fg">
          Nest<span className="text-accent-soft">ora</span>
        </span>
        <span className="h-4 w-24 rounded-full border border-line bg-surface-2" />
      </div>
      <div className="relative flex-1 overflow-hidden rounded-lg bg-gradient-to-br from-[#2a1f4a] via-[#16122a] to-[#0d0d16]">
        <motion.svg
          viewBox="0 0 200 80"
          className="absolute bottom-0 h-3/4 w-full origin-bottom"
          preserveAspectRatio="none"
          aria-hidden="true"
          variants={grow}
        >
          <path d="M0 80 V48 h22 V30 h18 v18 h14 V20 l18 -10 18 10 v28 h16 V36 h24 v44 Z" fill="rgb(139 92 246 / 0.25)" />
          <path d="M120 80 V40 h20 V26 h22 v54 Z M168 80 V44 h32 v36 Z" fill="rgb(139 92 246 / 0.15)" />
        </motion.svg>
        <div className="absolute left-3 top-3 space-y-1">
          <div className="h-2 w-28 rounded bg-white/70" />
          <div className="h-1.5 w-20 rounded bg-white/30" />
        </div>
        <div className="absolute bottom-2.5 left-3 flex gap-1.5">
          {['Rent', 'Sale', 'Furnished'].map((t) => (
            <span key={t} className="rounded bg-ink/70 px-1.5 py-0.5 font-mono text-[8px] text-accent-light">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-line bg-surface-2 p-1.5">
            <div className={`h-6 rounded ${['bg-accent/30', 'bg-accent/15', 'bg-white/10'][i]}`} />
            <div className="mt-1.5 h-1 w-3/4 rounded bg-white/30" />
            <div className="mt-1 h-1 w-1/2 rounded bg-accent-soft/60" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ShopPreview() {
  return (
    <div className="grid h-full grid-cols-[1fr_0.55fr] gap-2.5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-display text-[11px] font-bold text-fg">Store</span>
          <span className="flex items-center gap-1 rounded-full bg-accent/20 px-1.5 py-0.5 font-mono text-[8px] text-accent-light">cart · 3</span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col rounded-md border border-line bg-surface-2 p-1">
              <div className={`flex-1 rounded ${i % 3 === 0 ? 'bg-accent/30' : i % 3 === 1 ? 'bg-white/10' : 'bg-accent/15'}`} />
              <div className="mt-1 h-1 w-2/3 rounded bg-white/30" />
              <div className="mt-0.5 h-1 w-1/3 rounded bg-accent-soft/70" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-line bg-surface-2 p-2">
        <span className="font-mono text-[8px] uppercase tracking-wider text-faint">Admin · Sales</span>
        <motion.div className="flex flex-1 items-end gap-1" variants={stagger(0.08)}>
          {[40, 65, 50, 80, 60, 95].map((h, i) => (
            <motion.div
              key={i}
              variants={grow}
              className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-accent/40 to-accent-soft/80"
              style={{ height: `${h}%` }}
            />
          ))}
        </motion.div>
        <div className="rounded bg-accent py-1 text-center font-mono text-[8px] text-white">Checkout</div>
      </div>
    </div>
  )
}

const previews = { estate: EstatePreview, shop: ShopPreview }

/** Preview that tilts toward the cursor. */
function TiltPreview({ children }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 20 })
  return (
    <div
      className="[perspective:1000px]"
      onPointerMove={(e) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry }}>{children}</motion.div>
    </div>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected full-stack work"
      intro="Two MERN applications built end to end — authentication, REST APIs, data modelling, media uploads and deployment."
    >
      <div className="space-y-8">
        {projects.map((p, idx) => {
          const Preview = previews[p.preview]
          const host = p.live.replace('https://', '')
          return (
            <motion.article
              key={p.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="card card-hover group grid overflow-hidden lg:grid-cols-2"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, x: idx % 2 ? 40 : -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08, delayChildren: 0.3 } } }}
                className={`relative overflow-hidden border-b border-line bg-gradient-to-br from-accent/[0.12] via-transparent to-transparent p-6 sm:p-10 lg:border-b-0 ${idx % 2 ? 'lg:order-2 lg:border-l' : 'lg:border-r'}`}
              >
                <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
                <div className="relative">
                  <TiltPreview>
                    <BrowserFrame url={host}>
                      <Preview />
                    </BrowserFrame>
                  </TiltPreview>
                </div>
              </motion.div>

              <motion.div className="flex flex-col p-6 sm:p-10" variants={stagger(0.06)}>
                <motion.p variants={fadeUp} className="font-mono text-xs uppercase tracking-[0.18em] text-accent-soft">
                  {p.kind}
                </motion.p>
                <motion.h3 variants={fadeUp} className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                  {p.name}
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-3 text-[15px] leading-relaxed text-muted">
                  {p.summary}
                </motion.p>

                <ul className="mt-5 space-y-2">
                  {p.features.map((f) => (
                    <motion.li key={f} variants={fadeUp} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" aria-hidden="true" />
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.stack.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} className="mt-auto flex flex-wrap gap-3 pt-8">
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary group/btn">
                    Live Demo
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                    <span className="sr-only">(opens {p.name} in a new tab)</span>
                  </a>
                  <a href={p.source} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <GitHubIcon className="h-4 w-4" />
                    Source Code
                    <span className="sr-only">(opens GitHub repository in a new tab)</span>
                  </a>
                </motion.div>
                <p className="mt-3 text-xs text-faint">Hosted on Render&apos;s free tier — the first load may take a few seconds to wake up.</p>
              </motion.div>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
