import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, CalendarDays, Check } from 'lucide-react'
import { experience } from '../data/portfolio'
import { Section } from './ui/Section'
import { fadeUp, stagger } from './ui/motion'

export default function Experience() {
  const listRef = useRef(null)
  // The timeline line draws itself as you scroll through the section.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Internship experience"
      intro="Hands-on work on production web applications — shipping UI, integrating APIs and collaborating in team workflows."
    >
      <ol ref={listRef} className="relative space-y-8 sm:space-y-10">
        <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-px bg-line" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: lineScale }}
          className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-accent-light via-accent to-accent/20"
        />
        {experience.map((job) => (
          <motion.li
            key={job.company}
            className="relative pl-12 sm:pl-14"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-xl border border-accent/40 bg-surface text-accent-light shadow-[0_0_0_6px_var(--color-ink)]"
            >
              <Briefcase className="h-4.5 w-4.5" aria-hidden="true" />
            </motion.span>

            <article className="card card-hover p-5 sm:p-8">
              <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{job.company}</h3>
                  <p className="mt-1 text-accent-light">{job.role}</p>
                  <p className="mt-1 text-sm text-faint">{job.domain}</p>
                </div>
                <p className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {job.period}
                </p>
              </header>

              <motion.ul
                className="mt-6 grid gap-3 md:grid-cols-2 md:gap-x-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={stagger(0.06)}
              >
                {job.points.map((p) => (
                  <motion.li
                    key={p}
                    variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                    className="flex gap-3 text-[15px] leading-relaxed text-muted"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent-soft" aria-hidden="true" />
                    <span>{p}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5" aria-label="Technologies used">
                {job.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
