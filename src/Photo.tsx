import { useState } from 'react'
const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`
export const PHOTOS = {
  hero: u('photo-1460925895917-afdab827c52f'),      // laptop with analytics
  docs: u('photo-1554224155-6726b3ff858f'),         // calculator & financial papers
  meeting: u('photo-1522071820081-009f0129c71c'),   // team collaborating
  contract: u('photo-1450101499163-c8848c66ca85'),  // documents being reviewed
  office: u('photo-1497366216548-37526070297c'),    // modern office
}
export type PhotoName = keyof typeof PHOTOS

function Scene({ alt, className }: { alt: string; className: string }) {
  return <svg role="img" aria-label={alt} viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" className={className}>
    <rect width="800" height="520" fill="#ece3d0" /><rect y="360" width="800" height="160" fill="#dccfb4" />
    <rect x="130" y="130" width="360" height="230" rx="12" fill="#07262d" /><rect x="146" y="146" width="328" height="198" rx="6" fill="#0b3f4a" />
    {[60, 95, 75, 125, 150].map((h, i) => <rect key={i} x={176 + i * 54} y={320 - h} width="32" height={h} rx="3" fill="#bfe3d8" opacity={.45 + i * .13} />)}
    <path d="M190 250L244 232L298 240L352 205L406 188" stroke="#e0694a" strokeWidth="5" strokeLinecap="round" fill="none" />
    <rect x="90" y="360" width="440" height="14" rx="7" fill="#1d1a1b" opacity=".85" />
    <rect x="560" y="250" width="150" height="110" rx="6" fill="#fff" /><rect x="574" y="268" width="90" height="8" rx="4" fill="#ece3d0" /><rect x="574" y="290" width="118" height="8" rx="4" fill="#e6dfd7" /><rect x="574" y="312" width="70" height="8" rx="4" fill="#e6dfd7" />
    <rect x="600" y="190" width="100" height="130" rx="10" fill="#12535f" transform="rotate(8 650 255)" /><g fill="#bfe3d8" transform="rotate(8 650 255)"><rect x="612" y="204" width="76" height="26" rx="4" /><circle cx="624" cy="250" r="7" /><circle cx="650" cy="250" r="7" /><circle cx="676" cy="250" r="7" /><circle cx="624" cy="276" r="7" /><circle cx="650" cy="276" r="7" /><circle cx="676" cy="276" r="7" /></g></svg>
}
export function Photo({ name, alt, className = '', local }: { name: PhotoName; alt: string; className?: string; local?: string }) {
  const srcs = [`/images/${local ?? name}.jpg`, PHOTOS[name]], [i, setI] = useState(0)
  const cls = `h-full w-full object-cover ${className}`
  if (i >= srcs.length) return <Scene alt={alt} className={cls} />
  return <img src={srcs[i]} alt={alt} loading={name === 'hero' ? 'eager' : 'lazy'} onError={() => setI(i + 1)} className={cls} />
}
