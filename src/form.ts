import { useEffect, useState, type FormEvent } from 'react'
export const EMAIL = 'madhan@smconsultancy.nz', PHONE = '+64 22 089 5980', TEL = '+64220895980'
export const go = (id: string) => `#${id.toLowerCase()}`
export const num = (n: number) => String(n + 1).padStart(2, '0')
export type F = { name: string; business: string; email: string; phone: string; service: string; message: string }
const empty: F = { name: '', business: '', email: '', phone: '', service: '', message: '' }
export function validate(v: F) {
  const e: Partial<Record<keyof F, string>> = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone)) e.phone = 'Enter a valid phone number.'
  if (!v.service) e.service = 'Please choose a service.'
  if (v.message.trim().length < 10) e.message = 'Please add a short message (10+ characters).'
  return e
}
export function useContactForm(service: string) {
  const [v, setV] = useState<F>(empty), [err, setErr] = useState<Partial<Record<keyof F, string>>>({}), [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  useEffect(() => { if (service) setV(x => ({ ...x, service })) }, [service])
  const set = (k: keyof F) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value })
  const blur = (k: keyof F) => () => setErr({ ...err, [k]: validate(v)[k] })
  async function submit(ev: FormEvent) {
    ev.preventDefault(); const e = validate(v); setErr(e); if (Object.keys(e).length) return
    setState('loading')
    try { await new Promise(r => setTimeout(r, 900)) /* TODO: replace with real API / form service call */; setState('done') } catch { setState('error') }
  }
  return { v, err, state, set, blur, submit }
}
