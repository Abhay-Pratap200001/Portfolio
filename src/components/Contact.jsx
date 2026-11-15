import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Copy, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/portfolio'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'
import { Reveal, Section } from './ui/Section'
import { fadeUp, stagger } from './ui/motion'

const channels = [
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref, copy: profile.phone },
  { icon: LinkedInIcon, label: 'LinkedIn', value: 'in/abhaypratap006', href: profile.linkedin, external: true },
  { icon: GitHubIcon, label: 'GitHub', value: 'Abhay-Pratap200001', href: profile.github, external: true },
]

export default function Contact() {
  const [copied, setCopied] = useState('')

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(''), 1800)
    } catch {
      /* clipboard unavailable — the link itself still works */
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      intro="I'm looking for MERN, full-stack and React/Next.js developer roles. Whether you have an opportunity or a question, my inbox is open."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Email call-to-action */}
        <Reveal className="card relative overflow-hidden p-6 sm:p-10">
          <motion.div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative">
            <motion.span
              className="grid h-14 w-14 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent-light"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Mail className="h-6 w-6" aria-hidden="true" />
            </motion.span>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-faint">Email me at</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 block font-display text-xl font-semibold tracking-tight text-fg transition-colors [overflow-wrap:anywhere] hover:text-accent-light sm:text-3xl xl:text-4xl"
            >
              {profile.email}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-primary group">
                Send an email
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <button type="button" onClick={() => copy(profile.email)} className="btn btn-ghost">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied === profile.email ? 'done' : 'copy'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-2"
                  >
                    {copied === profile.email ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" /> Copy email
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? 'Copied to clipboard' : ''}
              </span>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent-soft" aria-hidden="true" />
              Based in {profile.location}
            </p>
          </div>
        </Reveal>

        {/* Other channels */}
        <motion.div
          className="space-y-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger(0.1)}
        >
          {channels.map(({ icon: Icon, label, value, href, external, copy: copyText }) => (
            <motion.div key={label} variants={fadeUp} whileHover={{ x: 4 }} className="card card-hover group flex items-center gap-4 p-4 sm:p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-surface-2 text-accent-light transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-faint">{label}</p>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block truncate text-[15px] text-fg transition-colors hover:text-accent-light"
                >
                  {value}
                  {external && <span className="sr-only"> (opens in new tab)</span>}
                </a>
              </div>
              {copyText ? (
                <button type="button" onClick={() => copy(copyText)} className="icon-btn !h-9 !w-9" aria-label={`Copy ${label.toLowerCase()}`}>
                  {copied === copyText ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              ) : (
                <ArrowUpRight className="h-4 w-4 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-light" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
