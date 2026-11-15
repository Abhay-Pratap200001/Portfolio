import { motion } from 'framer-motion'
import { Download, Eye, FileText, Loader2 } from 'lucide-react'
import { resume } from '../data/portfolio'
import { Reveal, Section } from './ui/Section'
import { useResumeStatus } from './ui/useResume'

const highlights = ['2 software developer internships', 'MERN & Next.js projects with live demos', 'AWS, Docker & Nginx deployments', 'One page · PDF']

/** "View" opens the PDF in a new tab; "Download" saves it with a clean file name. */
export function ResumeButtons({ className = '', size = 'md' }) {
  const small = size === 'sm'
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={resume.file} target="_blank" rel="noopener noreferrer" className={`btn btn-primary group ${small ? '!px-4 !py-2 text-sm' : ''}`}>
        <Eye className="h-4 w-4" aria-hidden="true" />
        View Resume
        <span className="sr-only">(opens PDF in a new tab)</span>
      </a>
      <a href={resume.file} download={resume.downloadName} className={`btn btn-ghost group ${small ? '!px-4 !py-2 text-sm' : ''}`}>
        <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
        Download Resume
        <span className="sr-only">(PDF)</span>
      </a>
    </div>
  )
}

// Browsers without a built-in PDF viewer get the buttons instead of a blank frame.
const canEmbed = typeof navigator === 'undefined' || navigator.pdfViewerEnabled !== false

export default function Resume() {
  const status = useResumeStatus()

  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="My resume, at a glance"
      intro="Read it right here, open it in a new tab, or download a copy for later."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        {/* Summary + actions */}
        <Reveal className="card flex flex-col p-6 sm:p-8">
          <motion.span
            className="grid h-14 w-14 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent-light"
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FileText className="h-6 w-6" aria-hidden="true" />
          </motion.span>
          <h3 className="mt-6 font-display text-2xl font-semibold">Abhay Pratap — MERN Stack Developer</h3>
          <ul className="mt-5 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[15px] text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            {status === 'ready' && <ResumeButtons />}
            {status === 'loading' && (
              <p className="flex items-center gap-2 text-sm text-muted">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading resume…
              </p>
            )}
            {status === 'missing' && (
              <p className="rounded-xl border border-dashed border-line-strong p-4 text-sm text-muted">
                The resume PDF is being updated. Meanwhile, you can reach me through the Contact section below.
              </p>
            )}
          </div>
        </Reveal>

        {/* Embedded viewer (desktop). Phones can't render PDFs inline reliably, so they get the buttons instead. */}
        <Reveal delay={0.1} className="card overflow-hidden p-2">
          <div className="flex items-center justify-between gap-3 border-b border-line px-3 pb-2 pt-1">
            <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-faint">
              <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{resume.downloadName}</span>
            </span>
            {status === 'ready' && (
              <a href={resume.file} download={resume.downloadName} className="btn btn-ghost shrink-0 !rounded-lg !px-3 !py-1.5 text-xs">
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Download Resume
              </a>
            )}
          </div>

          {status === 'ready' ? (
            <>
              {canEmbed && (
                <iframe
                  src={`${resume.file}#view=FitH&toolbar=1&navpanes=0`}
                  title="Abhay Pratap resume (PDF)"
                  loading="lazy"
                  className="hidden h-[820px] w-full rounded-b-xl bg-white lg:block"
                />
              )}
              <div className={`grid place-items-center gap-4 px-6 py-14 text-center ${canEmbed ? 'lg:hidden' : ''}`}>
                <FileText className="h-12 w-12 text-accent-soft" aria-hidden="true" />
                <p className="max-w-xs text-sm text-muted">Tap below to read the full resume in your browser or save it to your device.</p>
                <ResumeButtons className="justify-center" />
              </div>
            </>
          ) : (
            <div className="grid min-h-[320px] place-items-center px-6 py-14 text-center lg:min-h-[820px]">
              <div className="space-y-4">
                <FileText className="mx-auto h-12 w-12 text-faint" aria-hidden="true" />
                <p className="text-sm text-faint">{status === 'loading' ? 'Loading preview…' : 'Preview will appear here once the resume is uploaded.'}</p>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  )
}
