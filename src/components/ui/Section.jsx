import { motion } from 'framer-motion'
import { fadeUp, stagger } from './motion'

/** Wraps children in a scroll-triggered reveal. */
export function Reveal({ children, className = '', delay = 0, as = 'div', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: fadeUp.hidden,
        show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

const word = {
  hidden: { opacity: 0, y: '0.6em', rotateX: -40 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Section({ id, eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.header
          className="mb-12 max-w-2xl sm:mb-16 xl:max-w-3xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.1)}
        >
          <motion.p variants={fadeUp} className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
            <motion.span
              className="h-px w-8 origin-left bg-accent-soft/60"
              aria-hidden="true"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut' } } }}
            />
            {eyebrow}
          </motion.p>
          {/* Title animates in word by word */}
          <motion.h2
            id={`${id}-title`}
            aria-label={title}
            variants={stagger(0.06)}
            className="font-display text-3xl font-semibold tracking-tight [perspective:600px] sm:text-4xl"
          >
            {title.split(' ').map((w, i) => (
              <motion.span key={i} variants={word} aria-hidden="true" className="mr-[0.25em] inline-block origin-bottom">
                {w}
              </motion.span>
            ))}
          </motion.h2>
          {intro && (
            <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-muted">
              {intro}
            </motion.p>
          )}
        </motion.header>
        {children}
      </div>
    </section>
  )
}
