import { ArrowUp, Mail } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="font-display text-xl font-semibold">
              Abhay <span className="text-accent-soft">Pratap</span>
            </a>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              MERN Stack Developer building responsive, scalable web applications with React, Next.js, Node.js and the cloud.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub (opens in new tab)">
                <GitHubIcon className="h-4.5 w-4.5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn (opens in new tab)">
                <LinkedInIcon className="h-4.5 w-4.5" />
              </a>
              <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Send an email">
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm sm:grid-cols-4 md:grid-cols-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>© {YEAR} Abhay Pratap. All rights reserved.</p>
          <a href="#home" className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
