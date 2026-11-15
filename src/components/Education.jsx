import { motion } from 'framer-motion'
import { Award, CalendarDays, GraduationCap, School } from 'lucide-react'
import { education } from '../data/portfolio'
import { Reveal, Section } from './ui/Section'
import { stagger } from './ui/motion'

export default function Education() {
  const facts = [
    { icon: School, label: 'University', value: education.university },
    { icon: CalendarDays, label: 'Duration', value: education.duration },
    { icon: GraduationCap, label: 'Graduated', value: education.graduation },
    { icon: Award, label: 'CGPA', value: education.cgpa },
  ]
  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <Reveal className="card relative overflow-hidden p-6 sm:p-10">
        <motion.div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative flex items-start gap-4">
          <motion.span
            initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.2 }}
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent-light"
          >
            <GraduationCap className="h-7 w-7" aria-hidden="true" />
          </motion.span>
          <div>
            <h3 className="font-display text-xl font-semibold sm:text-2xl">{education.degree}</h3>
            <p className="mt-1 text-muted">{education.university}</p>
          </div>
        </div>
        <motion.dl
          className="relative mt-8 grid grid-cols-2 gap-4 border-t border-line pt-8 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger(0.08)}
        >
          {facts.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-line bg-surface-2/60 p-4 transition-colors hover:border-accent/40"
            >
              <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-faint">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </dt>
              <dd className="mt-2 font-display font-semibold text-fg">{value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </Reveal>
    </Section>
  )
}
