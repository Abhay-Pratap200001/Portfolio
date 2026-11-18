import { useEffect, useMemo, useState } from 'react'
import { siDocker, siGithub, siHtml5, siJavascript, siKubernetes, siNextdotjs, siReact, siTerraform } from 'simple-icons'

/*
 * Tech logos that float slowly around the page behind the content.
 * Performance: all movement is plain CSS keyframe animation on `transform`,
 * which the browser runs on the GPU compositor — no JavaScript runs per frame,
 * so scrolling and the rest of the page stay smooth.
 * - Each icon glides between its own waypoints and gently sways or spins.
 * - pointer-events are off, so they never get in the way of clicks.
 */

function SimpleIcon({ icon, color }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill={color ?? `#${icon.hex}`} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}

// simple-icons no longer ships the AWS logo, so this is a small hand-drawn mark.
function AwsIcon() {
  return (
    <svg viewBox="0 0 48 30" className="h-[55%] w-[66%]" aria-hidden="true">
      <text x="24" y="16" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="16" fill="#ffffff">
        aws
      </text>
      <path d="M8 21 Q24 29 40 21" stroke="#FF9900" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M36 18.5 L41 20.6 L38.6 25" stroke="#FF9900" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Waypoints are percentages of the screen (x = width, y = height). Each icon
// wanders across the whole viewport on a long, slow loop. depth: 0 near, 1 mid, 2 far.
const items = [
  { key: 'react', node: <SimpleIcon icon={siReact} />, glow: '#61DAFB', depth: 0, x: [8, 34, 62, 46, 20], y: [18, 40, 22, 70, 58], dur: 70, spin: true },
  { key: 'next', node: <SimpleIcon icon={siNextdotjs} color="#ffffff" />, glow: '#ffffff', depth: 0, x: [90, 66, 40, 58, 82], y: [14, 36, 18, 60, 44], dur: 78 },
  { key: 'js', node: <SimpleIcon icon={siJavascript} />, glow: '#F7DF1E', depth: 1, x: [70, 48, 24, 10, 36], y: [80, 56, 74, 42, 30], dur: 84 },
  { key: 'html', node: <SimpleIcon icon={siHtml5} />, glow: '#E34F26', depth: 1, x: [30, 52, 78, 88, 60], y: [8, 26, 12, 46, 62], dur: 90 },
  { key: 'aws', node: <AwsIcon />, glow: '#FF9900', depth: 0, x: [56, 80, 92, 72, 44], y: [88, 70, 48, 30, 54], dur: 74 },
  { key: 'github', node: <SimpleIcon icon={siGithub} color="#ffffff" />, glow: '#ffffff', depth: 2, x: [48, 26, 6, 18, 40], y: [6, 20, 44, 76, 88], dur: 100 },
  { key: 'terraform', node: <SimpleIcon icon={siTerraform} />, glow: '#844FBA', depth: 2, x: [20, 8, 28, 52, 38], y: [48, 30, 10, 24, 44], dur: 104 },
  { key: 'docker', node: <SimpleIcon icon={siDocker} />, glow: '#2496ED', depth: 0, x: [36, 60, 84, 70, 50], y: [66, 84, 62, 40, 78], dur: 80 },
  { key: 'k8s', node: <SimpleIcon icon={siKubernetes} />, glow: '#326CE5', depth: 1, x: [78, 94, 72, 50, 64], y: [30, 10, 6, 16, 26], dur: 92, spin: true },
]

const depthStyle = [
  { size: 122, opacity: 0.36 }, // near
  { size: 105, opacity: 0.34 }, // mid
  { size: 91, opacity: 0.31 }, // far
]

// Phones get fewer, smaller icons so the screen stays readable.
const MOBILE_KEYS = ['react', 'next', 'aws', 'docker', 'js']

// Tracks the visible page size so waypoints map onto the real screen.
function useViewport() {
  const read = () =>
    typeof document === 'undefined' ? { w: 1440, h: 860 } : { w: document.documentElement.clientWidth, h: window.innerHeight }
  const [vp, setVp] = useState(read)
  useEffect(() => {
    let t
    const on = () => {
      clearTimeout(t)
      t = setTimeout(() => setVp(read()), 150)
    }
    window.addEventListener('resize', on)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', on)
    }
  }, [])
  return vp
}

const sizeFor = (item, vp) => {
  const d = depthStyle[item.depth]
  return vp.w < 768 ? Math.round(d.size * 0.6) : d.size
}

// One @keyframes rule per icon, built from its waypoints in pixels for the
// current screen, keeping each tile fully on screen.
function buildKeyframes(list, vp) {
  return list
    .map((item) => {
      const size = sizeFor(item, vp)
      const toX = (p) => Math.round(Math.min(vp.w - size - 6, Math.max(6, (p / 100) * vp.w)))
      const toY = (p) => Math.round(Math.min(vp.h - size - 6, Math.max(70, (p / 100) * vp.h)))
      const steps = item.x
        .map((x, i) => {
          const pct = Math.round((i / (item.x.length - 1)) * 100)
          return `${pct}%{transform:translate3d(${toX(x)}px,${toY(item.y[i])}px,0)}`
        })
        .join('')
      return `@keyframes ft-${item.key}{${steps}}`
    })
    .join('\n')
}

const BASE_CSS = `
@keyframes ft-in{from{opacity:0}to{opacity:1}}
@keyframes ft-sway{0%,100%{transform:translateY(0) rotate(-7deg)}50%{transform:translateY(-10px) rotate(7deg)}}
@keyframes ft-spin{to{transform:rotate(360deg)}}
.ft-path,.ft-inner{will-change:transform}
@media (prefers-reduced-motion: reduce){.ft-path,.ft-inner{animation-play-state:paused!important}}
`

function FloatingIcon({ item, vp, index }) {
  const d = depthStyle[item.depth]
  const size = sizeFor(item, vp)
  return (
    // Outer: travels the path and fades in. Inner: sways or spins. Tile: static look.
    <div
      className="ft-path absolute left-0 top-0"
      style={{ animation: `ft-${item.key} ${item.dur}s ease-in-out infinite alternate, ft-in 1.4s ease-out ${0.6 + index * 0.15}s both` }}
    >
      <div className="ft-inner" style={{ animation: item.spin ? 'ft-spin 40s linear infinite' : `ft-sway ${8 + index}s ease-in-out infinite` }}>
        <div
          className="grid place-items-center rounded-[1.1rem] border border-white/[0.07]"
          style={{
            width: size,
            height: size,
            opacity: d.opacity,
            background: 'linear-gradient(160deg, #1b1b25 0%, #121219 60%, #0d0d13 100%)',
            // Lighter shadow stack than before: same lifted look, far cheaper to draw.
            boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.07), 0 16px 32px -12px rgb(0 0 0 / 0.9), 0 0 24px -10px ${item.glow}55`,
          }}
        >
          {item.node}
        </div>
      </div>
    </div>
  )
}

export default function FloatingTech() {
  const vp = useViewport()
  const small = vp.w < 768
  const list = useMemo(() => (small ? items.filter((i) => MOBILE_KEYS.includes(i.key)) : items), [small])
  const css = useMemo(() => BASE_CSS + buildKeyframes(list, vp), [list, vp])

  return (
    // Behind the page content (-z-10). pointer-events are off so they never block clicks.
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <style>{css}</style>
      {list.map((item, i) => (
        <FloatingIcon key={item.key} item={item} index={i} vp={vp} />
      ))}
    </div>
  )
}
