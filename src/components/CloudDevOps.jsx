import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Box, Cloud, Code2, FolderGit2, Globe, HardDrive, Laptop, Server, Shield, Users } from 'lucide-react'
import { GitHubIcon } from './ui/BrandIcons'
import { cloudProjects } from '../data/portfolio'
import { Section } from './ui/Section'
import { fadeUp, stagger } from './ui/motion'

const flows = {
  ec2: [
    { icon: Users, label: 'Users' },
    { icon: Shield, label: 'Security Group' },
    { icon: Globe, label: 'Nginx :80' },
    { icon: Box, label: 'Docker app' },
  ],
  amplify: [
    { icon: Code2, label: 'git push' },
    { icon: GitHubIcon, label: 'GitHub' },
    { icon: Cloud, label: 'Amplify build' },
    { icon: Globe, label: 'Live site' },
  ],
  s3: [
    { icon: Laptop, label: 'Local files' },
    { icon: FolderGit2, label: 'Upload' },
    { icon: HardDrive, label: 'S3 bucket' },
    { icon: Shield, label: 'Access policy' },
  ],
}

const containerLabel = { ec2: 'AWS EC2 · Ubuntu', amplify: 'AWS Amplify', s3: 'Amazon S3' }

const node = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 18 } },
}
const link = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

function FlowDiagram({ type }) {
  const nodes = flows[type]
  return (
    <motion.figure
      className="relative rounded-xl border border-line bg-ink/60 p-4"
      aria-label={`Architecture: ${nodes.map((n) => n.label).join(' to ')}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={stagger(0.12)}
    >
      <figcaption className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-faint">
        <Server className="h-3 w-3" aria-hidden="true" />
        {containerLabel[type]}
      </figcaption>
      <div className="flex items-center justify-between gap-1">
        {nodes.map((n, i) => {
          const Icon = n.icon
          return (
            <Fragment key={n.label}>
              <motion.div variants={node} className="flex min-w-0 flex-col items-center gap-1.5 text-center">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong bg-surface-2 text-accent-light">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="max-w-[4.5rem] font-mono text-[9.5px] leading-tight text-muted">{n.label}</span>
              </motion.div>
              {i < nodes.length - 1 && (
                <motion.div variants={link} className="relative mb-5 h-px flex-1 origin-left overflow-hidden bg-line-strong" aria-hidden="true">
                  <motion.span
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-accent-soft to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: i * 0.35 }}
                  />
                </motion.div>
              )}
            </Fragment>
          )
        })}
      </div>
    </motion.figure>
  )
}

export default function CloudDevOps() {
  return (
    <Section
      id="cloud"
      eyebrow="Cloud & DevOps"
      title="Cloud & DevOps experience"
      intro="Hands-on deployment work on AWS — containerising apps, configuring servers and automating frontend releases."
    >
      <motion.div
        className="grid gap-5 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger(0.12)}
      >
        {cloudProjects.map((c, i) => (
          <motion.article key={c.title} variants={fadeUp} whileHover={{ y: -6 }} className="card card-hover flex flex-col p-6">
            <span className="font-mono text-xs text-accent-soft">0{i + 1}</span>
            <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{c.title}</h3>
            <div className="mt-5">
              <FlowDiagram type={c.diagram} />
            </div>
            <ul className="mt-5 space-y-2.5">
              {c.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent-soft" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {c.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
