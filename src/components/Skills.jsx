import { motion } from 'framer-motion'
import { Cloud, Database, Layout, Server, Wrench } from 'lucide-react'
import { skillGroups } from '../data/portfolio'
import { Section } from './ui/Section'
import { fadeUp, stagger } from './ui/motion'

const icons = { Layout, Server, Database, Cloud, Wrench }

const pop = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 20 } },
}

function SkillChip({ name, level }) {
  const practical = level === 'practical'
  return (
    <motion.li
      variants={pop}
      whileHover={{ y: -3, scale: 1.05 }}
      className={`inline-flex cursor-default items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
        practical
          ? 'border-accent/35 bg-accent/10 text-fg hover:border-accent-soft'
          : 'border-dashed border-line-strong bg-transparent text-muted hover:text-fg'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${practical ? 'bg-accent-soft' : 'border border-faint'}`} aria-hidden="true" />
      {name}
      <span className="sr-only">{practical ? '(used in projects)' : '(explored)'}</span>
    </motion.li>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical skills"
      title="Tools I build with"
      intro="An honest view of my stack: solid chips are technologies I've used in internships or projects; dashed chips are ones I've studied and practised hands-on while learning."
    >
      <div className="mb-8 flex flex-wrap gap-5 text-sm text-muted" aria-hidden="true">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-5 rounded border border-accent/40 bg-accent/15" /> Used in projects / internships
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-5 rounded border border-dashed border-line-strong" /> Studied &amp; explored
        </span>
      </div>

      <motion.div
        className="grid gap-5 md:grid-flow-dense md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger(0.08)}
      >
        {skillGroups.map((g) => {
          const Icon = icons[g.icon]
          return (
            <motion.div
              key={g.title}
              variants={fadeUp}
              className={`card card-hover group p-6 ${g.title === 'Cloud & DevOps' ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong bg-surface-2 text-accent-light transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              </div>
              <motion.ul
                className="mt-5 flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                variants={stagger(0.04)}
              >
                {g.skills.map((s) => (
                  <SkillChip key={s.name} {...s} />
                ))}
              </motion.ul>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
