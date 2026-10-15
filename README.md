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

The GitHub workflow validates formatting, enquiry-delivery tests and the build. Production is hosted on Vercel; the old GitHub Pages publishing workflow has been replaced with these checks.

## Enquiries

`src/enquiry.js` uses FormSubmit's supported browser integration to send submissions to `neuralvansh@gmail.com`. The owner completed its one-time activation during setup. The UI only reports acceptance after the provider accepts the request. On an error, form values are preserved and the visitor can send the same details on WhatsApp.

The form includes required fields, consent checks, length limits, a honeypot and timing checks. Delivery and spam filtering are handled by FormSubmit. The site does not log enquiry contents or save visitor data to browser local storage.

Direct WhatsApp targets `+91 8698049031`. The visitor chooses to send the prepared message. Automatic owner alerts are not enabled because the owner chose email and direct WhatsApp for now.

Automatic WhatsApp alerts would require a separately authorised WhatsApp Business API integration. No notification credentials are needed or stored for this release.

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
- `src/enquiry.js`: form validation and browser delivery.
- `public/media`: optimised images, reels and caption files.
