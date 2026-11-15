// Infinite scrolling strip of technologies between the hero and About.
const items = ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'REST APIs', 'Tailwind CSS', 'Docker', 'AWS EC2', 'AWS Amplify', 'AWS S3', 'Nginx', 'Git & GitHub', 'Postman']

export default function TechMarquee() {
  const row = [...items, ...items]
  return (
    <div className="relative border-y border-line bg-surface/40 py-5" aria-label="Technologies I work with">
      <ul className="sr-only">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="mask-fade-x overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium text-muted/80 sm:text-xl">
              {t}
              <span className="text-accent-soft">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
