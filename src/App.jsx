import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AlertCircle,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Compass,
  DatabaseZap,
  ExternalLink,
  FileText,
  FolderOpen,
  Gem,
  GraduationCap,
  Heart,
  Layers3,
  Lightbulb,
  Mail,
  Map,
  MousePointerClick,
  MessageCircle,
  MessageSquare,
  Palette,
  Phone,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import logoWordmark from "./assets/neural-vansh-logo.png";
import vanshHero from "./assets/vansh-hero-cutout.png";
import vanshDark from "./assets/vansh-dark-cutout.png";
import vanshRobot from "./assets/vansh-robot-lab.png";

const WHATSAPP_NUMBER = "918698049031";
const aiClarityMessage = "Hey Vansh, I want to book a free AI clarity call. I want help understanding how I can use AI for my work, productivity, content, or business.";
const contentStrategyMessage = "Hey Vansh, I want to book a free content strategy call. I want help improving my social media, content ideas, hooks, captions, visuals, and lead generation.";
const aiClarityLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(aiClarityMessage)}`;
const contentStrategyLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contentStrategyMessage)}`;
const phoneDisplay = "+91 8698049031";

const pages = [
  { id: "home", label: "Home" },
  { id: "clarity", label: "AI Clarity" },
  { id: "services", label: "Services" },
  { id: "tools", label: "Tools" },
  { id: "portfolio", label: "Portfolio" },
  { id: "resources", label: "Resources" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const valueCards = [
  {
    icon: Compass,
    title: "AI Clarity",
    text: "Know which tools to use, what to ignore, and how to apply AI properly to your work.",
  },
  {
    icon: Palette,
    title: "Content Improvement",
    text: "Create stronger hooks, captions, visuals, scripts, CTAs, and lead magnets with better direction.",
  },
  {
    icon: Workflow,
    title: "Smarter Workflows",
    text: "Build simple systems that reduce repeated work and help you execute faster without losing human judgment.",
  },
];

const serviceCategories = [
  {
    eyebrow: "Service 01",
    title: "AI Clarity & Productivity Consulting",
    intro: "If AI feels overwhelming, I help you simplify it. We identify the right tools, best use cases, and practical workflows based on your actual work.",
    icon: BrainCircuit,
    offers: [
      {
        name: "AI Clarity Starter",
        description: "A focused clarity session for beginners who want direction before buying tools or wasting time.",
        for: "Entrepreneurs, students, freelancers, and service providers who feel confused about AI.",
        gets: ["1:1 clarity call", "Personalized AI tool recommendations", "Best use cases for your work", "What to buy first and what to skip", "Simple next-step roadmap"],
        outcome: "You leave with a clear AI direction instead of random tool confusion.",
        cta: "Book Starter Call",
      },
      {
        name: "AI Productivity Setup",
        description: "A practical setup for people who want AI to actually save time in daily work.",
        for: "Busy founders, creators, coaches, students, and operators who want better output with less manual work.",
        gets: ["Workflow recommendations", "AI for repetitive tasks", "Prompt packs and prompt structure", "ChatGPT Projects, Claude Projects, and Gemini Gems guidance", "Basic lead generation and CRM guidance"],
        outcome: "You get a practical AI setup that improves daily execution.",
        cta: "Book Productivity Setup",
      },
      {
        name: "AI Workflow & Tool System",
        description: "A deeper AI operating setup for people ready to build smarter systems around their work.",
        for: "Business owners, content teams, service providers, and serious freelancers.",
        gets: ["Complete AI tool stack selection", "Custom GPT / prompt system guidance", "Simple tools built on top of existing AI tools", "Pitch deck support", "Structured AI workflow system"],
        outcome: "You get a complete AI system built around your goals, tasks, and content needs.",
        cta: "Build My AI System",
        featured: true,
      },
    ],
  },
  {
    eyebrow: "Service 02",
    title: "Social Media & Content Enhancement",
    intro: "I help you improve content clarity, positioning, and quality so your posts attract more attention, trust, and better leads.",
    icon: MessageSquare,
    offers: [
      {
        name: "Content Clarity Audit",
        description: "A direction-first audit for people who are posting but not clear about what is working.",
        for: "Creators, coaches, freelancers, institutes, and small businesses with inconsistent content.",
        gets: ["Social media audit", "Profile and positioning feedback", "Content clarity review", "Hook, caption, and CTA direction", "Competitor overview"],
        outcome: "You understand what to improve and where your content is currently weak.",
        cta: "Book Content Audit",
      },
      {
        name: "Authority Content Kit",
        description: "A content kit for building trust through sharper educational and authority content.",
        for: "Coaches, creators, consultants, and service providers building an online brand.",
        gets: ["Content direction", "Carousel and visual direction", "Hook ideas", "Caption ideas", "Reel ideas and scripts", "Lead magnet and funnel suggestions"],
        outcome: "You get a clearer content system that builds authority and consistency.",
        cta: "Build My Content Kit",
        featured: true,
      },
      {
        name: "Social Growth System",
        description: "A strategic content system tied to attention, trust, leads, and offer positioning.",
        for: "Serious personal brands, founders, service providers, and small businesses.",
        gets: ["Full content strategy support", "Competitor analysis", "Content pillars", "Offer/content alignment", "AI-assisted creation workflow", "Lead magnet and funnel thinking"],
        outcome: "You get a growth-focused content system that supports attention and lead generation.",
        cta: "Build My Growth System",
      },
    ],
  },
  {
    eyebrow: "Service 03",
    title: "AI + Content Systems",
    intro: "The premium done-with-you / done-for-you service for people who want AI, content, workflows, and execution connected together.",
    icon: DatabaseZap,
    offers: [
      {
        name: "AI + Content Audit",
        description: "A full-picture review before building anything serious.",
        for: "Founders, creators, and service businesses who need clarity across AI, content, and workflow.",
        gets: ["Personalized audit", "AI strategy review", "Content strategy review", "Workflow bottleneck review", "System opportunity map"],
        outcome: "You get a clear system map of what to improve first.",
        cta: "Request Audit",
      },
      {
        name: "AI Content Operating System",
        description: "A repeatable operating system for content ideas, prompts, assets, and execution.",
        for: "Personal brands, creators, consultants, and small teams.",
        gets: ["AI strategy", "Content strategy", "Workflow design", "Knowledge organization", "Second-brain setup guidance", "Simple automations"],
        outcome: "You get a working operating system for content and execution.",
        cta: "Build Operating System",
      },
      {
        name: "Personalized AI Business System",
        description: "The premium final-boss offer for deeper AI integration and done-for-you execution support.",
        for: "Founders, consultants, coaches, and businesses ready for a custom AI-backed system.",
        gets: ["Done-for-you + done-with-you support", "AI workflow integration", "Custom apps / mini tools", "Landing pages for specific tasks", "Second-brain systems", "Reduced repeated thinking and manual work"],
        outcome: "You get a personalized AI-backed support system built around your real work.",
        cta: "Apply For Premium System",
        featured: true,
      },
    ],
  },
];

const toolGroups = [
  { title: "AI Assistants", icon: Bot, tools: ["ChatGPT", "Gemini", "Claude Code", "Microsoft Copilot", "Google AI Studio", "Google Labs", "OpenRouter", "OpenClaw", "Codex"] },
  { title: "Content & Design", icon: Palette, tools: ["Figma", "Adobe Creative Cloud Pro", "Magnific AI", "Nano Banana", "SwicyAI", "Canva"] },
  { title: "Automation & Workflows", icon: Workflow, tools: ["ManyChat", "FlowAI", "SuperProfile", "CloudCoWork", "AI workflow maps"] },
  { title: "Websites & Deployment", icon: Code2, tools: ["Vercel", "Netlify", "Hostinger", "Landing pages", "Simple web apps"] },
  { title: "Knowledge Systems", icon: FolderOpen, tools: ["Obsidian", "Second-brain setups", "Gemini Gems", "Custom GPT systems", "Prompt libraries"] },
  { title: "Research & Productivity", icon: Search, tools: ["Perplexity", "Comet Browser", "Fathom AI", "Research workflows", "Productivity systems"] },
];

const resources = [
  ["Top AI Tools in May 2026", "A simple breakdown of useful AI tools and where each one fits.", "Coming Soon"],
  ["How to Give Better Prompts to AI", "Learn how to write prompts that produce clearer and more useful outputs.", "Download Soon"],
  ["Prompting Structure That Actually Works", "A practical structure you can reuse across different AI tasks.", "Coming Soon"],
  ["AI for Content Creation", "Use AI to speed up content planning, writing, ideation, and repurposing.", "Download Soon"],
  ["AI Image Generation Tactics", "A cleaner approach to prompts for stronger visual outputs and brand consistency.", "Coming Soon"],
  ["The Right Way to Use AI in 2026", "Use AI without becoming lazy, confused, or tool-dependent.", "Download Soon"],
  ["Custom Apps, Gems, GPTs & Second Brains", "A future-ready guide for practical AI systems and smarter setups.", "Coming Soon"],
];

const portfolio = [
  ["High-CTR Visual Concepts", "Premium visual directions for personal brands, creators, and offer-based businesses.", Palette, ["Visuals", "Brand", "CTR"]],
  ["Carousel Design Systems", "Educational and conversion-focused carousel concepts with stronger hooks and better structure.", Layers3, ["Carousels", "Hooks", "Design"]],
  ["Reel Covers & Thumbnails", "Clean cover directions built to improve clickability, clarity, and trust.", Target, ["Reels", "Thumbnails", "Social"]],
  ["AI Workflow Setups", "Simple AI workflows for content creation, productivity, and repeated business tasks.", Workflow, ["AI", "Systems", "Workflows"]],
  ["Landing Page Concepts", "Conversion-focused layouts for offers, services, lead magnets, and personal brands.", Code2, ["Websites", "Landing Pages", "Offers"]],
  ["Lead Magnet Concepts", "Useful content assets designed to attract attention and collect better leads.", FileText, ["Lead Gen", "PDFs", "Resources"]],
  ["Content Strategy Samples", "Content pillars, positioning, hooks, scripts, captions, and CTA systems.", ClipboardCheck, ["Strategy", "Content", "Growth"]],
  ["Automation / System Examples", "Simple system ideas for reducing repeated thinking and organizing work.", DatabaseZap, ["Automation", "CRM", "Second Brain"]],
];

const contacts = [
  { label: "Call / WhatsApp", href: "tel:+918698049031", icon: Phone, detail: phoneDisplay },
  { label: "Email", href: "mailto:neuralvansh@gmail.com", icon: Mail },
  { label: "Instagram", href: "https://www.instagram.com/neuralvanshx/", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/neural-vansh-3103m008/", icon: LinkedInIcon },
  { label: "YouTube", href: "https://www.youtube.com/@NeuralVansh", icon: YouTubeIcon },
];

// Edit these offers, prices, copy, and contact links as the Neural Vansh service menu grows.
const starterServices = [
  {
    icon: Sparkles,
    title: "AI Clarity Call",
    price: "Rs. 499-999",
    bestFor: "You feel confused by AI tools and want one clear direction before spending time or money.",
    description: "A 45-60 minute strategy call where we cut through tool noise and map how AI can help your real work.",
    includes: ["Tool shortlist", "Use-case map", "What to avoid", "7-day action plan"],
    outcome: "You know exactly what to try first, what to skip, and how to start using AI without feeling lost.",
    quickWin: "Leave with your first practical AI workflow idea.",
    timeline: "Same day direction",
  },
  {
    icon: Workflow,
    title: "AI Workflow Setup",
    price: "Rs. 1,499-3,999",
    bestFor: "You repeat the same tasks every week and want AI to remove friction from execution.",
    description: "I design a simple AI workflow for content, lead tracking, research, proposals, client communication, or daily productivity.",
    includes: ["Workflow map", "Prompt flow", "Tool setup guidance", "Walkthrough video/call"],
    outcome: "You get a repeatable system you can actually use instead of another messy list of AI tools.",
    quickWin: "Save time on one repeated task within the first setup.",
    timeline: "1-3 day setup",
  },
  {
    icon: TrendingUp,
    title: "High-CTR Content System",
    price: "Rs. 1,999-4,999",
    bestFor: "You post inconsistently or your content looks okay but does not create enough attention, trust, or enquiries.",
    description: "Hooks, captions, carousel ideas, reel scripts, thumbnail concepts, CTAs, and a simple content calendar.",
    includes: ["Hook bank", "Caption angles", "Reel/script ideas", "Content calendar"],
    outcome: "You stop guessing what to post and get a clearer content engine for attention and inbound conversations.",
    quickWin: "Get sharper post ideas you can publish immediately.",
    timeline: "2-4 day kit",
  },
  {
    icon: PanelIcon,
    title: "Simple Website / Landing Page",
    price: "Rs. 3,999-9,999",
    bestFor: "You need one professional link that explains your offer and turns interest into WhatsApp enquiries.",
    description: "A clean one-page website, portfolio page, lead capture page, or service page for creators, freelancers, coaches, and local businesses.",
    includes: ["Offer copy", "Responsive page", "WhatsApp CTA", "Launch guidance"],
    outcome: "You get a polished page that makes your work easier to trust and easier to enquire about.",
    quickWin: "Send one clean link instead of explaining everything in DMs.",
    timeline: "3-7 day build",
  },
  {
    icon: DatabaseZap,
    title: "Mini Business Tool",
    price: "Rs. 2,999-7,999",
    bestFor: "You want a simple internal tool for leads, clients, content, proposals, or repeated business work.",
    description: "Simple tools like lead trackers, proposal generators, client dashboards, content planners, basic CRMs, and workflow dashboards.",
    includes: ["Tool structure", "Editable data", "Simple dashboard", "Usage walkthrough"],
    outcome: "You reduce repeated thinking and manage work from one cleaner place.",
    quickWin: "Turn scattered notes into a usable system.",
    timeline: "3-6 day build",
  },
];

const clarityProblems = [
  ["Too many AI tools, no clear system", "You see new tools daily, but still do not know which one actually helps your work."],
  ["Content takes too much time", "Ideas, hooks, captions, scripts, and calendars stay scattered instead of becoming a repeatable system."],
  ["Business ideas stay stuck in notes", "AI can turn rough notes into offers, pages, prompts, lead magnets, and action steps."],
  ["No simple workflow for clients, leads, or content", "You need a clear setup for follow-ups, research, proposals, delivery, and daily execution."],
];

const bestForAudiences = ["Creators", "Coaches", "Students", "Freelancers", "Local Businesses", "Service Providers", "Small Business Owners", "Beginner Entrepreneurs"];

const demoAssets = [
  ["AI Content Calendar Demo", "A beginner-friendly content calendar for hooks, captions, carousel ideas, reels, and weekly execution.", TrendingUp],
  ["Local Business Audit Demo", "A simple audit showing profile gaps, local trust signals, content ideas, and AI execution opportunities.", ClipboardCheck],
  ["Simple Landing Page Demo", "A clean one-page service page designed to make your offer easier to understand and enquire about.", PanelIcon],
  ["Lead Tracker / Mini CRM Demo", "A practical tracker for prospects, follow-ups, notes, status, and next actions.", DatabaseZap],
];

const processSteps = [
  "Free clarity chat",
  "I understand your current workflow/problem",
  "I suggest a simple AI-powered solution",
  "I build the asset/system",
  "You get a walkthrough and editable files",
];

const clarityOutcomes = [
  ["More clarity", "Know what AI should do for your work and what should stay human.", Compass],
  ["Faster execution", "Turn repeated tasks into prompts, checklists, workflows, pages, or simple tools.", Zap],
  ["Better content", "Get sharper hooks, captions, scripts, CTAs, and content direction.", TrendingUp],
  ["More trust", "Present your service, business, or profile with a cleaner system and clearer offer.", ShieldCheck],
];

const quickPaths = [
  {
    title: "I am confused about AI tools",
    signal: "Best first step: AI Clarity Call",
    result: "We choose the right tools, remove distractions, and map your first AI use cases.",
    cta: "Book Clarity Chat",
  },
  {
    title: "My content is slow or inconsistent",
    signal: "Best first step: High-CTR Content System",
    result: "We build hooks, captions, content ideas, and a simple publishing direction.",
    cta: "Fix My Content",
  },
  {
    title: "I need a page or client-ready asset",
    signal: "Best first step: Simple Website / Landing Page",
    result: "We turn your offer into a clean page or asset that makes enquiries easier.",
    cta: "Build My Page",
  },
  {
    title: "My leads, ideas, or work are scattered",
    signal: "Best first step: AI Workflow Setup",
    result: "We create one workflow or mini system so your work is easier to repeat.",
    cta: "Organize My Workflow",
  },
];

const clarityFaqs = [
  ["I am new to AI. Is this still for me?", "Yes. This page is built for beginners. You do not need technical knowledge. You only need to tell me what work feels slow, confusing, or repetitive."],
  ["Will you just suggest random AI tools?", "No. The goal is not a tool list. The goal is a practical setup: what to use, why to use it, what to skip, and how it fits your work."],
  ["Can I start small before buying a bigger service?", "Yes. Start with a clarity call or a small workflow. If it makes sense, we can later build a content system, landing page, or mini tool."],
  ["Can you help if I do not have a big audience?", "Yes. This is especially useful for beginners, local businesses, students, and service providers who need clear positioning, simple systems, and direct conversations."],
];

function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.25" y="5.25" width="19.5" height="13.5" rx="4" fill="currentColor" />
      <path d="M10 9.35v5.3L15 12l-5-2.65Z" fill="white" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6.8 9.4H3.7V20h3.1V9.4ZM5.25 4a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM20.3 14.2c0-3.1-1.65-5.05-4.25-5.05-1.65 0-2.65.9-3.05 1.65V9.4H9.95V20H13v-5.6c0-1.55.8-2.5 2.05-2.5 1.2 0 2.05.85 2.05 2.55V20h3.2v-5.8Z" fill="currentColor" />
    </svg>
  );
}

function PanelIcon(props) {
  return <PanelTopFallback {...props} />;
}

function PanelTopFallback({ className = "" }) {
  return <Code2 className={className} />;
}

function runSmokeTests() {
  const tests = [
    { name: "has core pages", pass: pages.length >= 8 },
    { name: "about appears between resources and contact", pass: pages.findIndex((p) => p.id === "resources") < pages.findIndex((p) => p.id === "about") && pages.findIndex((p) => p.id === "about") < pages.findIndex((p) => p.id === "contact") },
    { name: "three service categories", pass: serviceCategories.length === 3 },
    { name: "each service category has three offers", pass: serviceCategories.every((category) => category.offers.length === 3) },
    { name: "resources include seven cards", pass: resources.length === 7 },
    { name: "portfolio includes placeholder cards", pass: portfolio.length >= 8 },
    { name: "whatsapp links use correct country code", pass: aiClarityLink.includes("wa.me/918698049031") && contentStrategyLink.includes("wa.me/918698049031") },
  ];
  tests.forEach((test) => {
    if (!test.pass) throw new Error(`Smoke test failed: ${test.name}`);
  });
  return tests;
}

if (import.meta.env.DEV) runSmokeTests();

const fadeUp = {
  initial: { opacity: 1, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

function getInitialPage() {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "");
  return pages.some((page) => page.id === hash) ? hash : "home";
}

function GradientText({ children, className = "" }) {
  return <span className={`bg-gradient-to-r from-[#123F8D] via-[#2186D7] to-[#FF4F45] bg-clip-text text-transparent ${className}`}>{children}</span>;
}

function BlueText({ children, className = "" }) {
  return <span className={`bg-gradient-to-r from-[#0B2D66] via-[#237ED3] to-[#23B7D9] bg-clip-text text-transparent ${className}`}>{children}</span>;
}

function Eyebrow({ icon: Icon = Sparkles, children, tone = "blue" }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0] shadow-sm backdrop-blur ${tone === "coral" ? "border-[#FF6B61]/25 bg-[#FF6B61]/[0.08] text-[#E5544D]" : "border-[#6DB7E8]/40 bg-white/65 text-[#285E91]"}`}>
      <Icon className="h-4 w-4" />
      {children}
    </div>
  );
}

function DisplayTitle({ children, className = "" }) {
  return <h1 className={`text-balance text-[clamp(2.2rem,3.75vw,3.65rem)] font-black leading-[1.05] tracking-[0] text-[#071F52] ${className}`}>{children}</h1>;
}

function SectionTitle({ children, className = "" }) {
  return <h2 className={`text-balance text-[clamp(1.95rem,4.1vw,4rem)] font-black leading-[1.04] tracking-[0] text-[#071F52] ${className}`}>{children}</h2>;
}

function Lead({ children, className = "" }) {
  return <p className={`max-w-3xl text-[1.02rem] font-medium leading-8 tracking-[0] text-[#36597E] sm:text-lg sm:leading-9 ${className}`}>{children}</p>;
}

function Card({ children, className = "", ...props }) {
  return <div {...props} className={`glass-border rounded-[2rem] bg-white/68 shadow-soft backdrop-blur-xl transition duration-300 ${className}`}>{children}</div>;
}

function IconTile({ icon: Icon, className = "", tone = "blue" }) {
  return (
    <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/90 bg-gradient-to-br from-white to-[#EAF6FF] shadow-[0_14px_30px_rgba(109,183,232,0.22)] ${className}`}>
      <Icon className={`h-7 w-7 ${tone === "coral" ? "text-[#FF6B61]" : "text-[#256FBB]"}`} />
    </div>
  );
}

function Button({ href, children, variant = "primary", className = "" }) {
  const base = "group inline-flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm font-extrabold tracking-[0] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#A9DDF2]/60";
  const styles = variant === "primary"
    ? "bg-[#FF6B61] text-white shadow-coral hover:bg-[#F35F55]"
    : "border border-[#BFD8EC] bg-white/78 text-[#285E91] shadow-[0_16px_36px_rgba(24,59,91,0.08)] hover:border-[#6DB7E8] hover:bg-white";
  return (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined} className={`${base} ${styles} ${className}`}>
      {children}
      <span className={`grid h-7 w-7 place-items-center rounded-full ${variant === "primary" ? "bg-white/20" : "bg-[#EEF7FF]"}`}>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

function ActionButton({ onClick, children, variant = "primary", className = "" }) {
  const base = "group inline-flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm font-extrabold tracking-[0] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#A9DDF2]/60";
  const styles = variant === "primary"
    ? "bg-[#FF6B61] text-white shadow-coral hover:bg-[#F35F55]"
    : "border border-[#BFD8EC] bg-white/78 text-[#285E91] shadow-[0_16px_36px_rgba(24,59,91,0.08)] hover:border-[#6DB7E8] hover:bg-white";
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
      <span className={`grid h-7 w-7 place-items-center rounded-full ${variant === "primary" ? "bg-white/20" : "bg-[#EEF7FF]"}`}>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

function InteractiveShell({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.012 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-44 left-1/2 h-[600px] w-[760px] -translate-x-1/2 rounded-full bg-[#A9DDF2]/40 blur-3xl" />
      <div className="absolute left-[-160px] top-36 h-[420px] w-[420px] rounded-full bg-[#6DB7E8]/20 blur-3xl" />
      <div className="absolute right-[-190px] top-20 h-[520px] w-[520px] rounded-full bg-[#FF6B61]/[0.11] blur-3xl" />
      <div className="absolute bottom-[-260px] left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-[100%] bg-gradient-to-r from-[#6DB7E8]/28 via-white to-[#FF6B61]/[0.14] blur-2xl" />
      <svg className="absolute bottom-0 left-0 h-[380px] w-full opacity-80" viewBox="0 0 1440 380" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-120 318C177 196 303 357 555 240C807 123 969 139 1195 224C1324 273 1456 244 1574 149" stroke="url(#wave1)" strokeWidth="2" />
        <path d="M-78 349C220 186 358 322 611 195C864 68 1030 82 1248 180C1372 236 1450 222 1560 118" stroke="url(#wave2)" strokeWidth="2" />
        <defs>
          <linearGradient id="wave1" x1="0" y1="0" x2="1440" y2="0"><stop stopColor="#6DB7E8" stopOpacity="0" /><stop offset="0.45" stopColor="#6DB7E8" stopOpacity="0.55" /><stop offset="1" stopColor="#FF6B61" stopOpacity="0" /></linearGradient>
          <linearGradient id="wave2" x1="0" y1="0" x2="1440" y2="0"><stop stopColor="#FF6B61" stopOpacity="0" /><stop offset="0.48" stopColor="#A9DDF2" stopOpacity="0.65" /><stop offset="1" stopColor="#6DB7E8" stopOpacity="0" /></linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(24,59,91,0.09)_1px,transparent_0)] [background-size:32px_32px] opacity-[0.18]" />
    </div>
  );
}

function Header({ activePage, navigate }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/65 bg-[#F7FBFF]/78 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
        <button type="button" onClick={() => navigate("home")} aria-label="Neural Vansh Home" className="rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#A9DDF2]/60">
          <img src={logoWordmark} alt="Neural Vansh" className="h-auto w-[132px] object-contain sm:w-[154px]" />
        </button>
        <nav className="hidden items-center gap-2 xl:flex">
          {pages.map((page) => (
            <button key={page.id} type="button" onClick={() => navigate(page.id)} className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${activePage === page.id ? "bg-white text-[#183B5B] shadow-sm" : "text-[#4F6B82] hover:bg-white/65 hover:text-[#183B5B]"}`}>
              {page.label}
            </button>
          ))}
        </nav>
        <a href={aiClarityLink} target="_blank" rel="noreferrer" className="hidden rounded-2xl bg-[#183B5B] px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(24,59,91,0.22)] transition hover:-translate-y-0.5 hover:bg-[#214B72] sm:inline-flex">
          Book Call
        </a>
      </div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-3 xl:hidden">
        {pages.map((page) => (
          <button key={page.id} type="button" onClick={() => navigate(page.id)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-extrabold transition ${activePage === page.id ? "bg-white text-[#183B5B] shadow-sm" : "bg-white/45 text-[#4F6B82]"}`}>
            {page.label}
          </button>
        ))}
      </div>
    </header>
  );
}

function Page({ children }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-24 sm:pt-28">
      <Background />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="relative">
      <div className="absolute inset-x-8 top-8 h-[420px] rounded-full bg-[#6DB7E8]/30 blur-3xl" />
      <Card className="group relative overflow-hidden p-5 sm:p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F7FBFF] to-[#E2F4FF]" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} className="absolute left-8 top-10 h-40 w-40 rounded-full border border-[#A9DDF2]/70 opacity-70" />
        <div className="absolute right-10 top-16 rounded-2xl border border-[#D9E7F2] bg-white/60 p-4 shadow-sm backdrop-blur">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#3E6FB0]">AI System</p>
          <div className="mt-3 flex items-end gap-1.5">
            {[28, 44, 34, 62, 52].map((h, i) => <motion.span key={i} animate={{ height: [`${h}px`, `${h + 14}px`, `${h}px`] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.14 }} className="w-3 rounded-full bg-gradient-to-t from-[#237ED3] to-[#A9DDF2]" />)}
          </div>
        </div>
        <div className="relative mx-auto mt-6 max-w-[560px]">
          <img src={vanshHero} alt="Vansh Gaikwad" className="relative z-10 mx-auto max-h-[560px] w-full object-contain drop-shadow-[0_32px_55px_rgba(24,59,91,0.18)]" />
          <div className="absolute bottom-6 left-1/2 z-20 w-[92%] -translate-x-1/2 rounded-[1.6rem] border border-white/90 bg-white/72 p-4 shadow-[0_20px_55px_rgba(24,59,91,0.12)] backdrop-blur-xl">
            <div className="grid gap-3 sm:grid-cols-3">
              {["AI clarity", "Content systems", "Human-first workflows"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl bg-[#EEF7FF]/85 px-3 py-2 text-xs font-black text-[#285E91]">
                  <CheckCircle2 className="h-4 w-4 text-[#256FBB]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function scrollToSection(id) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Field({ label, name, value, onChange, placeholder, type = "text", required = true, multiline = false }) {
  const className = "w-full rounded-2xl border border-[#D9E7F2] bg-white/78 px-4 py-3 text-sm font-bold text-[#183B5B] outline-none transition placeholder:text-[#7D96AA] focus:border-[#6DB7E8] focus:ring-4 focus:ring-[#A9DDF2]/30";
  return (
    <label className="block">
      <span className="text-sm font-black text-[#183B5B]">{label}</span>
      {multiline ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} rows={4} className={`${className} mt-2 resize-none`} />
      ) : (
        <input name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} type={type} className={`${className} mt-2`} />
      )}
    </label>
  );
}

function EnquiryForm() {
  const [form, setForm] = useState({ name: "", work: "", need: "", contact: "", budget: "", interest: "AI Clarity Call" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const enquiry = { ...form, source: "AI Clarity & Execution page", createdAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("neural-vansh-enquiries") || "[]");
    localStorage.setItem("neural-vansh-enquiries", JSON.stringify([...existing, enquiry]));

    const message = [
      "Hey Vansh, I filled the AI Clarity & Execution enquiry form.",
      `Name: ${form.name}`,
      `Business / Work Type: ${form.work}`,
      `Interested in: ${form.interest}`,
      `Need help with: ${form.need}`,
      `Contact: ${form.contact}`,
      `Budget Range: ${form.budget}`,
    ].join("\n");

    // TODO: For automatic backend delivery later, connect this form to Formspree, Google Sheets, Supabase, or a WhatsApp Business API provider.
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
    setSubmitted(true);
    setForm({ name: "", work: "", need: "", contact: "", budget: "", interest: "AI Clarity Call" });
  }

  return (
    <Card className="p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <IconTile icon={Send} tone="coral" />
        <div>
          <h3 className="text-3xl font-black tracking-[0] text-[#183B5B]">Get a clear next step</h3>
          <p className="mt-2 text-sm font-semibold leading-7 text-[#4F6B82]">Fill this in and WhatsApp opens with your project context already written to {phoneDisplay}. You only need to tap send.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
          <Field label="Business / Work Type" name="work" value={form.work} onChange={handleChange} placeholder="Creator, student, coach, shop..." />
        </div>
        <label className="block">
          <span className="text-sm font-black text-[#183B5B]">What do you want to start with?</span>
          <select name="interest" value={form.interest} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-[#D9E7F2] bg-white/78 px-4 py-3 text-sm font-bold text-[#183B5B] outline-none transition focus:border-[#6DB7E8] focus:ring-4 focus:ring-[#A9DDF2]/30">
            {starterServices.map((service) => (
              <option key={service.title} value={service.title}>{service.title}</option>
            ))}
          </select>
        </label>
        <Field label="What do you need help with?" name="need" value={form.need} onChange={handleChange} placeholder="Tell me the problem or system you want" multiline />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp / Email" name="contact" value={form.contact} onChange={handleChange} placeholder="+91... or email" />
          <Field label="Budget Range" name="budget" value={form.budget} onChange={handleChange} placeholder="Rs. 499-999 / Rs. 3k-10k..." />
        </div>
        <button type="submit" className="group mt-2 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#FF6B61] px-5 py-4 text-sm font-black text-white shadow-coral transition hover:-translate-y-0.5 hover:bg-[#F35F55] focus:outline-none focus:ring-4 focus:ring-[#A9DDF2]/60">
          Submit & Open WhatsApp
          <MessageCircle className="h-5 w-5 transition group-hover:translate-x-0.5" />
        </button>
        {submitted && (
          <div className="rounded-2xl border border-[#6DB7E8]/40 bg-[#EEF7FF] p-4 text-sm font-bold leading-6 text-[#285E91]">
            Enquiry saved. WhatsApp should now be open with your message ready to send.
          </div>
        )}
      </form>
    </Card>
  );
}

function AIClarityPage() {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(1);
  const [selectedPath, setSelectedPath] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const selectedService = starterServices[selectedServiceIndex];
  const selectedPathData = quickPaths[selectedPath];
  const SelectedServiceIcon = selectedService.icon;

  return (
    <Page>
      <section className="grid items-center gap-12 lg:grid-cols-[1.03fr_0.97fr]">
        <motion.div {...fadeUp}>
          <Eyebrow icon={Sparkles}>AI Clarity & Execution</Eyebrow>
          <DisplayTitle className="mt-7">
            Turn AI confusion into a <GradientText>simple system</GradientText> that saves time and gets work done.
          </DisplayTitle>
          <Lead className="mt-7">
            I help creators, students, freelancers, coaches, entrepreneurs, and small businesses use AI for practical execution: better content, clearer offers, faster workflows, simple websites, and small business tools.
          </Lead>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={aiClarityLink}>Book a Free AI Clarity Chat</Button>
            <ActionButton variant="secondary" onClick={() => scrollToSection("clarity-fit")}>Find My Best Start</ActionButton>
          </div>
          <div className="mt-7 flex flex-wrap gap-2 text-sm font-extrabold text-[#285E91]">
            {["Beginner-friendly", "No jargon", "WhatsApp-first", "Built for first clients"].map((item) => (
              <span key={item} className="rounded-full border border-[#D9E7F2] bg-white/62 px-3 py-2 shadow-sm">{item}</span>
            ))}
          </div>
          <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-[#4F6B82]">
            You do not need a perfect plan before messaging. Tell me what feels slow, confusing, or messy. I will help you find the smallest useful system to build first.
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
          <Card className="relative overflow-hidden p-5 sm:p-6">
            <div className="absolute right-[-90px] top-[-120px] h-72 w-72 rounded-full bg-[#A9DDF2]/45 blur-3xl" />
            <div className="relative rounded-[1.6rem] border border-[#D9E7F2] bg-gradient-to-br from-white to-[#EAF7FF] p-5">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#256FBB]">Interactive starting point</p>
                  <h2 className="mt-2 text-3xl font-black leading-tight tracking-[0] text-[#183B5B]">What do you need right now?</h2>
                </div>
                <IconTile icon={Rocket} tone="coral" />
              </div>
              <div className="mt-7 grid gap-3">
                {quickPaths.map((path, index) => (
                  <button
                    key={path.title}
                    type="button"
                    onClick={() => setSelectedPath(index)}
                    className={`group flex items-center justify-between gap-3 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 ${selectedPath === index ? "border-[#FF6B61]/45 bg-[#FF6B61]/[0.08]" : "border-[#D9E7F2] bg-white/76 hover:border-[#6DB7E8]"}`}
                  >
                    <span className="text-sm font-black leading-6 text-[#183B5B]">{path.title}</span>
                    <ChevronRight className={`h-5 w-5 shrink-0 transition ${selectedPath === index ? "text-[#FF6B61]" : "text-[#6DB7E8] group-hover:translate-x-0.5"}`} />
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-[#D9E7F2] bg-white p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#FF6B61]">{selectedPathData.signal}</p>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#4F6B82]">{selectedPathData.result}</p>
                <Button href={aiClarityLink} className="mt-5 w-full">{selectedPathData.cta}</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="mt-20 rounded-[2rem] bg-[#EEF5FA] p-5 sm:p-8">
        <motion.div {...fadeUp}>
          <Eyebrow icon={AlertCircle}>Problem</Eyebrow>
          <SectionTitle className="mt-6">AI feels powerful... <GradientText>until you try to use it for real work.</GradientText></SectionTitle>
          <Lead className="mt-5">Most people do not need more tools. They need a clearer system, sharper prompts, and one practical workflow that fits their daily work.</Lead>
        </motion.div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {clarityProblems.map(([title, text], index) => (
            <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
              <InteractiveShell className="h-full">
                <Card className="h-full p-6 hover:bg-white hover:shadow-glow">
                  <IconTile icon={index === 0 ? Search : index === 1 ? CalendarDays : index === 2 ? FileText : Workflow} tone={index === 1 ? "coral" : "blue"} />
                  <h3 className="mt-5 text-xl font-black tracking-[0] text-[#0C2B63]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#4F6B82]">{text}</p>
                </Card>
              </InteractiveShell>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {clarityOutcomes.map(([title, text, Icon], index) => (
          <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
            <InteractiveShell className="h-full">
              <Card className="h-full p-6 hover:bg-white hover:shadow-glow">
                <IconTile icon={Icon} tone={index === 2 ? "coral" : "blue"} />
                <h3 className="mt-5 text-xl font-black tracking-[0] text-[#183B5B]">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#4F6B82]">{text}</p>
              </Card>
            </InteractiveShell>
          </motion.div>
        ))}
      </section>

      <section id="clarity-fit" className="mt-20 scroll-mt-28 rounded-[2rem] border border-[#D9E7F2] bg-white/62 p-5 shadow-soft sm:p-8">
        <motion.div {...fadeUp} className="max-w-4xl">
          <Eyebrow icon={MousePointerClick}>Choose your path</Eyebrow>
          <SectionTitle className="mt-6">Not sure what to buy? Start with the problem you already feel.</SectionTitle>
          <Lead className="mt-5">Click the closest situation. The page will point you toward the simplest first service, so you do not overthink the decision.</Lead>
        </motion.div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-3">
            {quickPaths.map((path, index) => (
              <button
                key={path.title}
                type="button"
                onClick={() => setSelectedPath(index)}
                className={`rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 ${selectedPath === index ? "border-[#FF6B61]/45 bg-[#FF6B61]/[0.08] shadow-coral" : "border-[#D9E7F2] bg-white/78 hover:border-[#6DB7E8] hover:shadow-glow"}`}
              >
                <p className="text-base font-black text-[#183B5B]">{path.title}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#4F6B82]">{path.signal}</p>
              </button>
            ))}
          </div>
          <Card className="p-6">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#FF6B61]">Recommended starting move</p>
            <h3 className="mt-4 text-3xl font-black leading-tight tracking-[0] text-[#183B5B]">{selectedPathData.signal}</h3>
            <p className="mt-4 text-base font-semibold leading-8 text-[#4F6B82]">{selectedPathData.result}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Low-risk start", "Clear next action", "WhatsApp discussion"].map((item) => (
                <div key={item} className="rounded-2xl border border-[#D9E7F2] bg-[#F7FBFF] p-4 text-sm font-black text-[#285E91]">{item}</div>
              ))}
            </div>
            <Button href={aiClarityLink} className="mt-7">Message Me About This</Button>
          </Card>
        </div>
      </section>

      <section id="clarity-services" className="mt-20 scroll-mt-28">
        <motion.div {...fadeUp} className="max-w-4xl">
          <Eyebrow icon={BriefcaseBusiness}>Starter services</Eyebrow>
          <SectionTitle className="mt-6">Starter offers that make the next step feel obvious.</SectionTitle>
          <Lead className="mt-5">Pick the offer closest to your current problem. Every service is built to create a clear output, not vague advice.</Lead>
        </motion.div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {starterServices.map(({ icon: Icon, title, price, description, bestFor, quickWin }, index) => (
            <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
              <InteractiveShell className="h-full">
                <Card className={`flex h-full cursor-pointer flex-col p-6 hover:bg-white/86 hover:shadow-glow ${selectedServiceIndex === index ? "ring-2 ring-[#FF6B61]/45" : ""}`} onClick={() => setSelectedServiceIndex(index)}>
                  <IconTile icon={Icon} tone={index === 0 || index === 3 ? "coral" : "blue"} />
                  <h3 className="mt-5 text-2xl font-black tracking-[0] text-[#0C2B63]">{title}</h3>
                  <p className="mt-3 inline-flex w-fit rounded-full bg-[#FF6B61]/10 px-3 py-1 text-sm font-black text-[#E5544D]">{price}</p>
                  <p className="mt-4 flex-1 text-sm font-semibold leading-7 text-[#4F6B82]">{description}</p>
                  <div className="mt-5 rounded-2xl border border-[#D9E7F2] bg-[#F7FBFF] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-[#285E91]">Best if</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#4F6B82]">{bestFor}</p>
                  </div>
                  <p className="mt-4 text-sm font-black text-[#183B5B]">{quickWin}</p>
                  <Button href={aiClarityLink} className="mt-6 w-full" variant={index === selectedServiceIndex ? "primary" : "secondary"}>Ask About This</Button>
                </Card>
              </InteractiveShell>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-8">
          <Card className="grid gap-6 p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <IconTile icon={SelectedServiceIcon} tone="coral" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#FF6B61]">Selected service</p>
              <h3 className="mt-2 text-2xl font-black tracking-[0] text-[#183B5B]">{selectedService.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#4F6B82]">{selectedService.outcome}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedService.includes.map((item) => (
                  <span key={item} className="rounded-full border border-[#D9E7F2] bg-[#F7FBFF] px-3 py-2 text-xs font-black text-[#285E91]">{item}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#D9E7F2] bg-[#EEF5FA] p-5 text-left lg:w-56">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#7D96AA]">Timeline</p>
              <p className="mt-2 text-lg font-black text-[#183B5B]">{selectedService.timeline}</p>
              <Button href={aiClarityLink} className="mt-5 w-full">Start This</Button>
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-start">
        <motion.div {...fadeUp}>
          <Eyebrow icon={Users}>Best for</Eyebrow>
          <SectionTitle className="mt-6">Built for beginners, builders, and busy people.</SectionTitle>
          <Lead className="mt-5">If you know AI can help but do not know where to start, this page is for you. You can start with a small call, a simple workflow, or one client-ready asset.</Lead>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-2">
          {bestForAudiences.map((audience, index) => (
            <motion.div key={audience} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.025 }} className="rounded-2xl border border-[#D9E7F2] bg-white/70 px-5 py-4 text-sm font-black text-[#285E91] shadow-sm">
              {audience}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-[2rem] bg-[#EEF5FA] p-5 sm:p-8">
        <motion.div {...fadeUp}>
          <Eyebrow icon={FolderOpen}>Sample work</Eyebrow>
          <SectionTitle className="mt-6">Sample Work & <BlueText>Demo Assets</BlueText></SectionTitle>
          <Lead className="mt-5">No fake testimonials. Since I am early, I use demo assets and sample systems to show how I think, structure, and execute before you pay.</Lead>
        </motion.div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {demoAssets.map(([title, text, Icon], index) => (
            <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }}>
              <InteractiveShell className="h-full">
                <Card className="flex h-full flex-col p-6 hover:bg-white hover:shadow-glow">
                  <IconTile icon={Icon} tone={index === 1 ? "coral" : "blue"} />
                  <h3 className="mt-5 text-xl font-black tracking-[0] text-[#0C2B63]">{title}</h3>
                  <p className="mt-3 flex-1 text-sm font-semibold leading-7 text-[#4F6B82]">{text}</p>
                  <Button href={aiClarityLink} className="mt-6 w-full" variant="secondary">Ask Me For Sample</Button>
                </Card>
              </InteractiveShell>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
        <motion.div {...fadeUp}>
          <Eyebrow icon={Map}>Process</Eyebrow>
          <SectionTitle className="mt-6">How working with me works</SectionTitle>
          <Lead className="mt-5">The process is designed for direct conversations, fast clarity, and useful delivery without unnecessary complexity.</Lead>
        </motion.div>
        <div className="grid gap-4">
          {processSteps.map((step, index) => (
            <motion.div key={step} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }} className="flex gap-4 rounded-2xl border border-[#D9E7F2] bg-white/72 p-5 shadow-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FF6B61] text-sm font-black text-white">0{index + 1}</span>
              <p className="self-center text-base font-black text-[#183B5B]">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section {...fadeUp} className="mt-20">
        <Card className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.75fr_1fr] lg:items-center">
          <div>
            <Eyebrow icon={ShieldCheck}>Beginner trust</Eyebrow>
            <h2 className="mt-6 text-3xl font-black leading-tight tracking-[0] text-[#183B5B] sm:text-4xl">Built for people who want simple AI execution, not complicated tech.</h2>
          </div>
          <p className="text-base font-semibold leading-8 text-[#36597E]">
            I focus on practical, beginner-friendly AI systems that save time, improve clarity, and help you move faster. No overcomplicated dashboards. No confusing jargon. No pretending AI replaces your thinking. Just useful execution that supports your creativity, judgment, and business goals.
          </p>
        </Card>
      </motion.section>

      <section className="mt-20">
        <motion.div {...fadeUp} className="max-w-4xl">
          <Eyebrow icon={MessageSquare}>Questions</Eyebrow>
          <SectionTitle className="mt-6">Questions prospects usually ask before messaging.</SectionTitle>
        </motion.div>
        <div className="mt-10 grid gap-4">
          {clarityFaqs.map(([question, answer], index) => (
            <motion.div key={question} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#D9E7F2] bg-white/72 p-5 text-left shadow-sm transition hover:border-[#6DB7E8] hover:bg-white"
              >
                <span className="text-base font-black text-[#183B5B]">{question}</span>
                <ChevronRight className={`h-5 w-5 shrink-0 text-[#6DB7E8] transition ${openFaq === index ? "rotate-90" : ""}`} />
              </button>
              {openFaq === index && (
                <div className="rounded-b-2xl border-x border-b border-[#D9E7F2] bg-[#F7FBFF] px-5 pb-5 pt-1 text-sm font-semibold leading-7 text-[#4F6B82]">
                  {answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="clarity-enquiry" className="mt-20 grid scroll-mt-28 gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-start">
        <motion.div {...fadeUp}>
          <Eyebrow icon={MessageCircle} tone="coral">Start here</Eyebrow>
          <SectionTitle className="mt-6">Want me to help you find the smartest first move?</SectionTitle>
          <Lead className="mt-5">Send the enquiry or message me directly. I will look at your situation and tell you the most practical starter step: clarity call, workflow, content system, page, or mini tool.</Lead>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={aiClarityLink}>Message Me on WhatsApp</Button>
            <ActionButton variant="secondary" onClick={() => scrollToSection("clarity-enquiry")}>Send Enquiry</ActionButton>
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-[#D9E7F2] bg-white/66 p-5">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-[#FF6B61]">Low-pressure first step</p>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#4F6B82]">You do not need to know the exact solution. Just tell me what feels slow, confusing, or repetitive. I will translate that into a practical AI or content workflow.</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
          <EnquiryForm />
        </motion.div>
      </section>
    </Page>
  );
}

function HomePage({ navigate }) {
  return (
    <Page>
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div {...fadeUp}>
          <Eyebrow icon={Bot}>Human-first AI for clarity, content, and workflows</Eyebrow>
          <DisplayTitle className="mt-7">
            <GradientText>Create better content.</GradientText> Cut the busywork. <BlueText>Make AI work for you.</BlueText>
          </DisplayTitle>
          <Lead className="mt-7">
            I'm Vansh. I help creators and small businesses choose the right AI tools, improve their content, and simplify repetitive tasks—so you can focus on the work that grows your business.
          </Lead>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={aiClarityLink}>Book a Free AI Clarity Chat</Button>
            <ActionButton variant="secondary" onClick={() => navigate("services")}>See How I Can Help</ActionButton>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["AI clarity", "Content systems", "Done-for-you workflows"].map((item) => (
              <div key={item} className="rounded-2xl border border-[#D9E7F2] bg-white/58 px-4 py-3 text-sm font-extrabold text-[#285E91] shadow-sm backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
        <HeroVisual />
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {valueCards.map(({ icon: Icon, title, text }, index) => (
          <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }}>
            <InteractiveShell className="h-full">
              <Card className="group h-full cursor-default p-6 hover:bg-white/82 hover:shadow-glow">
                <IconTile icon={Icon} tone={index === 1 ? "coral" : "blue"} />
                <h3 className="mt-5 text-2xl font-black tracking-[0] text-[#0C2B63]">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#4F6B82]">{text}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-black text-[#256FBB] opacity-0 transition group-hover:opacity-100">
                  <MousePointerClick className="h-4 w-4" />
                  Explore this angle
                </div>
              </Card>
            </InteractiveShell>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp} className="mt-16">
        <Card className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-3xl font-black leading-tight tracking-[0] text-[#071F52] sm:text-4xl">Confused by AI tools? <GradientText>Start with one clear system.</GradientText></p>
            <p className="mt-3 max-w-3xl text-base font-medium leading-8 text-[#36597E]">We pick the right tools, map your repeatable tasks, improve your content engine, and make AI support the work that actually matters.</p>
          </div>
          <Button href={aiClarityLink}>Start With Clarity</Button>
        </Card>
      </motion.div>
    </Page>
  );
}

function ServicesPage() {
  return (
    <Page>
      <motion.div {...fadeUp} className="max-w-5xl">
        <Eyebrow icon={Star}>Services & offers</Eyebrow>
        <SectionTitle className="mt-7">AI guidance, <BlueText>smarter content</BlueText>, and repeatable <GradientText>systems.</GradientText></SectionTitle>
        <Lead className="mt-6">Three clear service paths built for people who want practical AI adoption, stronger content, better workflows, and more confident execution.</Lead>
      </motion.div>

      <div className="mt-14 space-y-16">
        {serviceCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;
          return (
            <motion.div key={category.title} {...fadeUp}>
              <Card className="overflow-hidden p-5 sm:p-7">
                <div className="grid gap-7 lg:grid-cols-[0.45fr_1fr]">
                  <div className="rounded-[1.6rem] border border-[#D9E7F2]/80 bg-gradient-to-br from-white to-[#EAF7FF] p-6">
                    <IconTile icon={CategoryIcon} className="h-16 w-16" tone={categoryIndex === 2 ? "coral" : "blue"} />
                    <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#FF6B61]">{category.eyebrow}</p>
                    <h2 className="mt-3 text-4xl font-black leading-[0.94] tracking-[0] text-[#071F52]">{category.title}</h2>
                    <p className="mt-5 text-sm font-semibold leading-7 text-[#36597E]">{category.intro}</p>
                  </div>

                  <div className="grid gap-5 xl:grid-cols-3">
                    {category.offers.map((offer) => (
                      <motion.div key={offer.name} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 240, damping: 20 }} className={`relative rounded-[1.6rem] border p-5 transition hover:shadow-glow ${offer.featured ? "border-[#FF6B61]/35 bg-white shadow-[0_20px_55px_rgba(255,107,97,0.12)]" : "border-[#D9E7F2] bg-white/62"}`}>
                        {offer.featured && <span className="absolute right-4 top-4 rounded-full bg-[#FF6B61] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">Best fit</span>}
                        <h3 className="pr-20 text-2xl font-black tracking-[0] text-[#0C2B63]">{offer.name}</h3>
                        <p className="mt-3 text-sm font-semibold leading-6 text-[#4F6B82]">{offer.description}</p>
                        <div className="mt-5 rounded-2xl bg-[#EEF7FF]/80 p-4">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-[#256FBB]">Who it is for</p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-[#36597E]">{offer.for}</p>
                        </div>
                        <div className="mt-5 space-y-2.5">
                          {offer.gets.map((item) => (
                            <div key={item} className="flex gap-2 text-sm font-semibold leading-6 text-[#4F6B82]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#256FBB]" />{item}</div>
                          ))}
                        </div>
                        <div className="mt-5 rounded-2xl border border-[#D9E7F2] bg-white/72 p-4">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-[#FF6B61]">Outcome</p>
                          <p className="mt-2 text-sm font-bold leading-6 text-[#183B5B]">{offer.outcome}</p>
                        </div>
                        <Button href={categoryIndex === 1 ? contentStrategyLink : aiClarityLink} className="mt-5 w-full" variant={offer.featured ? "primary" : "secondary"}>{offer.cta}</Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Page>
  );
}

function ToolsPage() {
  return (
    <Page>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.72fr] lg:items-center">
        <motion.div {...fadeUp}>
          <Eyebrow icon={Gem}>Tools I use</Eyebrow>
          <SectionTitle className="mt-7">Tools I use to build <BlueText>smarter systems.</BlueText></SectionTitle>
          <Lead className="mt-6">I use a practical mix of AI, content, research, automation, and deployment tools - not because they are trendy, but because they help people work better.</Lead>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
          <Card className="group overflow-hidden p-4 hover:shadow-glow">
            <div className="relative overflow-hidden rounded-[1.55rem] bg-gradient-to-br from-white via-[#F7FBFF] to-[#EAF7FF]">
              <motion.img
                src={vanshRobot}
                alt="Vansh with AI robot"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.45 }}
                className="h-auto max-h-[560px] w-full object-contain object-top"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/50 to-transparent" />
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {toolGroups.map(({ title, tools, icon: Icon }, index) => (
          <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
            <InteractiveShell className="h-full">
            <Card className="h-full p-6 hover:bg-white/82 hover:shadow-glow">
              <div className="flex items-center gap-4">
                <IconTile icon={Icon} tone={index % 2 ? "coral" : "blue"} />
                <h3 className="text-2xl font-black tracking-[0] text-[#0C2B63]">{title}</h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {tools.map((tool) => <span key={tool} className="rounded-full border border-[#D9E7F2] bg-white/72 px-3 py-2 text-xs font-black text-[#285E91] shadow-sm">{tool}</span>)}
              </div>
            </Card>
            </InteractiveShell>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

function PortfolioPage() {
  return (
    <Page>
      <motion.div {...fadeUp} className="max-w-5xl">
        <Eyebrow icon={BriefcaseBusiness}>Portfolio</Eyebrow>
        <SectionTitle className="mt-7">Selected work & <GradientText>sample directions.</GradientText></SectionTitle>
        <Lead className="mt-6">A clear showcase of assets and systems I can build or improve. These cards are structured placeholders, so you can replace them with real project links later.</Lead>
      </motion.div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {portfolio.slice(0, 8).map(([title, text, Icon, tags], index) => (
          <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
            <InteractiveShell className="h-full">
            <Card className="group relative h-full overflow-hidden p-6 transition hover:bg-white/82 hover:shadow-glow">
              <div className="absolute right-[-42px] top-[-42px] h-36 w-36 rounded-full bg-[#6DB7E8]/20 blur-2xl" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4"><IconTile icon={Icon} tone={index % 3 === 0 ? "coral" : "blue"} /><span className="rounded-full border border-[#D9E7F2] bg-white/70 px-3 py-1 text-xs font-black text-[#4F6B82]">0{index + 1}</span></div>
                <h3 className="mt-6 text-2xl font-black tracking-[0] text-[#0C2B63]">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#4F6B82]">{text}</p>
                <div className="mt-5 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-[#EEF7FF] px-3 py-1 text-[11px] font-black text-[#256FBB]">{tag}</span>)}</div>
              </div>
            </Card>
            </InteractiveShell>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

function ResourcesPage() {
  return (
    <Page>
      <motion.div {...fadeUp} className="max-w-5xl">
        <Eyebrow icon={FileText}>Free resources</Eyebrow>
        <SectionTitle className="mt-7">Free AI resources to <BlueText>start smarter.</BlueText></SectionTitle>
        <Lead className="mt-6">Practical resources for beginners, creators, freelancers, and small business owners. Links can be added later when each resource is ready.</Lead>
      </motion.div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {resources.map(([title, text, button], index) => (
          <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.045 }}>
            <InteractiveShell className="h-full">
            <Card className="flex h-full flex-col p-6 hover:bg-white/82 hover:shadow-glow">
              <IconTile icon={index % 2 ? Lightbulb : BookIcon} tone={index === 4 ? "coral" : "blue"} />
              <h3 className="mt-5 text-2xl font-black tracking-[0] text-[#0C2B63]">{title}</h3>
              <p className="mt-3 flex-1 text-sm font-semibold leading-7 text-[#4F6B82]">{text}</p>
              <button className="mt-6 inline-flex items-center justify-center rounded-2xl border border-[#BFD8EC] bg-white/74 px-4 py-3 text-sm font-black text-[#285E91]">{button}</button>
            </Card>
            </InteractiveShell>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

function BookIcon(props) {
  return <FileText {...props} />;
}

function AboutPage() {
  return (
    <Page>
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center">
        <motion.div {...fadeUp}>
          <Card className="relative overflow-hidden p-5">
            <div className="absolute inset-x-8 bottom-10 h-72 rounded-full bg-[#6DB7E8]/25 blur-3xl" />
            <img src={vanshDark} alt="Vansh Gaikwad" className="relative mx-auto max-h-[660px] w-full object-contain drop-shadow-[0_32px_60px_rgba(24,59,91,0.20)]" />
          </Card>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
          <Eyebrow icon={Sparkles}>About Vansh</Eyebrow>
          <SectionTitle className="mt-7">I grew up early with tech. Now I help people use it <GradientText>more intelligently.</GradientText></SectionTitle>
          <div className="mt-7 space-y-5 text-base font-semibold leading-8 text-[#36597E] sm:text-lg sm:leading-9">
            <p>I'm Vansh Gaikwad, based in Pune, and I've been around technology and internet culture from a very young age. I got access to a personal phone while I was still in school, which exposed me to the internet, social media, and digital behavior earlier than most people around me.</p>
            <p>From the Facebook era to today's creator platforms, I've spent years observing how content gets attention, what makes people click, and how technology changes the way people learn, work, and buy.</p>
            <p>That shaped how I think today: AI should not replace human creativity, judgment, or thinking. It should reduce repeated work, improve clarity, and help people focus more on the human work that actually matters.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Young, but deeply exposed to tech", "Content + attention focused", "Beginner-friendly AI execution"].map((item) => <div key={item} className="rounded-2xl border border-[#D9E7F2] bg-white/62 p-4 text-sm font-black leading-6 text-[#285E91] shadow-sm">{item}</div>)}
          </div>
        </motion.div>
      </div>
    </Page>
  );
}

function ContactPage() {
  return (
    <Page>
      <div className="grid gap-10 lg:grid-cols-[0.95fr_0.75fr] lg:items-start">
        <motion.div {...fadeUp}>
          <Eyebrow icon={Rocket} tone="coral">Final CTA</Eyebrow>
          <SectionTitle className="mt-7">Let's build smarter, <GradientText>not just faster.</GradientText></SectionTitle>
          <Lead className="mt-6">Want to use AI for productivity, content, lead generation, or business clarity? Start with a free call and I'll help you see what to fix first.</Lead>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={aiClarityLink}>Book Free AI Clarity Call</Button>
            <Button href={contentStrategyLink} variant="secondary">Book Free Content Strategy Call</Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              [Target, "Clear Strategy", "Smart direction that drives real action."],
              [Workflow, "Actionable Systems", "Workflows you can implement today."],
              [Users, "Creator-Focused", "Guidance built for creators like you."],
            ].map(([Icon, title, text]) => <Card key={title} className="p-5"><Icon className="h-7 w-7 text-[#256FBB]" /><p className="mt-3 text-sm font-black text-[#183B5B]">{title}</p><p className="mt-1 text-xs font-semibold leading-5 text-[#4F6B82]">{text}</p></Card>)}
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <img src={logoWordmark} alt="Neural Vansh" className="h-12 w-auto max-w-[220px] object-contain" />
            </div>
            <p className="mt-5 text-base font-semibold leading-8 text-[#36597E]">AI execution partner for creators, founders, students, freelancers, coaches, and small businesses.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {contacts.map(({ label, href, icon: Icon, detail }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="flex items-center gap-3 rounded-2xl border border-[#D9E7F2] bg-white/62 p-4 text-sm font-black text-[#285E91] transition hover:-translate-y-0.5 hover:bg-white">
                  <Icon className="h-5 w-5 text-[#256FBB]" />
                  <span>
                    <span className="block">{label}</span>
                    {detail && <span className="mt-1 block text-xs font-bold text-[#4F6B82]">{detail}</span>}
                  </span>
                </a>
              ))}
            </div>
            <a href={aiClarityLink} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-between gap-4 rounded-[1.35rem] border border-[#FF6B61]/30 bg-[#FF6B61]/10 p-4 text-sm font-black text-[#E5544D] transition hover:-translate-y-0.5 hover:bg-[#FF6B61]/15">
              <span>WhatsApp me directly at {phoneDisplay}</span>
              <MessageCircle className="h-5 w-5 shrink-0" />
            </a>
            <div className="mt-7 rounded-[1.5rem] bg-gradient-to-br from-[#EAF7FF] to-white p-5">
              <p className="text-2xl font-black leading-tight tracking-[0] text-[#071F52]">Better prompts. <BlueText>Smarter systems.</BlueText> Stronger impact.</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#4F6B82]">Use AI to support your thinking, speed up repetitive work, and create better outputs with more clarity.</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </Page>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="border-t border-white/70 bg-white/45 py-10 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">
        <button type="button" onClick={() => navigate("home")} className="mx-auto lg:mx-0"><img src={logoWordmark} alt="Neural Vansh" className="h-10 w-auto max-w-[210px] object-contain" /></button>
        <p className="text-sm font-bold text-[#4F6B82]">Better Prompts. Smarter Systems. Stronger Impact.</p>
        <p className="text-sm font-black text-[#183B5B]">Let's build <span className="text-[#256FBB]">the future</span> together. <Heart className="inline h-4 w-4 fill-[#FF6B61] text-[#FF6B61]" /></p>
      </div>
    </footer>
  );
}

function FloatingCTA({ activePage }) {
  if (activePage === "contact") return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <motion.a
        href={contentStrategyLink}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="hidden rounded-2xl border border-[#BFD8EC] bg-white/86 px-4 py-3 text-xs font-black text-[#285E91] shadow-soft backdrop-blur-xl sm:inline-flex"
      >
        Content call
      </motion.a>
      <motion.a
        href={aiClarityLink}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-3 rounded-full bg-[#FF6B61] px-5 py-4 text-sm font-black text-white shadow-coral"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Book AI Call</span>
      </motion.a>
    </div>
  );
}

function renderPage(activePage, navigate) {
  switch (activePage) {
    case "clarity": return <AIClarityPage />;
    case "services": return <ServicesPage />;
    case "tools": return <ToolsPage />;
    case "portfolio": return <PortfolioPage />;
    case "resources": return <ResourcesPage />;
    case "about": return <AboutPage />;
    case "contact": return <ContactPage />;
    default: return <HomePage navigate={navigate} />;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState(getInitialPage);
  const activeLabel = useMemo(() => pages.find((page) => page.id === activePage)?.label || "Home", [activePage]);
  const descriptions = {
    home: "Neural Vansh helps creators, founders, students, freelancers, coaches, and small businesses use AI with more clarity, productivity, and confidence.",
    clarity: "AI Clarity & Execution services by Neural Vansh: beginner-friendly AI calls, workflows, content systems, landing pages, and mini business tools.",
    services: "Explore Neural Vansh AI consulting, content enhancement, workflow setup, and done-for-you AI business systems.",
    tools: "Tools Neural Vansh uses for AI assistants, content, automation, websites, knowledge systems, research, and productivity.",
    portfolio: "Sample Neural Vansh portfolio categories including high-CTR visuals, content strategy, AI workflows, landing pages, and mini systems.",
    resources: "Free AI resources from Neural Vansh for smarter prompting, content creation, AI image generation, and practical AI use.",
    about: "Meet Vansh Gaikwad from Pune, an AI and tech enthusiast helping people use AI without replacing human creativity.",
    contact: "Contact Neural Vansh for AI clarity, content strategy, productivity workflows, lead generation, and simple AI systems.",
  };

  useEffect(() => {
    const onHashChange = () => setActivePage(getInitialPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = `${activeLabel} | Neural Vansh`;
    const description = descriptions[activePage] || descriptions.home;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [activeLabel, activePage]);

  function navigate(pageId) {
    const nextPage = pages.some((page) => page.id === pageId) ? pageId : "home";
    setActivePage(nextPage);
    if (typeof window !== "undefined") {
      window.location.hash = nextPage;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className="min-h-screen bg-[#F7FBFF] font-sans text-[#183B5B] selection:bg-[#A9DDF2] selection:text-[#183B5B]">
      <Header activePage={activePage} navigate={navigate} />
      {renderPage(activePage, navigate)}
      <FloatingCTA activePage={activePage} />
      <Footer navigate={navigate} />
    </main>
  );
}
