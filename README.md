# SM Consultancy NZ Limited website
React + Vite + TypeScript + Tailwind CSS v3 + Lucide.
```
npm install
npm run dev     # local
npm run build   # production -> dist/
```
- Logos load from smconsultancy.nz/images (myob.png, Xero_software_logo.svg.png). To self-host, download them into `public/` and change the URLs in `Partners()` in `src/App.tsx`.
- Contact form is front-end only: replace the `setTimeout` in `submit()` with your API / Formspree / Supabase call.

## Images
`src/Photo.tsx` tries `/public/images/<name>.jpg` first (your own photos), then a stock Unsplash URL, then a built-in illustration, so the page never shows a broken image. Replace stock with the firm's own photos before launch (names listed in `public/images/README.txt`).
