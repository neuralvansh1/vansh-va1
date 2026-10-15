export const SITE_URL = "https://www.neuralvansh.online";
export const EMAIL = "neuralvansh@gmail.com";
export const PHONE = "918698049031";
export const whatsapp = (
  message = "Hi Vansh, I'd like to talk about something I'm working on.",
) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

export const navigation = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/approach", label: "How I work" },
  { path: "/about", label: "About Vansh" },
];

export const routeMetadata = {
  "/": {
    title: "Neural Vansh | AI, content & websites with a human point of view",
    description:
      "Work with Vansh Gaikwad for AI-assisted video editing, stronger content, thoughtful websites and practical AI workflows. Based in Pune. Co-founder of Presenzo Media.",
  },
  "/services": {
    title:
      "Services | Content, AI-assisted video, websites & workflows | Neural Vansh",
    description:
      "Find the right starting point for your next reel, content system, website or everyday AI workflow. Clear deliverables, examples you can watch and a scope built around your project.",
  },
  "/approach": {
    title: "How I work | From a clear brief to a useful result | Neural Vansh",
    description:
      "See how Vansh combines research, AI assistance, creative direction and human review. Explore the actual thinking behind a Neural Vansh reel and this website.",
  },
  "/about": {
    title: "About Vansh Gaikwad | Neural Vansh & Presenzo Media",
    description:
      "Meet Vansh Gaikwad, a young creator and builder from Pune, and co-founder of Presenzo Media. Practical AI, thoughtful creative work and a direct working relationship.",
  },
  "/contact": {
    title: "Start a conversation | Neural Vansh",
    description:
      "Tell Vansh what you are building and what is getting in the way. Enquire about content, AI-assisted editing, websites or practical AI support.",
  },
  "/privacy": {
    title: "Privacy policy | Neural Vansh",
    description:
      "How Neural Vansh handles enquiry details, email delivery, WhatsApp conversations and information you share through this website.",
  },
  "/terms": {
    title: "Terms of use | Neural Vansh",
    description:
      "Plain-language terms for using the Neural Vansh website and discussing a project.",
  },
  "/404": {
    title: "Page not found | Neural Vansh",
    description: "Find your way back to Neural Vansh.",
  },
};

export const services = [
  {
    id: "content",
    number: "01",
    label: "Content & AI-assisted editing",
    short: "Content with something to say.",
    description:
      "Reels, videos and visual content built around a clear idea. I use AI where it helps with research, scripting, voice, visuals or editing, then make the creative decisions myself.",
    for: "Creators, personal brands and small businesses with ideas or footage that need a stronger finish.",
    deliverables: [
      "A clear angle, hook and script",
      "Reel or video edit with captions and sound",
      "AI-assisted visuals where they fit the story",
      "Cover, caption and platform-ready export",
    ],
    example:
      "Watch a Neural Vansh reel below. One idea about AI overwhelm becomes a short story, with a focused hook, timed captions and a clear next step.",
    conversation:
      "Hi Vansh, I'd like help with content or AI-assisted video editing. Here's what I'm working on:",
  },
  {
    id: "websites",
    number: "02",
    label: "Websites & landing pages",
    short: "A website that makes the next step clear.",
    description:
      "A considered online home for your work. I connect your message, page structure, design and enquiry flow so visitors understand what you do and how to start.",
    for: "Independent professionals, creators and service businesses who need more than a page that looks nice.",
    deliverables: [
      "Message and page structure",
      "Responsive design and development",
      "Clear enquiry and WhatsApp paths",
      "Launch, handover and an agreed update plan",
    ],
    example:
      "This website is the working example. You can inspect its mobile layout, follow the service paths and try the enquiry flow yourself.",
    conversation:
      "Hi Vansh, I'd like to talk about a website or landing page. My business and goal are:",
  },
  {
    id: "workflows",
    number: "03",
    label: "Practical AI & workflows",
    short: "Make AI useful in your actual day.",
    description:
      "Start with the task that keeps repeating. We choose the right tools, organise the inputs and build a process you can understand, check and use again.",
    for: "People who have tried a few AI tools but still need a reliable way to research, draft, organise or follow up.",
    deliverables: [
      "A review of one real task",
      "A suitable tool and prompt structure",
      "A repeatable workflow or small system",
      "A walkthrough and useful handover notes",
    ],
    example:
      "My “Tools se pehle, clarity” reel breaks down a client follow-up workflow. The diagram below expands that teaching example, without presenting it as a client result.",
    conversation:
      "Hi Vansh, I'd like help making AI useful for a repeated task. The task is:",
  },
];

export const startingPoints = [
  {
    key: "content",
    label: "My content needs direction",
    result: "Start with one piece of content.",
    detail:
      "Send a rough idea, an existing post or a clip. We can work out the angle, format and edit before you commit to a bigger content plan.",
    output: "One clear brief. One finished piece.",
    path: "/services#content",
  },
  {
    key: "websites",
    label: "My website needs to work harder",
    result: "Start with the visitor journey.",
    detail:
      "Show me your current page or offer. We will look at what a new visitor needs to understand, believe and do next.",
    output: "A clearer message and a sensible page plan.",
    path: "/services#websites",
  },
  {
    key: "workflows",
    label: "I keep repeating the same tasks",
    result: "Start with the most repetitive task.",
    detail:
      "Pick one job you do every week. We can map the steps, identify where AI is useful and keep a human check where it matters.",
    output: "A workflow you can actually explain and repeat.",
    path: "/services#workflows",
  },
  {
    key: "unsure",
    label: "I'm still figuring it out",
    result: "Start with a conversation.",
    detail:
      "You do not need a polished brief. Tell me what you are building, what feels stuck and what a useful result would look like.",
    output: "A better next step, before a bigger commitment.",
    path: "/contact",
  },
];

export const steps = [
  {
    number: "01",
    title: "Find the real job.",
    text: "We talk about the goal, audience, starting material and what is getting in the way.",
    artifact:
      "Example: one reel explaining why collecting AI tools does not fix a messy process.",
  },
  {
    number: "02",
    title: "Make the plan visible.",
    text: "I outline the idea, structure, scope and deliverables. We agree on what good looks like.",
    artifact:
      "Example: hook, practical lesson, human review and a simple invitation to talk.",
  },
  {
    number: "03",
    title: "Build. Review. Refine.",
    text: "AI can help with drafts, assets and production. I check the message, facts, pacing and final experience.",
    artifact:
      "Example: captions, motion, voice and music edited to support the same story.",
  },
  {
    number: "04",
    title: "Put it to work.",
    text: "You receive the agreed files or system, a walkthrough where useful, and clear next steps.",
    artifact:
      "Example: the finished Neural Vansh reel, ready to watch on this site.",
  },
];

export const questions = [
  {
    question: "Do I need to know exactly what I want?",
    answer:
      "No. A rough idea, a link or an example of what feels wrong is enough to begin. I will help turn that into a useful brief before we agree on the work.",
  },
  {
    question: "Will the work feel like generic AI content?",
    answer:
      "The starting point is your audience, voice and purpose. AI may help with research, drafts, visuals or production, but the final work still needs judgment, editing and a reason to exist.",
  },
  {
    question: "Can we start with one small project?",
    answer:
      "Yes. A single reel, a focused page or one repeatable workflow can be a good starting point. We can decide whether anything larger makes sense after that.",
  },
  {
    question: "How do you decide the scope and fee?",
    answer:
      "We discuss the goal, complexity, deliverables and timeline first. You receive a project-specific scope and quote before work begins. Revisions and handover are agreed at the same time.",
  },
  {
    question: "Do you work through Presenzo Media?",
    answer:
      "I am a co-founder of Presenzo Media. Neural Vansh is my personal space for AI, content and building. If your project is better suited to agency support, I will explain who is involved and how we would work before you commit.",
  },
];
