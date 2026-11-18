import { motion } from 'framer-motion'
import { Boxes, Code2, MapPin, Rocket, Sparkles, Workflow } from 'lucide-react'
import { about, profile } from '../data/portfolio'
import workPhoto from '../assets/abhay-laptop.webp'
import { Reveal, Section } from './ui/Section'
import { fadeUp, stagger } from './ui/motion'

const strengthIcons = [Code2, Boxes, Workflow, Rocket]

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title="Building for the web, end to end.">
      {/* Photo column is capped at ~340px so the image is shown near its native
          size (it's 385px wide) and stays sharp instead of being stretched. */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr]">
        {/* Photo — shown immediately (no scroll pop-in) */}
        <div className="mx-auto w-full max-w-[290px] md:sticky md:top-24 md:row-span-2 md:max-w-none md:self-start">
          <figure className="card group relative overflow-hidden p-2">
            {/* Uses the photo's own proportions (357 × 622) so the whole picture,
                laptop included, is shown with nothing cropped. */}
            <div className="relative aspect-[357/622] overflow-hidden rounded-[1rem]">
              <img
                src={workPhoto}
                alt="Abhay Pratap working on his laptop"
                width="357"
                height="622"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Corner frame accents */}
              <span aria-hidden="true" className="absolute left-3 top-3 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-accent-soft/70 transition-all duration-500 group-hover:h-10 group-hover:w-10" />
              <span aria-hidden="true" className="absolute bottom-3 right-3 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-accent-soft/70 transition-all duration-500 group-hover:h-10 group-hover:w-10" />
            </div>
            {/* Caption sits under the photo so it doesn't cover the laptop */}
            <figcaption className="px-3 pb-2 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-light">Currently</p>
              <p className="mt-1 font-display text-lg font-semibold leading-snug">Building with React, Next.js &amp; Node.js</p>
            </figcaption>
          </figure>
        </div>

        <Reveal className="card p-6 sm:p-8">
          <div className="space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6 text-sm">
            <span className="inline-flex items-center gap-2 text-fg">
              <MapPin className="h-4 w-4 text-accent-soft" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
            <span className="text-muted">Open to full-time roles &amp; internships</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="card p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Sparkles className="h-4 w-4 text-accent-soft" aria-hidden="true" />
            Development interests
          </h3>
          <motion.ul
            className="mt-5 space-y-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger(0.08)}
          >
            {about.interests.map((i) => (
              <motion.li
                key={i}
                variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                className="flex items-start gap-3 text-[15px] text-muted"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" aria-hidden="true" />
                {i}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
      </div>

      <motion.ul
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger(0.08)}
        aria-label="Technical strengths"
      >
        {about.strengths.map((s, idx) => {
          const Icon = strengthIcons[idx % strengthIcons.length]
          return (
            <motion.li key={s.title} variants={fadeUp} whileHover={{ y: -6 }} className="card card-hover group p-5">
              <motion.span
                className="grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent-light transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </motion.span>
              <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
            </motion.li>
          )
        })}
      </motion.ul>
    </Section>
  )
}
