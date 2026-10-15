# Neural Vansh Personal Brand Website

A production-style React + Tailwind CSS website for **Neural Vansh / Vansh Gaikwad**.

## What is included

- Multi-page React website using hash navigation
- Home, AI Clarity & Execution, Services, Tools, Portfolio, Resources, About, and Contact pages
- Premium light AI visual direction using the existing Neural Vansh palette
- Improved typography, spacing, service copy, CTAs, and conversion structure
- WhatsApp CTA links with pre-filled messages
- Uploaded Neural Vansh logo asset
- Vansh image cutouts for the first two portraits
- Original robot-lab image used in the Tools page
- Placeholder portfolio and resource cards ready to replace later
- AI Clarity & Execution landing page with interactive starting-point selector, service recommender, starter services, demos, FAQ, process, trust section, and enquiry form
- Enquiry form stores submissions in `localStorage` and opens WhatsApp with a pre-filled message to `+91 8698049031`

## Tech stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- lucide-react

## Run locally

```bash
npm install
npm run dev
```

Open the local URL that Vite shows, usually:

```bash
http://localhost:5173
```

## Build for production

```bash
npm run build
npm run preview
```

## Deploy

You can deploy this to Vercel or Netlify.

### Vercel

1. Upload this folder to GitHub.
2. Import the repository in Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify

1. Upload this folder to GitHub or drag the folder to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

## Edit key details

- WhatsApp number and messages: `src/App.jsx`
- Contact links: `src/App.jsx`
- Services/offers: `src/App.jsx`
- AI Clarity & Execution page offers/prices: `starterServices` in `src/App.jsx`
- Enquiry form fields and WhatsApp message: `EnquiryForm` in `src/App.jsx`
- Portfolio cards: `src/App.jsx`
- Resources cards: `src/App.jsx`
- Images: `src/assets/`

## Enquiry form behavior

The AI Clarity form is frontend-only:

1. It saves the enquiry in browser `localStorage` under `neural-vansh-enquiries`.
2. It opens WhatsApp with a pre-filled message to `+91 8698049031`.
3. The visitor still needs to tap/send the WhatsApp message.

For automatic backend delivery later, connect the form to Formspree, Google Sheets, Supabase, or an approved WhatsApp Business API provider. The TODO comment is in `src/App.jsx` inside `EnquiryForm`.

## Production updates

This repository is connected to the `neuralvansh` Vercel project. Vercel builds branch previews for review and deploys production updates from `main`.

The version-controlled `vercel.json` installs with `npm ci`, builds with `npm run build`, and publishes `dist`. The homepage hero is in `HomePage` in `src/App.jsx`.

The existing GitHub Pages workflow also builds the application before publishing `dist`, using a relative asset base for its project URL.

## Notes

The site uses the existing Neural Vansh light-tech palette and does not introduce a new color palette. The focus is clarity, conversion, services, resources, portfolio, and personal-brand trust.
