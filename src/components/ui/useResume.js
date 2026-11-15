import { useEffect, useState } from 'react'
import { resume } from '../../data/portfolio'

let cached = null

/**
 * Checks once whether the resume PDF actually exists, so buttons never point
 * at a missing file. (Dev servers and SPA hosts answer missing paths with the
 * HTML page, so we check the content type rather than the status code.)
 * Returns 'loading' | 'ready' | 'missing'.
 */
export function useResumeStatus() {
  const [status, setStatus] = useState(cached ?? 'loading')
  useEffect(() => {
    if (cached) return
    let alive = true
    fetch(resume.file, { method: 'HEAD' })
      .then((r) => (r.ok && (r.headers.get('content-type') || '').includes('pdf') ? 'ready' : 'missing'))
      .catch(() => 'missing')
      .then((s) => {
        cached = s
        if (alive) setStatus(s)
      })
    return () => {
      alive = false
    }
  }, [])
  return status
}
