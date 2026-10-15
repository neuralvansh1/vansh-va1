import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { sendEnquiry } from "./enquiry";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  Menu,
  X,
  Plus,
  Mail,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import {
  EMAIL,
  PHONE,
  SITE_URL,
  navigation,
  routeMetadata,
  services,
  startingPoints,
  steps,
  questions,
  whatsapp,
} from "./content";

const Router = createContext({ path: "/", navigate: () => {} });
const normalizePath = (value) => value.replace(/\/+$/, "") || "/";
const media = (name) => `/media/${name}`;

function Link({ to, children, className = "", onClick, ...props }) {
  const { navigate } = useContext(Router);
  return (
    <a
      href={to}
      className={className}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

function Action({
  to = "/contact",
  children = "Start a conversation",
  light = false,
  className = "",
  external = false,
}) {
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={19} aria-hidden="true" />
    </>
  );
  const classes = `action ${light ? "action-light" : ""} ${className}`;
  return external ? (
    <a className={classes} href={to} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <Link className={classes} to={to}>
      {content}
    </Link>
  );
}

function TextLink({ to, children, light = false }) {
  return (
    <Link to={to} className={`text-link ${light ? "text-link-light" : ""}`}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}

function Label({ children, number, light = false }) {
  return (
    <div className={`section-label ${light ? "label-light" : ""}`}>
      <span className="label-mark" />
      {number && <span>{number} /</span>}
      {children}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0, ...props }) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}

function Header() {
  const { path } = useContext(Router);
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const key = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Neural Vansh home">
        neural
        <span>
          vansh<span className="brand-dot">.</span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.slice(1).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            aria-current={path === item.path ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link to="/contact" className="header-contact">
        Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
      <button
        id="menu-toggle"
        className="menu-toggle"
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav
          ref={panel}
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ...navigation,
            { path: "/contact", label: "Start a conversation" },
          ].map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              aria-current={path === item.path ? "page" : undefined}
            >
              <span>0{index + 1}</span>
              {item.label}
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div>
          <Label light>A good place to begin</Label>
          <h2>
            Tell me what
            <br />
            you’re <em>building.</em>
          </h2>
        </div>
        <div className="footer-invite">
          <p>
            A rough idea is enough.
            <br />
            We can find the useful next step together.
          </p>
          <Action to="/contact" light>
            Start a conversation
          </Action>
        </div>
      </div>
      <div className="footer-middle wrap">
        <Link to="/" className="brand footer-brand">
          neural<span>vansh.</span>
        </Link>
        <div>
          <span className="tiny-label">Say hello</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={whatsapp()} target="_blank" rel="noreferrer">
            WhatsApp <ArrowUpRight size={14} />
          </a>
        </div>
        <div>
          <span className="tiny-label">Find your way</span>
          {navigation.slice(1).map((item) => (
            <Link to={item.path} key={item.path}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <span className="tiny-label">Elsewhere</span>
          <a
            href="https://www.linkedin.com/in/neural-vansh-3103m008/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <a
            href="https://www.youtube.com/@NeuralVansh"
            target="_blank"
            rel="noreferrer"
          >
            YouTube <ArrowUpRight size={13} />
          </a>
          <span className="footer-location">
            Pune, India.
            <br />
            Open to conversations everywhere.
          </span>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© 2026 Neural Vansh. All rights reserved.</span>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

function Portrait({ about = false }) {
  return (
    <figure className={`portrait ${about ? "portrait-about" : ""}`}>
      <div className="portrait-image">
        <img
          src={media("vansh-editorial.webp")}
          width="1200"
          height="1500"
          alt="Vansh Gaikwad, founder of Neural Vansh and co-founder of Presenzo Media"
          fetchpriority={about ? "auto" : "high"}
          loading={about ? "lazy" : "eager"}
        />
        <span className="portrait-edge" aria-hidden="true">
          A human point of view.
        </span>
      </div>
      <figcaption>
        <span>Vansh Gaikwad</span>
        <span>
          Pune, India <span className="small-square" />
        </span>
      </figcaption>
    </figure>
  );
}

function PageIntro({ label, title, description, children }) {
  return (
    <section className="page-intro wrap">
      <Label>{label}</Label>
      <h1 className="page-title entrance">{title}</h1>
      <div className="intro-bottom">
        <p className="lead entrance delay-1">{description}</p>
        {children}
      </div>
    </section>
  );
}

function StartFinder({ compact = false }) {
  const [selected, setSelected] = useState(0);
  const choice = startingPoints[selected];
  return (
    <div className={`start-finder ${compact ? "finder-compact" : ""}`}>
      <div
        className="finder-options"
        role="tablist"
        aria-label="Find your starting point"
      >
        {startingPoints.map((item, index) => (
          <button
            key={item.key}
            id={`start-tab-${item.key}`}
            role="tab"
            aria-selected={selected === index}
            aria-controls="starting-point-result"
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              if (
                [
                  "ArrowDown",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowLeft",
                  "Home",
                  "End",
                ].includes(event.key)
              ) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 3
                      : (selected +
                          (["ArrowDown", "ArrowRight"].includes(event.key)
                            ? 1
                            : 3)) %
                        4;
                setSelected(next);
                document
                  .getElementById(`start-tab-${startingPoints[next].key}`)
                  ?.focus();
              }
            }}
            tabIndex={selected === index ? 0 : -1}
          >
            <span className="finder-number">0{index + 1}</span>
            <span>{item.label}</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        className="finder-result"
        role="tabpanel"
        id="starting-point-result"
        aria-labelledby={`start-tab-${choice.key}`}
        tabIndex={0}
      >
        <span className="tiny-label">A sensible first step</span>
        <h3 key={choice.key} className="result-title">
          {choice.result}
        </h3>
        <p>{choice.detail}</p>
        <div className="finder-output">
          <Check size={17} aria-hidden="true" />
          <span>{choice.output}</span>
        </div>
        <TextLink to={choice.path}>Explore this direction</TextLink>
      </div>
    </div>
  );
}

function ServiceRows() {
  return (
    <div className="service-rows">
      {services.map((service) => (
        <Reveal key={service.id}>
          <Link to={`/services#${service.id}`} className="service-row">
            <span className="row-number">{service.number}</span>
            <div>
              <span className="tiny-label">{service.label}</span>
              <h3>{service.short}</h3>
            </div>
            <p>{service.description}</p>
            <span className="row-arrow">
              <ArrowUpRight size={28} aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

function VideoExample({ second = false }) {
  return (
    <figure className="video-example">
      <div className="video-frame">
        <video
          controls
          playsInline
          preload="none"
          poster={media(
            second ? "one-brief-cover.webp" : "clarity-reel-cover.webp",
          )}
          aria-label={
            second
              ? "Neural Vansh: one brief becomes a content system"
              : "Neural Vansh: Tools se pehle, clarity"
          }
        >
          <source
            src={media(
              second ? "one-brief-reel.mp4" : "tools-se-pehle-clarity.mp4",
            )}
            type="video/mp4"
          />
          <track
            kind="captions"
            src={media(second ? "one-brief.vtt" : "clarity-reel.vtt")}
            srcLang="hi"
            label="Hinglish captions"
            default
          />
          Your browser cannot play this video.{" "}
          <a
            href={media(
              second ? "one-brief-reel.mp4" : "tools-se-pehle-clarity.mp4",
            )}
          >
            Open the reel
          </a>
          .
        </video>
        <span className="video-corner" aria-hidden="true">
          NV / ORIGINAL
        </span>
      </div>
      <figcaption>
        <span>
          {second
            ? "One brief. A clearer content system."
            : "Tools se pehle, clarity."}
        </span>
        <span>Neural Vansh · Self-initiated reel</span>
      </figcaption>
    </figure>
  );
}

function SiteExample() {
  const [active, setActive] = useState(0);
  const notes = [
    [
      "A clearer first impression",
      "The first screen says who the work is for and gives the visitor one clear way to begin.",
    ],
    [
      "Proof you can explore",
      "Watch the actual reels, follow the diagrams and inspect the responsive website you are using.",
    ],
    [
      "A useful next step",
      "Visitors can find the right service, send an enquiry or continue a conversation on WhatsApp.",
    ],
  ];
  return (
    <div className="site-example">
      <div className="browser-frame">
        <div className="browser-bar">
          <span className="browser-dots" aria-hidden="true">
            •••
          </span>
          <span>neuralvansh.online</span>
          <ArrowUpRight size={14} />
        </div>
        <img
          src={media("website-redesign.webp")}
          alt="The redesigned Neural Vansh homepage, a real website built and maintained by Vansh"
          width="1400"
          height="970"
          loading="lazy"
        />
      </div>
      <div
        className="site-annotations"
        role="tablist"
        aria-label="What this website demonstrates"
      >
        {notes.map(([title], index) => (
          <button
            key={title}
            id={`site-note-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls="site-note-panel"
            onClick={() => setActive(index)}
            tabIndex={active === index ? 0 : -1}
            onKeyDown={(event) => {
              if (
                ["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 2
                      : (active + (event.key === "ArrowRight" ? 1 : 2)) % 3;
                setActive(next);
                document.getElementById(`site-note-${next}`)?.focus();
              }
            }}
          >
            <span>0{index + 1}</span>
            {title}
          </button>
        ))}
      </div>
      <p
        role="tabpanel"
        id="site-note-panel"
        tabIndex={0}
        aria-labelledby={`site-note-${active}`}
        className="site-note"
      >
        {notes[active][1]}
      </p>
    </div>
  );
}

function BriefMap() {
  const [selected, setSelected] = useState(0);
  const branches = [
    {
      label: "Who is this for?",
      detail:
        "In the clarity reel: people who save AI tools but still feel stuck with their work.",
    },
    {
      label: "What should change?",
      detail:
        "Move from collecting tools to choosing one repeatable task and a clear process.",
    },
    {
      label: "What do we have?",
      detail:
        "One teaching idea, a short script, a voice track, brand colours and a clear invitation.",
    },
    {
      label: "What does good look like?",
      detail:
        "A viewer understands one practical step and knows how to start a conversation.",
    },
  ];
  return (
    <div className="brief-map">
      <div className="map-caption">
        <span className="tiny-label">A small mind map</span>
        <span>Click a question to explore</span>
      </div>
      <div className="map-layout">
        <svg
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M400 150 L200 70 M400 150 L600 70 M400 150 L200 235 M400 150 L600 235" />
        </svg>
        <div className="map-centre">
          <span>THE BRIEF</span>
          <strong>
            One useful
            <br />
            piece of work.
          </strong>
        </div>
        {branches.map((branch, index) => (
          <button
            key={branch.label}
            className={`map-node map-node-${index} ${selected === index ? "selected" : ""}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <span>0{index + 1}</span>
            {branch.label}
            <Plus size={14} />
          </button>
        ))}
      </div>
      <p className="map-explanation" aria-live="polite">
        {branches[selected].detail}
      </p>
    </div>
  );
}

function WorkflowDiagram() {
  const [active, setActive] = useState(0);
  const nodes = [
    {
      title: "A real task",
      role: "Start here",
      detail:
        "Teaching example: a client follow-up that needs the same context, a clear next step and the right tone each time.",
    },
    {
      title: "Useful context",
      role: "You provide",
      detail:
        "Collect the relevant notes, last conversation and agreed next step. Keep private information out of tools that should not receive it.",
    },
    {
      title: "An AI draft",
      role: "AI assists",
      detail:
        "Give the model the context and a reusable structure. Ask for a concise draft without invented details or promises.",
    },
    {
      title: "Human judgment",
      role: "You decide",
      detail:
        "Check the facts, edit the tone and decide whether this is actually the right message to send.",
    },
    {
      title: "A better next step",
      role: "Put it to use",
      detail:
        "Send the approved message and keep a short record of the next action. The process becomes reusable without giving up control.",
    },
  ];
  return (
    <div className="workflow-diagram">
      <div className="flow-nodes">
        {nodes.map((node, index) => (
          <React.Fragment key={node.title}>
            <button
              className={`flow-node ${index === active ? "selected" : ""}`}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              <span className="tiny-label">{node.role}</span>
              <strong>{node.title}</strong>
              <span className="flow-index">0{index + 1}</span>
            </button>
            {index < nodes.length - 1 && (
              <ArrowRight className="flow-arrow" size={18} aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flow-detail" aria-live="polite">
        <span className="tiny-label">Step 0{active + 1}</span>
        <p>{nodes[active].detail}</p>
      </div>
      <p className="example-caption">
        A teaching example expanded from my clarity reel. Explore each decision
        before building a similar workflow for your work.
      </p>
    </div>
  );
}

function FAQ() {
  return (
    <div className="faq-list">
      {questions.map((item, index) => (
        <details key={item.question}>
          <summary>
            <span className="row-number">0{index + 1}</span>
            <span>{item.question}</span>
            <Plus size={20} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="home-hero wrap">
        <div className="hero-copy">
          <Label>AI, content & thoughtful execution</Label>
          <h1 className="hero-title entrance">
            Your ideas.
            <br />
            <em>Better executed.</em>
          </h1>
          <p className="hero-description entrance delay-1">
            Content people want to watch. Websites they understand. AI that
            makes the work easier.
          </p>
          <p className="hero-person entrance delay-2">
            I’m Vansh, a creator and builder from Pune.
            <br />
            Let’s make something useful for your next chapter.
          </p>
          <div className="hero-actions entrance delay-3">
            <Action>Tell me what you’re working on</Action>
            <TextLink to="/services">Explore the services</TextLink>
          </div>
          <div className="hero-signature">
            <span className="signature-line" />
            Vansh Gaikwad
            <span className="signature-role">
              Neural Vansh · Co-founder, Presenzo Media
            </span>
          </div>
        </div>
        <div className="hero-portrait entrance delay-1">
          <Portrait />
        </div>
        <div className="hero-scroll">
          <span>Independent thinking. Hands-on making.</span>
          <a href="#start" aria-label="Explore the site">
            <ArrowDown size={17} />
          </a>
        </div>
      </section>
      <div className="discipline-strip" aria-label="Areas of work">
        <div>
          {[
            "Creative direction",
            "AI-assisted video",
            "Useful websites",
            "Practical workflows",
          ].map((item) => (
            <span key={item}>
              <span className="strip-square" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <section id="start" className="section wrap">
        <Reveal>
          <div className="split-heading">
            <Label number="01">Find your starting point</Label>
            <h2>
              You don’t need
              <br />
              the perfect <em>brief.</em>
            </h2>
            <p className="section-intro">
              You just need something you want to make better. Pick the closest
              starting point.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <StartFinder />
        </Reveal>
      </section>
      <section className="section services-section wrap">
        <Reveal>
          <div className="split-heading">
            <Label number="02">What I can help with</Label>
            <h2>
              Clear thinking.
              <br />
              <em>Useful output.</em>
            </h2>
            <p className="section-intro">
              Three connected ways to move your work forward. Start small, with
              a scope that makes sense.
            </p>
          </div>
        </Reveal>
        <ServiceRows />
      </section>
      <section className="proof-section">
        <div className="wrap">
          <Reveal>
            <div className="split-heading">
              <Label number="03" light>
                See the work
              </Label>
              <h2>
                A little less explaining.
                <br />
                <em>A little more showing.</em>
              </h2>
              <p className="section-intro">
                This website and these reels are my own projects. Explore the
                decisions, the craft and the finished result.
              </p>
            </div>
          </Reveal>
          <div className="proof-grid">
            <Reveal className="reel-proof">
              <VideoExample />
              <div className="proof-copy">
                <span className="tiny-label">Content example / Hinglish</span>
                <h3>
                  One idea.
                  <br />A reason to keep watching.
                </h3>
                <p>
                  A short reel about getting past AI overwhelm. The hook,
                  captions, pacing and invitation all serve one message.
                </p>
                <TextLink to="/services#content" light>
                  Explore content & editing
                </TextLink>
              </div>
            </Reveal>
            <Reveal className="website-proof">
              <SiteExample />
              <div className="proof-copy">
                <span className="tiny-label">
                  Website example / You’re on it
                </span>
                <h3>
                  A website that explains
                  <br />
                  the work by doing it.
                </h3>
                <p>
                  This site is a live example of my approach to message, design,
                  interaction and the next step.
                </p>
                <TextLink to="/services#websites" light>
                  Explore websites
                </TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <Reveal>
          <div className="split-heading">
            <Label number="04">How the thinking works</Label>
            <h2>
              Good work starts
              <br />
              with better <em>questions.</em>
            </h2>
            <p className="section-intro">
              Here is the small brief behind the reel you just saw. The same
              questions help shape a website, a video or a useful AI workflow.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <BriefMap />
        </Reveal>
        <div className="section-end-link">
          <TextLink to="/approach">See how we would work together</TextLink>
        </div>
      </section>
      <section className="about-teaser">
        <div className="wrap about-teaser-grid">
          <Reveal>
            <Label number="05">The person behind the work</Label>
            <h2>
              I’m building
              <br />
              something
              <br />
              <em>of my own, too.</em>
            </h2>
          </Reveal>
          <Reveal className="about-teaser-copy">
            <p className="large-copy">
              So I care about the gap between a good idea and a finished thing
              you’re proud to share.
            </p>
            <p>
              I’m Vansh Gaikwad. Neural Vansh is where I bring together AI,
              content and building. I’m also a co-founder of Presenzo Media.
            </p>
            <p>
              You work directly with me. I ask questions, show the work and keep
              the decisions understandable.
            </p>
            <TextLink to="/about">A little more about me</TextLink>
          </Reveal>
        </div>
      </section>
      <section className="section wrap">
        <Reveal>
          <div className="split-heading">
            <Label number="06">Before we talk</Label>
            <h2>
              A few things
              <br />
              you might be <em>wondering.</em>
            </h2>
          </div>
        </Reveal>
        <FAQ />
      </section>
    </>
  );
}

function Services() {
  return (
    <>
      <PageIntro
        label="Services / A useful place to begin"
        title={
          <>
            Make the work
            <br />
            <em>worth putting out.</em>
          </>
        }
        description="A stronger piece of content, a considered website or a simpler way to use AI. We begin with the outcome you need, then agree on what it takes to get there."
      >
        <Action>Talk through your project</Action>
      </PageIntro>
      <nav className="service-jump wrap" aria-label="Jump to a service">
        {services.map((service) => (
          <Link key={service.id} to={`/services#${service.id}`}>
            <span>{service.number}</span>
            {service.label}
            <ArrowDown size={15} />
          </Link>
        ))}
      </nav>
      {services.map((service, index) => (
        <section
          id={service.id}
          className={`service-detail ${index === 1 ? "service-detail-tint" : ""}`}
          key={service.id}
        >
          <div className="wrap">
            <Reveal>
              <Label number={service.number}>{service.label}</Label>
              <div className="service-detail-heading">
                <h2>
                  {service.short.split(".").filter(Boolean)[0]}
                  <span className="coral-period">.</span>
                </h2>
                <p className="lead">{service.description}</p>
              </div>
            </Reveal>
            <div className="service-detail-body">
              <Reveal>
                <h3>When this is useful</h3>
                <p>{service.for}</p>
                <h3 className="mt">What we can make together</h3>
                <ul className="deliverables">
                  {service.deliverables.map((item) => (
                    <li key={item}>
                      <Check size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="scope-note">
                  The exact deliverables, timeline, revisions and quote are
                  agreed before the project begins.
                </p>
                <Action external to={whatsapp(service.conversation)}>
                  Discuss this project
                </Action>
              </Reveal>
              <Reveal className="service-example">
                <span className="tiny-label">A real example to explore</span>
                {index === 0 ? (
                  <VideoExample />
                ) : index === 1 ? (
                  <SiteExample />
                ) : (
                  <WorkflowDiagram />
                )}
                <p className="example-description">{service.example}</p>
              </Reveal>
            </div>
            {index === 0 && (
              <div className="editing-note">
                <span className="tiny-label">
                  AI-assisted. Carefully edited.
                </span>
                <p>
                  Transcript-led cuts, captions, voice, generated visuals and
                  code-based motion can all be part of the process. I choose
                  what serves the story, check the output and keep the final
                  edit intentional.
                </p>
                <Link className="text-link" to="/approach#reel-breakdown">
                  See a reel broken down
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}
      <section className="section wrap">
        <div className="split-heading">
          <Label>Still deciding?</Label>
          <h2>
            Choose the problem.
            <br />
            <em>We’ll find the format.</em>
          </h2>
        </div>
        <StartFinder compact />
      </section>
    </>
  );
}

function Approach() {
  return (
    <>
      <PageIntro
        label="How I work / Clear from the start"
        title={
          <>
            A thoughtful process.
            <br />
            <em>Something real at the end.</em>
          </>
        }
        description="You should understand what I am making, why it matters and what happens next. Here is how an idea moves from a conversation into useful work."
      />
      <section className="section wrap process-section">
        <div className="process-intro">
          <Label number="01">From conversation to delivery</Label>
          <h2>
            Nothing hidden
            <br />
            inside a <em>black box.</em>
          </h2>
          <p>
            These are the four steps. The scale changes with the project, but
            the decisions stay visible.
          </p>
        </div>
        <div className="process-steps">
          {steps.map((step) => (
            <Reveal key={step.number} className="process-step">
              <span className="step-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div className="step-artifact">{step.artifact}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section section-tint">
        <div className="wrap">
          <div className="split-heading">
            <Label number="02">An example of the thinking</Label>
            <h2>
              One task.
              <br />
              <em>A clearer way through.</em>
            </h2>
            <p className="section-intro">
              A teaching example from my “Tools se pehle, clarity” reel. Click
              each step to see where AI helps and where a person still decides.
            </p>
          </div>
          <WorkflowDiagram />
        </div>
      </section>
      <section id="reel-breakdown" className="section wrap reel-breakdown">
        <Reveal>
          <VideoExample second />
        </Reveal>
        <div>
          <Label number="03">A finished Neural Vansh reel</Label>
          <h2>
            Every layer
            <br />
            has a <em>job.</em>
          </h2>
          <p className="lead">
            A brief becomes a content workflow. This self-initiated piece shows
            how I connect the idea, visuals, voice and edit.
          </p>
          <div className="edit-layers">
            {[
              ["The idea", "One brief can become a useful content system."],
              ["The story", "Show the steps instead of listing tools."],
              [
                "The edit",
                "Use pacing, captions and sound to guide attention.",
              ],
              ["The judgment", "Check whether each frame earns its place."],
            ].map(([title, text], index) => (
              <div key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="wrap">
          <div className="split-heading">
            <Label number="04" light>
              How I use AI now
            </Label>
            <h2>
              Current tools.
              <br />
              <em>Considered decisions.</em>
            </h2>
            <p className="section-intro">
              Models and features change quickly. A useful workflow should still
              make sense when the tool changes.
            </p>
          </div>
          <div className="principle-grid">
            {[
              [
                "Start with context",
                "A useful brief beats a vague prompt. I make the goal, audience, inputs and constraints clear first.",
              ],
              [
                "Keep the original voice",
                "AI can help explore directions. The final script, visual and edit still need to sound and feel right for you.",
              ],
              [
                "Check before shipping",
                "I review facts, rights, tone, accessibility and the final experience. Generated output is a starting material, not an automatic sign-off.",
              ],
            ].map(([title, text], index) => (
              <Reveal key={title}>
                <span className="principle-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <section className="about-hero wrap">
        <div>
          <Label>About Vansh / The human part</Label>
          <h1 className="page-title entrance">
            My name
            <br />
            is on
            <br />
            <em>the work.</em>
          </h1>
          <p className="lead">That makes the details personal.</p>
          <div className="about-name">
            <span>Vansh Gaikwad</span>
            <span>Creator. Builder. Co-founder.</span>
          </div>
        </div>
        <Portrait about />
      </section>
      <section className="section wrap about-story">
        <Label number="01">A little about me</Label>
        <div>
          <h2>
            I’m learning fast.
            <br />
            <em>And making it useful.</em>
          </h2>
          <p className="large-copy">
            I’m a young creator and builder based in Pune. Neural Vansh is where
            I turn what I learn about AI into things people can actually use.
          </p>
          <p>
            A reel that explains one idea clearly. A website that makes a
            service easier to understand. A workflow that helps someone get past
            a task they keep putting off.
          </p>
          <p>
            I’m building my experience through the work itself. That means being
            direct about what I can take on, showing how I think and caring
            about what happens after a file is delivered.
          </p>
          <p>
            I enjoy the technical side. But I care just as much about whether
            the words sound like you, whether the edit feels right and whether
            the next step is obvious.
          </p>
          <div className="personal-note">
            <span className="tiny-label">The way I want to work</span>
            <blockquote>
              “Make something I’d be happy to put my own name on.”
            </blockquote>
          </div>
        </div>
      </section>
      <section className="presenzo-section">
        <div className="wrap presenzo-grid">
          <img
            src={media("presenzo-logo.webp")}
            alt="Presenzo Media logo"
            width="600"
            height="600"
            loading="lazy"
          />
          <div>
            <Label>Also part of my story</Label>
            <h2>
              Co-founder.
              <br />
              <em>Presenzo Media.</em>
            </h2>
            <p className="lead">
              Alongside Neural Vansh, I’m building Presenzo Media as a
              co-founder.
            </p>
            <p>
              Neural Vansh is my personal space for AI, content and hands-on
              building. Presenzo is the agency side of that journey.
            </p>
            <p>
              If a project calls for wider creative support, I’ll explain who
              would be involved and how we would work. You’ll know the scope and
              the people before we begin.
            </p>
            <TextLink to="/contact">Talk about what you have in mind</TextLink>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="split-heading">
          <Label number="02">Why work with me?</Label>
          <h2>
            A direct relationship.
            <br />
            <em>A visible process.</em>
          </h2>
        </div>
        <div className="reason-list">
          {[
            [
              "You talk to the person making it.",
              "The questions, decisions and feedback stay close to the work. You can ask why something is there and get a straight answer.",
            ],
            [
              "Small details get attention.",
              "The hook, spacing, caption timing and contact flow all affect the experience. I give them time because they matter.",
            ],
            [
              "The scope comes first.",
              "We agree on the deliverables, timeline and revisions before starting. A smaller, useful project is a perfectly good place to begin.",
            ],
            [
              "You can judge the work yourself.",
              "The examples here are my own reels and this website. Explore them, ask about the process and decide whether the approach fits.",
            ],
          ].map(([title, text], index) => (
            <Reveal className="reason-row" key={title}>
              <span className="row-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function EnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    consent: false,
    website: "",
  });
  const [status, setStatus] = useState("idle");
  const [startedAt, setStartedAt] = useState(null);
  const [delivery, setDelivery] = useState(null);
  useEffect(() => {
    setStartedAt(Date.now());
  }, []);
  const message = `Hi Vansh, I'd like to discuss a project.\n\nName: ${form.name}\nEmail: ${form.email}\nInterested in: ${form.service}\n${form.phone ? `Phone: ${form.phone}\n` : ""}\n${form.message}`;
  const update = (event) =>
    setForm((previous) => ({
      ...previous,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const result = await sendEnquiry({ ...form, startedAt });
      setDelivery(result);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  if (status === "success")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={35} />
        <span className="tiny-label">Thank you, {form.name.split(" ")[0]}</span>
        <h2>
          That’s a good
          <br />
          <em>starting point.</em>
        </h2>
        <p>
          Your enquiry has been accepted for email delivery. I’ll review what
          you’ve shared and get back to you.
        </p>
        {delivery?.whatsappNotified ? (
          <p>A WhatsApp notification has also been sent to me.</p>
        ) : (
          <>
            <p>
              Prefer to continue on WhatsApp? Send the same details with the
              button below.
            </p>
            <Action external to={whatsapp(message)}>
              Continue on WhatsApp
            </Action>
          </>
        )}
        <button
          className="reset-form text-link"
          onClick={() => {
            setStatus("idle");
            setForm({
              name: "",
              email: "",
              phone: "",
              service: "",
              message: "",
              consent: false,
              website: "",
            });
            setStartedAt(Date.now());
          }}
        >
          Send another enquiry <ArrowRight size={16} />
        </button>
      </div>
    );
  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="tiny-label">A little context goes a long way</span>
        <h2>
          What’s on
          <br />
          <em>your mind?</em>
        </h2>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="enquiry-name">
            Your name <span>*</span>
          </label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={update}
            minLength={2}
            maxLength={80}
            required
            placeholder="What should I call you?"
          />
        </div>
        <div className="field">
          <label htmlFor="enquiry-email">
            Email address <span>*</span>
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update}
            maxLength={254}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="field">
          <label htmlFor="enquiry-service">
            What would you like help with? <span>*</span>
          </label>
          <select
            id="enquiry-service"
            name="service"
            value={form.service}
            onChange={update}
            required
          >
            <option value="" disabled>
              Choose the closest starting point
            </option>
            <option>Content & AI-assisted video editing</option>
            <option>Website or landing page</option>
            <option>Practical AI or a workflow</option>
            <option>Still figuring it out</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="enquiry-phone">
            WhatsApp number <span className="optional">optional</span>
          </label>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={update}
            maxLength={30}
            placeholder="Include your country code"
          />
        </div>
        <div className="field full-width">
          <label htmlFor="enquiry-message">
            Tell me a little about the project <span>*</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            value={form.message}
            onChange={update}
            minLength={20}
            maxLength={3000}
            rows={5}
            required
            placeholder="What are you building? What feels stuck? A link or a rough idea is welcome."
          />
          <span className="field-hint">
            At least 20 characters. Please leave out passwords and sensitive
            information.
          </span>
        </div>
      </div>
      <div className="honey-field" aria-hidden="true">
        <label htmlFor="enquiry-website">Leave this field empty</label>
        <input
          id="enquiry-website"
          name="website"
          value={form.website}
          onChange={update}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={update}
          required
        />
        <span>
          I’m happy to be contacted about this enquiry. I’ve read the{" "}
          <Link to="/privacy">privacy policy</Link>.
        </span>
      </label>
      {status === "error" && (
        <div className="form-error" role="alert">
          <strong>Your message could not be sent.</strong>
          <p>
            Your details are still here. Try again, or send them directly on
            WhatsApp.
          </p>
          <a href={whatsapp(message)} target="_blank" rel="noreferrer">
            Send these details on WhatsApp <ArrowUpRight size={16} />
          </a>
        </div>
      )}
      <button
        type="submit"
        className="action form-submit"
        disabled={status === "sending"}
      >
        <span>
          {status === "sending" ? "Sending your enquiry…" : "Send my enquiry"}
        </span>
        <ArrowUpRight size={19} />
      </button>
      <p className="form-footnote">
        This starts a conversation. It does not book or charge for a service.
      </p>
    </form>
  );
}

function Contact() {
  return (
    <>
      <PageIntro
        label="Start a conversation / No perfect brief needed"
        title={
          <>
            What are you
            <br />
            <em>working on?</em>
          </>
        }
        description="Tell me what you want to make, improve or get unstuck. I’ll help you work out whether I’m the right person for the next step."
      />
      <section className="contact-section wrap">
        <aside className="contact-details">
          <Label>The direct route</Label>
          <h2>
            A message
            <br />
            is <em>enough.</em>
          </h2>
          <p>
            If a form feels like too much, start on WhatsApp or email me. A
            voice note, a link or a short explanation is fine.
          </p>
          <a
            className="contact-channel"
            href={whatsapp()}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={22} />
            <span>
              <strong>Say hello on WhatsApp</strong>
              <small>+91 86980 49031</small>
            </span>
            <ArrowUpRight size={21} />
          </a>
          <a className="contact-channel" href={`mailto:${EMAIL}`}>
            <Mail size={22} />
            <span>
              <strong>Send me an email</strong>
              <small>{EMAIL}</small>
            </span>
            <ArrowUpRight size={21} />
          </a>
          <div className="contact-next">
            <span className="tiny-label">What happens next</span>
            <ol>
              <li>I read your message.</li>
              <li>We clarify the goal and fit.</li>
              <li>
                You receive a scope and quote if we decide to move forward.
              </li>
            </ol>
          </div>
          <p className="contact-location">
            Based in Pune, India.
            <br />
            Working remotely where the project fits.
          </p>
        </aside>
        <EnquiryForm />
      </section>
    </>
  );
}

function Legal({ privacy = false }) {
  return (
    <>
      <PageIntro
        label="The practical details / Updated 16 October 2026"
        title={
          privacy ? (
            <>
              Your information.
              <br />
              <em>Handled with care.</em>
            </>
          ) : (
            <>
              A few clear
              <br />
              <em>ground rules.</em>
            </>
          )
        }
        description={
          privacy
            ? "This policy explains what happens to the information you share with Neural Vansh through this website."
            : "These terms cover the website and the first conversation. Project-specific terms are agreed in writing before any paid work begins."
        }
      />
      <article className="legal-copy wrap">
        {(privacy
          ? [
              [
                "Who handles your information",
                "Neural Vansh is the personal website of Vansh Gaikwad, based in Pune, India. For privacy questions or requests, email neuralvansh@gmail.com. Presenzo Media is mentioned as part of my professional background; an enquiry here is made to Neural Vansh.",
              ],
              [
                "What you share",
                "The enquiry form asks for your name, email address, project interest, a message, and an optional WhatsApp number. Please do not submit passwords, payment details, private client files or other sensitive information.",
              ],
              [
                "Why it is used",
                "Your details are used to understand your enquiry, reply to you and discuss a possible project. Submitting the form does not subscribe you to a marketing list. You can ask me to stop contacting you.",
              ],
              [
                "Email, WhatsApp and hosting",
                "The website is hosted on Vercel. FormSubmit processes form submissions for email delivery. Their services may process information outside India. If you choose to continue on WhatsApp, your message is handled by WhatsApp under its own privacy terms. A WhatsApp button prepares a message; you decide whether to send it.",
              ],
              [
                "Storage and your choices",
                "Enquiry conversations may remain in email or WhatsApp for as long as needed to discuss or carry out the project and handle related records. You can request a copy, correction or deletion of information by emailing me. I may need to keep records required for an active agreement or applicable obligations.",
              ],
              [
                "Cookies and analytics",
                "This site does not currently use advertising cookies or an analytics tracker. Necessary hosting and security systems may process basic technical information. Fonts, project videos and images are served with the site rather than embedded from social networks.",
              ],
              [
                "External links and updates",
                "Links to LinkedIn, YouTube, WhatsApp and FormSubmit lead to other services with their own privacy practices. This policy will be updated if the way this website handles information changes.",
              ],
            ]
          : [
              [
                "Using this website",
                "You may browse the website, view the examples and contact me about a legitimate project. Please do not misuse the enquiry form, attempt to disrupt the site or submit material you do not have permission to share.",
              ],
              [
                "Examples and expectations",
                "The examples shown here are this website and self-initiated Neural Vansh reels. They demonstrate the work and process, not a promise of views, leads, revenue or identical results for another project. AI-assisted material is reviewed, but generated output may still need project-specific checks.",
              ],
              [
                "Projects begin with an agreement",
                "A conversation or form submission is not a paid booking. Before work starts, we agree in writing on scope, fees, payment schedule, delivery, revisions, responsibilities and any cancellation terms. That agreement governs the project.",
              ],
              [
                "Ownership and materials",
                "The website, brand assets and examples belong to their respective owners. You may link to this site but may not resell its content or present its work as your own. Ownership and usage rights for commissioned work, including third-party or AI-assisted assets, are set out in the project agreement.",
              ],
              [
                "Accuracy and availability",
                "I aim to keep the information current and the site working, but content and services may change. External services have their own terms. Nothing here replaces professional advice for regulated medical, legal, financial or other specialist decisions.",
              ],
              [
                "Questions",
                "If anything is unclear, contact neuralvansh@gmail.com before relying on it or starting a project. Clear expectations make for better work.",
              ],
            ]
        ).map(([title, text], index) => (
          <section key={title}>
            <span className="row-number">0{index + 1}</span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
              {privacy && index === 3 && (
                <p className="policy-links">
                  <a
                    href="https://formsubmit.co/privacy.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    FormSubmit privacy
                  </a>
                  <a
                    href="https://www.whatsapp.com/legal/privacy-policy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp privacy
                  </a>
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vercel privacy
                  </a>
                </p>
              )}
            </div>
          </section>
        ))}
      </article>
    </>
  );
}

function NotFound() {
  return (
    <section className="page-intro wrap not-found">
      <Label>404 / A small wrong turn</Label>
      <h1 className="page-title">
        Let’s find
        <br />
        <em>your way back.</em>
      </h1>
      <p className="lead">
        This page is not here. The homepage is a good place to start.
      </p>
      <Action to="/">Go to the homepage</Action>
    </section>
  );
}

export default function Site({ initialPath = "/" }) {
  const [path, setPath] = useState(normalizePath(initialPath));
  const pageRef = useRef(null);
  const navigating = useRef(false);
  function navigate(to, replace = false) {
    const url = new URL(to, window.location.origin);
    const next = normalizePath(url.pathname);
    window.history[replace ? "replaceState" : "pushState"](
      {},
      "",
      `${next}${url.hash}`,
    );
    navigating.current = next !== path;
    if (
      next !== path &&
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      document.startViewTransition(() => flushSync(() => setPath(next)));
    else setPath(next);
    if (next === path && url.hash)
      document
        .getElementById(decodeURIComponent(url.hash.slice(1)))
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let scheduled = false;
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--page-progress",
        height > 0 ? String(window.scrollY / height) : "0",
      );
      document.documentElement.style.setProperty(
        "--portrait-offset",
        `${-Math.min(window.scrollY * 0.055, 25)}px`,
      );
      scheduled = false;
    };
    const scroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    const pop = () => {
      navigating.current = true;
      setPath(normalizePath(window.location.pathname));
    };
    window.addEventListener("popstate", pop);
    const oldRoutes = {
      home: "/",
      services: "/services",
      clarity: "/services#workflows",
      about: "/about",
      contact: "/contact",
      tools: "/services",
      portfolio: "/",
      resources: "/",
    };
    const migrateHash = () => {
      const oldHash = window.location.hash.slice(1);
      if (window.location.pathname === "/" && oldRoutes[oldHash])
        navigate(oldRoutes[oldHash], true);
    };
    window.addEventListener("hashchange", migrateHash);
    migrateHash();
    return () => {
      window.removeEventListener("popstate", pop);
      window.removeEventListener("hashchange", migrateHash);
    };
  }, []);
  useEffect(() => {
    const metadata = routeMetadata[path] || routeMetadata["/404"];
    document.title = metadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `${SITE_URL}${path === "/" ? "" : path}`);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", `${SITE_URL}${path === "/" ? "" : path}`);
    const elements = pageRef.current?.querySelectorAll(".reveal") || [];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      if (
        !reduceMotion &&
        element.getBoundingClientRect().top > window.innerHeight - 40
      ) {
        element.classList.add("will-reveal");
        observer.observe(element);
      } else element.classList.add("is-visible");
    });
    if (
      window.location.hash &&
      !["home", "tools", "portfolio", "resources"].includes(
        window.location.hash.slice(1),
      )
    )
      requestAnimationFrame(() =>
        document
          .getElementById(window.location.hash.slice(1))
          ?.scrollIntoView(),
      );
    if (navigating.current) {
      pageRef.current?.focus({ preventScroll: true });
      navigating.current = false;
    }
    return () => observer.disconnect();
  }, [path]);
  const pages = {
    "/": <Home />,
    "/services": <Services />,
    "/approach": <Approach />,
    "/about": <About />,
    "/contact": <Contact />,
    "/privacy": <Legal privacy />,
    "/terms": <Legal />,
  };
  return (
    <Router.Provider value={{ path, navigate }}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main-content" ref={pageRef} tabIndex={-1} key={path}>
        {pages[path] || <NotFound />}
      </main>
      <Footer />
    </Router.Provider>
  );
}
