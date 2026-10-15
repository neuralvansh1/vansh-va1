# Neural Vansh

Source for [www.neuralvansh.online](https://www.neuralvansh.online). An editorial website for Vansh Gaikwad, covering content and AI-assisted video editing, websites, and practical AI workflows.

## Pages

- `/` Home with a starting-point selector, service paths and real examples.
- `/services` Three service areas, deliverables and relevant examples.
- `/approach` Process, an interactive workflow and a reel breakdown.
- `/about` Vansh's story and his co-founder role at Presenzo Media.
- `/contact` Enquiry form, email and direct WhatsApp.
- `/privacy` and `/terms` Plain-language site policies.

There are no public prices, invented testimonials or fabricated client outcomes. Examples are this website and self-initiated Neural Vansh reels. Tools, Portfolio and Resources have been removed from navigation. Old path and hash links have sensible destinations.

## Development

```sh
npm ci
npm run dev
npm test
npm run format:check
npm run build
npm run preview
```

The build creates a client bundle and uses React server rendering to generate static HTML for each page. Direct URLs have distinct headings, descriptions, canonical links and social metadata before JavaScript runs. `vercel.json` enables clean URLs and publishes `dist`.

## Deployment

The repository is connected to the `neuralvansh` Vercel project. Branches get previews. Merging the approved version into `main` triggers production deployment for the custom domain.

The GitHub workflow validates formatting, enquiry-handler tests and the build. The old GitHub Pages deployment was replaced because this site uses root paths and a Vercel serverless enquiry endpoint.

## Enquiries

`api/enquiry.js` validates the form and sends submissions to `neuralvansh@gmail.com` through FormSubmit. The owner completed its one-time activation during setup. The UI only reports acceptance after the provider accepts the request. On an error, form values are preserved and the visitor can send the same details on WhatsApp.

The endpoint includes consent checks, a honeypot, timing checks, size limits, same-origin checks and basic per-instance request throttling. It does not log enquiry contents. Visitor data is not saved to browser local storage.

Direct WhatsApp targets `+91 8698049031`. The visitor chooses to send the prepared message. Automatic owner alerts are not enabled because the owner chose email and direct WhatsApp for now.

For a future verified Resend sender, securely set `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` in Vercel. For future Meta WhatsApp Business alerts, use the server-only variables in `.env.example` and an approved four-parameter utility template. Test with the authorised owner recipient. Never commit credentials or use `VITE_` variables for secrets.

## Design and media

- Self-hosted Manrope and Instrument Serif fonts.
- Navy, sky blue, coral and pale neutral surfaces.
- Square controls, editorial service rows, staged entrances and section reveals.
- Reduced-motion support, keyboard controls and a responsive menu.
- User-provided Presenzo logo and Neural Vansh videos.
- An editorial portrait made with the built-in image-generation tool from the user-provided portrait, preserving identity and replacing the futuristic background with a plain backdrop.
- An actual screenshot of this redesign used as its website example.

Video examples have local captions and native controls. Keep them credited as self-initiated work unless the owner authorises other work for public use.

## Editing locations

- `src/content.js`: metadata, service details, starting points and FAQs.
- `src/Site.jsx`: pages, navigation, examples, diagrams and form.
- `src/site.css`: typography, layout, colour, motion and responsive rules.
- `api/enquiry.js`: validation and delivery.
- `public/media`: optimised images, reels and caption files.
