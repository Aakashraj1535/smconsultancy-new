import { useEffect, useRef, useState } from 'react'
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null); const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return [ref, shown] as const
}
export function useActive(ids: string[]) {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach(id => { const el = document.getElementById(id); el && io.observe(el) }); return () => io.disconnect()
  }, [])
  return active
}
export function useScrolled(px: number) {
  const [s, set] = useState(false)
  useEffect(() => { const f = () => set(scrollY > px); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return s
}
