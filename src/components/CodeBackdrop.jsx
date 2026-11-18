import { motion } from 'framer-motion'

/*
 * Faded, tilted code snippet behind the hero text — the "code in the
 * background" look. Decorative only, so it's hidden from screen readers.
 */
const k = 'text-accent-soft' // keywords
const s = 'text-emerald-300/80' // strings
const p = 'text-sky-300/80' // properties
const f = 'text-amber-200/80' // functions
const c = 'text-faint' // comments

const lines = [
  [[c, '// hello, recruiter 👋']],
  [[k, 'const '], ['', 'developer = {']],
  [[p, '  name'], ['', ': '], [s, '"Abhay Pratap"'], ['', ',']],
  [[p, '  role'], ['', ': '], [s, '"MERN Stack Developer"'], ['', ',']],
  [[p, '  stack'], ['', ': ['], [s, '"React"'], ['', ', '], [s, '"Next.js"'], ['', ', '], [s, '"Node.js"'], ['', ', '], [s, '"MongoDB"'], ['', '],']],
  [[p, '  cloud'], ['', ': ['], [s, '"AWS"'], ['', ', '], [s, '"Docker"'], ['', ', '], [s, '"Nginx"'], ['', '],']],
  [[p, '  location'], ['', ': '], [s, '"Lucknow, India"'], ['', ',']],
  [[p, '  openToWork'], ['', ': '], [k, 'true'], ['', ',']],
  [['', '};']],
  [['', '']],
  [[k, 'async function '], [f, 'shipFeature'], ['', '(idea) {']],
  [[k, '  const '], ['', 'ui = '], [k, 'await '], [f, 'buildComponents'], ['', '(idea);']],
  [[k, '  const '], ['', 'api = '], [k, 'await '], [f, 'connectRestApi'], ['', '(ui);']],
  [[k, '  return '], [f, 'deploy'], ['', '(api, { to: '], [s, '"aws"'], ['', ' });']],
  [['', '}']],
  [['', '']],
  [[f, 'shipFeature'], ['', '('], [s, '"your next product"'], ['', ');']],
]

export default function CodeBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-8%] top-20 hidden select-none [perspective:1200px] md:block lg:left-[26%] lg:right-auto lg:top-8"
    >
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="font-mono text-[13px] leading-7 opacity-0 [transform:rotateX(18deg)_rotateY(-22deg)_rotateZ(-6deg)] lg:text-sm lg:leading-8"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 65% at 45% 45%, rgba(0,0,0,0.42), transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 45% 45%, rgba(0,0,0,0.42), transparent 75%)',
        }}
      >
        {lines.map((line, i) => (
          <div key={i}>
            <span className="mr-5 inline-block w-5 text-right text-faint/60">{i + 1}</span>
            {line.map(([cls, text], j) => (
              <span key={j} className={cls || 'text-muted'}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </motion.pre>
    </div>
  )
}
