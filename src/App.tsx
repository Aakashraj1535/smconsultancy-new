import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ArrowUp, BadgeCheck, Check, ChevronDown, Clock, Globe, Loader2, Lock, Mail, Menu, Phone, ShieldCheck, X } from 'lucide-react'
import { services, options, nav, complianceItems, serve, process, faqs, type Service } from './data'
import { useReveal, useActive, useScrolled } from './hooks'
import { Photo } from './Photo'
import { EMAIL, PHONE, TEL, go, num, useContactForm, type F } from './form'

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, shown] = useReveal<HTMLDivElement>()
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition duration-700 motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'} ${className}`}>{children}</div>
}
function Head({ kicker, title, sub, center = true }: { kicker: string; title: string; sub?: string; center?: boolean }) {
  return <Reveal className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}><p className="kicker">{kicker}</p><h2 className="h2">{title}</h2>{sub && <p className="mt-4 text-lg leading-relaxed">{sub}</p>}</Reveal>
}
const Arch = ({ name, alt, className = '' }: { name: 'hero' | 'docs' | 'meeting' | 'contract' | 'office'; alt: string; className?: string }) => <div className={`overflow-hidden rounded-t-[999px] rounded-b-3xl ${className}`}><Photo name={name} alt={alt} /></div>
const Mark = () => <span className="grid h-11 w-11 place-items-center rounded-full bg-coral font-head text-sm font-bold text-white">SM</span>

function Header() {
  const scrolled = useScrolled(30), active = useActive(nav.map(n => n.toLowerCase())), [open, setOpen] = useState(false)
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  return (<header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled ? 'bg-sand/95 shadow-soft backdrop-blur' : 'bg-transparent'}`}><div className="wrap flex h-[76px] items-center justify-between">
    <a href="#home" className="flex items-center gap-3"><Mark /><span className="font-head text-[15px] font-semibold text-ocean max-sm:text-sm">SM Consultancy NZ Limited</span></a>
    <nav aria-label="Main" className="hidden gap-1 rounded-full bg-white/80 p-1.5 shadow-soft backdrop-blur lg:flex">{nav.map(n => <a key={n} href={go(n)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${active === n.toLowerCase() ? 'bg-ocean text-white' : 'text-ocean/70 hover:text-ocean'}`}>{n}</a>)}</nav>
    <a href="#contact" className="btn btn-c hidden !min-h-[44px] !py-2 lg:inline-flex">Request Consultation</a>
    <button className="grid h-11 w-11 place-items-center rounded-full bg-ocean text-white lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div>
    <div className={`grid bg-sand transition-all duration-300 lg:hidden ${open ? 'grid-rows-[1fr] shadow-soft' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><nav className="wrap flex flex-col gap-1 py-3">{nav.map(n => <a key={n} href={go(n)} onClick={() => setOpen(false)} className={`rounded-2xl px-4 py-3.5 text-lg font-bold ${active === n.toLowerCase() ? 'bg-ocean text-white' : 'text-ocean'}`}>{n}</a>)}<a href="#contact" onClick={() => setOpen(false)} className="btn btn-c my-3">Request Consultation</a></nav></div></div></header>)
}

function Hero() {
  return <section id="home" className="relative overflow-hidden pt-32 sm:pt-40"><div className="absolute inset-x-0 top-0 -z-0 h-[70%] bg-gradient-to-b from-foam-2 to-sand" />
    <div className="wrap relative fadeup text-center"><p className="kicker">Trusted • Reliable • Professional</p>
      <h1 className="mx-auto mt-5 max-w-4xl text-[2.5rem] leading-[1.06] sm:text-6xl">Your Trusted Accounting &amp; Compliance Partner</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed">Expert accounting, taxation, payroll, GST/FBT/PAYE, software migration and compliance support tailored for small &amp; medium businesses.</p>
      <div className="mt-9 flex flex-col justify-center gap-3.5 sm:flex-row"><a href="#contact" className="btn btn-c group">Get Started <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a><a href="#services" className="btn btn-o">Explore Our Services</a></div>
      <p className="mt-8 text-sm font-bold tracking-wide text-ocean/70">Accounting • Taxation • Payroll • Compliance</p></div>
    <div className="wrap relative mt-14 grid grid-cols-3 items-end gap-3 sm:gap-6"><Arch name="docs" alt="Calculator and financial documents on a desk" className="h-44 sm:h-72" /><Arch name="hero" alt="Laptop displaying business analytics" className="h-56 sm:h-96" /><Arch name="meeting" alt="Professionals collaborating around a table" className="h-44 sm:h-72" /></div>
    <div className="bg-ocean"><div className="wrap flex flex-wrap justify-center gap-x-10 gap-y-3 py-6 text-sm font-bold text-white">{['10+ Professional Services', 'SME-Focused Expertise', 'GST • FBT • PAYE', 'MYOB & Xero', 'New Zealand Compliance'].map(t => <span key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-foam" />{t}</span>)}</div></div></section>
}

function Why() {
  const f = [['Accuracy', 'Precise financial reporting and data management.'], ['Compliance', 'Timely statutory filings and legal adherence.'], ['Professionalism', 'Confidential and ethical business practices.'], ['Client Support', 'Dedicated assistance for business growth.'], ['Transparency', 'Clear reporting and honest communication.'], ['Growth Focus', 'Strategies to improve business performance.']]
  return <section className="py-20 sm:py-28"><div className="wrap"><Head kicker="Our approach" title="Why Choose Us?" sub="Reliable financial expertise designed around your business." />
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{f.map(([t, d], i) => <Reveal key={t} delay={(i % 3) * 70}><article className="text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-foam font-head text-2xl font-bold text-ocean ring-8 ring-foam-2 transition duration-300 hover:scale-110 hover:bg-ocean hover:text-white">{num(i)}</span><h3 className="mt-6 text-2xl">{t}</h3><p className="mx-auto mt-2 max-w-xs leading-relaxed">{d}</p></article></Reveal>)}</div></div></section>
}

function About() {
  return <section id="about" className="bg-white py-20 sm:py-28"><div className="wrap grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]">
    <Reveal className="mx-auto w-full max-w-sm"><Arch name="contract" alt="Financial documents being reviewed" className="aspect-[3/4] shadow-soft" /></Reveal>
    <Reveal delay={100}><p className="kicker">About us</p><h2 className="h2">About SM Consultancy NZ Limited</h2>
      <article className="mt-7 space-y-4 text-[17px] leading-[1.75]"><p>SM Consultancy NZ Limited is a trusted accounting and compliance firm dedicated to supporting small and medium-sized businesses across New Zealand.</p>
        <p>We provide accurate, reliable, and timely financial solutions tailored to each client’s unique requirements, ensuring full regulatory compliance and financial clarity.</p>
        <p>Our expertise spans accounting, bookkeeping, taxation, payroll management, GST, FBT, PAYE, and employer compliance services, delivered with professionalism and confidentiality.</p>
        <p>With strong experience in MYOB and Xero cloud-based systems, we help businesses streamline financial processes, enhance reporting accuracy, and improve operational efficiency.</p>
        <p>At SM Consultancy NZ Limited, we are committed to building long-term partnerships based on transparency, trust, and a clear focus on sustainable business growth.</p></article>
      <a href="#leadership" className="btn btn-o group mt-8">Learn More About Us <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a></Reveal></div></section>
}

function Services({ onPick }: { onPick: (s: Service) => void }) {
  const [sel, setSel] = useState<Service | null>(null), rail = useRef<HTMLUListElement>(null)
  const scroll = (d: number) => rail.current?.scrollBy({ left: d * 340, behavior: 'smooth' })
  useEffect(() => { if (!sel) return; document.body.style.overflow = 'hidden'; const k = (e: KeyboardEvent) => e.key === 'Escape' && setSel(null); addEventListener('keydown', k); return () => { document.body.style.overflow = ''; removeEventListener('keydown', k) } }, [sel])
  return <section id="services" className="py-20 sm:py-28"><div className="wrap"><div className="mb-10 flex flex-wrap items-end justify-between gap-6"><Head center={false} kicker="What we do" title="Our Services" sub="Comprehensive accounting and compliance support for modern businesses." />
    <div className="mb-12 flex gap-3"><button onClick={() => scroll(-1)} aria-label="Previous services" className="grid h-12 w-12 place-items-center rounded-full border-2 border-ocean text-ocean transition hover:bg-ocean hover:text-white"><ArrowLeft className="h-5 w-5" /></button><button onClick={() => scroll(1)} aria-label="Next services" className="grid h-12 w-12 place-items-center rounded-full bg-ocean text-white transition hover:bg-ocean-700"><ArrowRight className="h-5 w-5" /></button></div></div></div>
    <ul ref={rail} className="noscroll flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 sm:px-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">{services.map((s, i) => <li key={s.name} className="w-[285px] shrink-0 snap-start sm:w-[320px]"><button onClick={() => setSel(s)} aria-haspopup="dialog" className="group flex h-full min-h-[300px] w-full flex-col rounded-[2rem] bg-white p-7 text-left shadow-soft transition duration-300 hover:-translate-y-1.5 hover:bg-ocean">
      <span className="flex items-center justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-foam text-ocean transition group-hover:bg-white/15 group-hover:text-white"><s.icon className="h-7 w-7" strokeWidth={1.6} /></span><span className="font-head text-sm font-bold text-ocean/30 transition group-hover:text-foam">{num(i)}</span></span>
      <h3 className="mt-6 text-xl leading-snug transition group-hover:text-white">{s.name}</h3><p className="mt-2 flex-1 transition group-hover:text-white/75">{s.short}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-coral transition group-hover:text-foam">View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></button></li>)}</ul>
    <div onClick={() => setSel(null)} className={`fixed inset-0 z-[80] flex items-end justify-center bg-ocean-900/65 transition-opacity duration-300 sm:items-center sm:p-5 ${sel ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
      {sel && <div role="dialog" aria-modal="true" aria-labelledby="svc-t" onClick={e => e.stopPropagation()} className="sheet relative max-h-[92vh] w-full max-w-2xl overflow-auto rounded-t-[2rem] bg-sand p-7 shadow-2xl sm:rounded-[2rem] sm:p-10">
        <button autoFocus onClick={() => setSel(null)} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-ocean"><X className="h-5 w-5" /></button>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ocean text-white"><sel.icon className="h-7 w-7" strokeWidth={1.6} /></span><h3 id="svc-t" className="mt-4 pr-10 text-3xl leading-tight">{sel.name}</h3><p className="mt-3 leading-relaxed">{sel.about}</p>
        <div className="mt-7 grid gap-7 sm:grid-cols-2"><div><h4 className="kicker !font-sans">What is included</h4><ul className="mt-3 space-y-2.5">{sel.includes.map(b => <li key={b} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-coral" />{b}</li>)}</ul></div>
          <div><h4 className="kicker !font-sans">Key benefits</h4><ul className="mt-3 space-y-2.5">{sel.benefits.map(b => <li key={b} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-coral" />{b}</li>)}</ul></div></div>
        <h4 className="kicker mt-7 !font-sans">Suitable for</h4><p className="mt-2">{sel.suitable}</p>
        <a href="#contact" onClick={() => { onPick(sel); setSel(null) }} className="btn btn-c group mt-8 w-full sm:w-auto">Discuss This Service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a></div>}</div></section>
}

function Serve() {
  const tones = ['bg-foam', 'bg-white', 'bg-sand-2', 'bg-foam-2']
  return <section className="bg-white py-20 sm:py-28"><div className="wrap"><Head kicker="Who we serve" title="Built for New Zealand Businesses" sub="Our work is shaped around the realities of small and medium-sized businesses." />
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{serve.map(([t, d], i) => <Reveal key={t} delay={i * 70}><article className={`h-full rounded-[2rem] p-8 ${tones[i]} ${i === 1 ? 'border-2 border-foam' : ''}`}><span className="font-head text-4xl font-bold text-ocean/25">{num(i)}</span><h3 className="mt-4 text-xl leading-snug">{t}</h3><p className="mt-3 text-[15px] leading-relaxed">{d}</p></article></Reveal>)}</div></div></section>
}

function Compliance() {
  const [i, setI] = useState(0), [t, d] = complianceItems[i]
  const onKey = (e: React.KeyboardEvent) => { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setI((i + 1) % complianceItems.length); if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setI((i + complianceItems.length - 1) % complianceItems.length) }
  return <section className="dk py-20 sm:py-28"><div className="wrap"><div className="relative overflow-hidden rounded-[2.5rem] bg-ocean p-7 text-white/75 sm:p-14"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ocean-700" />
    <Reveal className="relative max-w-3xl"><p className="kicker">Compliance</p><h2 className="h2">Stay Compliant. Stay Focused on Your Business.</h2><p className="mt-4 text-lg leading-relaxed">SM Consultancy helps businesses manage accounting and compliance obligations, so business owners can focus on operations and growth.</p></Reveal>
    <div className="relative mt-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><div role="tablist" aria-label="Compliance areas" onKeyDown={onKey} className="noscroll flex gap-2 overflow-x-auto lg:flex-col">{complianceItems.map(([n], k) => <button key={n} role="tab" id={`ct-${k}`} aria-selected={i === k} aria-controls="cp" tabIndex={i === k ? 0 : -1} onClick={() => setI(k)} className={`shrink-0 rounded-full px-6 py-3.5 text-left text-[15px] font-bold transition lg:rounded-2xl ${i === k ? 'bg-foam text-ocean' : 'bg-white/10 text-white hover:bg-white/20'}`}>{n}</button>)}</div>
      <div role="tabpanel" id="cp" aria-labelledby={`ct-${i}`} key={i} className="fadeup flex min-h-[240px] flex-col justify-between rounded-[2rem] bg-white p-8 text-ink/75 sm:p-10"><div><span className="grid h-12 w-12 place-items-center rounded-full bg-foam"><ShieldCheck className="h-6 w-6 text-ocean" /></span><h3 className="mt-5 !text-ocean text-3xl sm:text-4xl">{t}</h3><p className="mt-3 max-w-lg text-lg leading-relaxed">{d}</p></div><a href="#contact" className="btn btn-c group mt-8 w-fit">Request a Consultation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a></div></div></div></div></section>
}

function Process() {
  return <section className="py-20 sm:py-28"><div className="wrap"><Head kicker="How we work" title="A Clear, Structured Approach" sub="From the first conversation to ongoing support, you always know where you stand." />
    <ol className="relative mx-auto max-w-3xl space-y-10 before:absolute before:inset-y-2 before:left-6 before:w-0.5 before:bg-foam md:before:left-1/2">{process.map(([t, d], i) => <Reveal key={t} delay={i * 70}><li className={`relative pl-20 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-14' : 'md:pr-14 md:text-right'}`}><span className={`absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full bg-ocean font-head font-bold text-white ring-8 ring-sand md:left-auto ${i % 2 ? 'md:-left-6' : 'md:-right-6'}`}>{i + 1}</span><h3 className="text-2xl">{t}</h3><p className="mt-2 leading-relaxed">{d}</p></li></Reveal>)}</ol></div></section>
}

function Partners() {
     const p = [['MYOB', '/images/myob.png', 'Comprehensive accounting, payroll & compliance solutions.'], ['Xero', '/images/xero.png', 'Trusted cloud-based accounting platform for modern businesses.']]
  return <section id="partners" className="bg-white py-20 sm:py-28"><div className="wrap"><Head kicker="Platforms" title="Software Partners" sub="We work with industry-leading platforms trusted by businesses across New Zealand." />
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">{p.map(([n, src, d], i) => <Reveal key={n} delay={i * 90}><article className="h-full rounded-[2rem] bg-sand p-10 text-center transition duration-300 hover:-translate-y-1 hover:shadow-soft"><div className="mx-auto flex h-28 w-full max-w-[260px] items-center justify-center rounded-3xl bg-white p-5"><img src={src} alt={`${n} logo`} loading="lazy" className="max-h-full w-auto max-w-full object-contain" /></div><h3 className="mt-6 text-2xl">{n}</h3><p className="mt-2">{d}</p></article></Reveal>)}</div></div></section>
}

function Leadership() {
  const rows = [[Mail, 'Email', EMAIL, `mailto:${EMAIL}`], [Globe, 'Website', 'smconsultancy.nz', 'https://smconsultancy.nz'], [Phone, 'Phone', PHONE, `tel:${TEL}`]] as const
  return <section id="leadership" className="py-20 sm:py-28"><div className="wrap"><Head kicker="The people" title="Leadership" />
    <Reveal><article className="mx-auto max-w-3xl rounded-[2.5rem] bg-foam p-8 text-center shadow-soft sm:p-14"><h3 className="text-3xl leading-tight sm:text-5xl">Madhan Joga Nageswararao</h3><p className="mt-3 inline-block rounded-full bg-ocean px-5 py-1.5 text-sm font-bold text-white">Founder &amp; Director</p>
      <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed">Madhan brings extensive expertise in accounting, compliance, taxation and business administration.</p><p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed">With a strong focus on accuracy and transparency, he supports SMEs across New Zealand for long-term growth.</p>
      <ul className="mt-9 flex flex-wrap justify-center gap-3">{rows.map(([I, l, t, h]) => <li key={l}><a href={h} aria-label={`${l}: ${t}`} className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-ocean transition hover:bg-ocean hover:text-white"><I className="h-4 w-4" /><span className="break-all">{t}</span></a></li>)}</ul></article></Reveal></div></section>
}

function Trust() {
  const t = [[BadgeCheck, 'Accurate', 'Reliable financial information you can make decisions with.'], [ShieldCheck, 'Compliant', 'Support aligned with New Zealand business obligations.'], [Lock, 'Confidential', 'Professional handling of sensitive business information.'], [Clock, 'Responsive', 'Dedicated support when your business needs it.']] as const
  return <section className="bg-white py-20 sm:py-28"><div className="wrap"><Head kicker="Our promise" title="Built Around Trust" sub="The principles behind every engagement, from the first conversation onwards." />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{t.map(([I, h, d], i) => <Reveal key={h} delay={i * 70}><article className="h-full rounded-[2rem] border-2 border-foam p-8 text-center transition duration-300 hover:border-ocean hover:bg-foam-2"><I className="mx-auto h-10 w-10 text-coral" strokeWidth={1.6} /><h3 className="mt-5 text-2xl">{h}</h3><p className="mt-2 text-[15px] leading-relaxed">{d}</p></article></Reveal>)}</div></div></section>
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return <section id="faq" className="py-20 sm:py-28"><div className="wrap"><Head kicker="FAQ" title="Frequently Asked Questions" sub="Straightforward answers to common questions. Need something specific? We are happy to talk it through." />
    <div className="mx-auto max-w-3xl space-y-3">{faqs.map(([q, a], i) => <div key={q} className={`rounded-3xl transition duration-300 ${open === i ? 'bg-white shadow-soft' : 'bg-white/60 hover:bg-white'}`}><h3><button id={`fq-${i}`} aria-expanded={open === i} aria-controls={`fa-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-5 px-7 py-5 text-left font-head text-[17px] font-semibold text-ocean"><span>{q}</span><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${open === i ? 'rotate-180 bg-ocean text-white' : 'bg-foam text-ocean'}`}><ChevronDown className="h-4 w-4" /></span></button></h3>
      <div id={`fa-${i}`} role="region" aria-labelledby={`fq-${i}`} className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden"><p className="px-7 pb-6 pr-14 leading-relaxed">{a}</p></div></div></div>)}</div></div></section>
}

function Contact({ service }: { service: string }) {
  const { v, err, state, set, blur, submit } = useContactForm(service)
  const field = (k: keyof F, label: string, node: ReactNode) => <div><label htmlFor={k} className="mb-1.5 block text-sm font-bold text-ocean">{label}</label>{node}{err[k] && <p role="alert" className="mt-1.5 text-xs font-bold text-coral">{err[k]}</p>}</div>
  const cls = (k: keyof F) => `w-full rounded-2xl border-2 bg-sand px-4 py-3.5 text-[15px] text-ink outline-none transition focus:border-ocean focus:bg-white ${err[k] ? 'border-coral' : 'border-transparent'}`
  const info = [[Mail, 'Email', EMAIL, `mailto:${EMAIL}`], [Phone, 'Phone', PHONE, `tel:${TEL}`], [Globe, 'Website', 'smconsultancy.nz', 'https://smconsultancy.nz']] as const
  return <section id="contact" className="dk relative overflow-hidden bg-ocean pb-20 pt-24 sm:pb-28"><svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-12 w-full text-sand sm:h-20"><path fill="currentColor" d="M0 0h1440v20c-240 60-480 60-720 20S240 0 0 40z" /></svg>
    <div className="wrap relative"><Reveal className="mx-auto max-w-2xl text-center"><p className="kicker">Contact</p><h2 className="h2">Let's Talk About Your Business</h2><p className="mt-4 text-lg leading-relaxed text-white/75">Have a question about accounting, taxation, payroll or compliance? Get in touch with our team.</p></Reveal>
      <Reveal className="mt-10"><p className="mb-5 text-center font-head text-xl text-white">SM Consultancy NZ Limited</p><ul className="flex flex-wrap justify-center gap-3">{info.map(([I, l, t, h]) => <li key={l}><a href={h} className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white hover:text-ocean"><I className="h-4 w-4" /><span className="break-all">{t}</span></a></li>)}</ul></Reveal>
      <Reveal delay={100}><div className="mx-auto mt-10 max-w-3xl rounded-[2.5rem] bg-white p-6 text-ink/75 shadow-soft sm:p-12">{state === 'done' ? <div role="status" className="py-14 text-center"><span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-foam text-ocean"><Check className="h-8 w-8" /></span><h3 className="!text-ocean text-3xl">Thank you.</h3><p className="mt-3">Thank you. Your enquiry has been received. We'll get back to you shortly.</p></div> :
        <form noValidate onSubmit={submit} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2">{field('name', 'Full Name', <input id="name" autoComplete="name" value={v.name} onChange={set('name')} onBlur={blur('name')} className={cls('name')} />)}{field('business', 'Business Name', <input id="business" autoComplete="organization" value={v.business} onChange={set('business')} className={cls('business')} />)}</div>
          <div className="grid gap-5 sm:grid-cols-2">{field('email', 'Email', <input id="email" type="email" autoComplete="email" value={v.email} onChange={set('email')} onBlur={blur('email')} className={cls('email')} />)}{field('phone', 'Phone', <input id="phone" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} onBlur={blur('phone')} className={cls('phone')} />)}</div>
          {field('service', 'Service Required', <select id="service" value={v.service} onChange={set('service')} onBlur={blur('service')} className={cls('service')}><option value="">Select a service</option>{options.map(o => <option key={o}>{o}</option>)}</select>)}
          {field('message', 'Message', <textarea id="message" rows={4} value={v.message} onChange={set('message')} onBlur={blur('message')} className={cls('message')} />)}
          <button disabled={state === 'loading'} className="btn btn-c group w-full disabled:opacity-70">{state === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : <>Request Consultation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></>}</button>
          {state === 'error' && <p role="alert" className="text-sm font-bold text-coral">Something went wrong. Please email {EMAIL} directly.</p>}</form>}</div></Reveal></div></section>
}

function Footer() {
  return <footer className="dk bg-ocean-900 pt-16 text-white/60"><div className="wrap"><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]"><div><div className="flex items-center gap-3"><Mark /><h4 className="text-lg">SM Consultancy NZ Limited</h4></div><p className="mt-5 max-w-xs">Trusted accounting and compliance support for New Zealand businesses.</p></div>
    <nav aria-label="Footer"><h4 className="mb-3 !font-sans text-xs font-extrabold uppercase tracking-[.18em] !text-foam">Navigate</h4>{nav.map(n => <a key={n} href={go(n)} className="block py-1 text-sm transition hover:text-white">{n}</a>)}</nav>
    <div><h4 className="mb-3 !font-sans text-xs font-extrabold uppercase tracking-[.18em] !text-foam">Contact</h4><a href={`mailto:${EMAIL}`} className="block break-all py-1 text-sm hover:text-white">{EMAIL}</a><a href={`tel:${TEL}`} className="block py-1 text-sm hover:text-white">{PHONE}</a></div></div>
    <p className="mt-12 text-center text-xs font-bold uppercase tracking-[.22em] text-foam/80">Accounting • Taxation • Payroll • Compliance</p>
    <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-relaxed text-white/40">The information on this website is general in nature and does not constitute tax, accounting or legal advice. Please contact us to discuss your specific circumstances.</p>
    <div className="mt-6 border-t border-white/10 py-6 text-center text-xs">© 2026 SM Consultancy NZ Limited — All Rights Reserved.</div></div></footer>
}

export default function App() {
  const [svc, setSvc] = useState(''), top = useScrolled(600)
  return (<><Header /><main><Hero /><Why /><About /><Services onPick={s => setSvc(s.option)} /><Serve /><Compliance /><Process /><Partners /><Leadership /><Trust /><Faq /><Contact service={svc} /></main><Footer />
    <button aria-label="Back to top" onClick={() => scrollTo({ top: 0 })} className={`fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-coral text-white shadow-xl transition duration-300 hover:brightness-110 ${top ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}><ArrowUp className="h-5 w-5" /></button></>)
}
