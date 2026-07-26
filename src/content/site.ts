/**
 * ALL site copy lives here, typed. No hardcoded copy in components.
 * Client copy revisions are a one-file change.
 *
 * Words wrapped for Fraunces italic emphasis are marked with the
 * `<em>…</em>`-style convention: strings split into `{ text, em? }` runs
 * where noted, or plain strings elsewhere. See RichLine below.
 */

export type RichRun = { text: string; em?: boolean };
/** A headline line as a sequence of runs (em = Fraunces italic). */
export type RichLine = RichRun[];

export const site = {
  brand: {
    name: "kritrimam",
    malayalam: "കൃത്രിമം",
    meaning: "ARTIFICIAL",
    location: "Kerala, India",
    email: "info@kritrimam.com",
    domain: "https://www.kritrimam.com",
  },

  meta: {
    titleDefault: "Kritrimam — AI research lab | NEST.ai & Budhi",
    titleTemplate: "%s | Kritrimam",
    description:
      "An AI research lab in Kerala working on grounding, retrieval and evaluation. NEST.ai — a co-tutor that studies your own material. Budhi — AI built into how your business already works.",
    ogTitle: "Kritrimam is artificial. We are here to make it deliberate.",
    ogDescription:
      "An AI research lab building systems that can tell the difference between knowing and guessing.",
  },

  nav: {
    items: [
      {
        label: "NEST.ai",
        href: "#nest",
        panel: {
          links: [
            { label: "Overview", href: "#nest", desc: "What we're building" },
            { label: "How it works", href: "#nest", desc: "Grounded, not guessed" },
            { label: "Roadmap", href: "#nest", desc: "What ships when" },
          ],
          preview: "NEST.ai still frame",
        },
      },
      {
        label: "Budhi",
        href: "#budhi",
        panel: {
          links: [
            { label: "Overview", href: "#budhi", desc: "Enterprise AI, integrated" },
            { label: "Capabilities", href: "#budhi", desc: "Four things we do" },
            { label: "Engagement", href: "#budhi", desc: "How a project starts" },
          ],
          preview: "Budhi diagram",
        },
      },
      {
        label: "Vision",
        href: "#vision",
        panel: {
          links: [
            { label: "The lab", href: "#vision", desc: "Why we exist" },
            { label: "Research", href: "#vision", desc: "Retrieval & evaluation" },
          ],
          preview: "motto card",
        },
      },
      { label: "Contact", href: "#contact", panel: null },
    ],
    cta: "Get in touch",
  },

  hero: {
    eyebrow: "KRITRIMAM RESEARCH LAB — KERALA, INDIA",
    // H1 — Option A. em = Fraunces italic.
    h1: [
      [{ text: "Not more data." }],
      [{ text: "Clearer footing under it.", em: true }],
    ] as RichLine[],
    // phrase that carries grounding thread #1
    threadPhrase: "Clearer footing under it.",
    threadChip: "vision.md · §03",
    lede: [
      { text: "Most AI fails quietly, in the gap between what a system knows and what it confidently says. We build in that gap — retrieval, grounding, evaluation. Two things so far: " },
      { text: "NEST.ai", strong: true },
      { text: ", a co-tutor that studies your own material. " },
      { text: "Budhi", strong: true },
      { text: ", AI built into how a business already works." },
    ],
    ctaPrimary: "Explore NEST.ai",
    ctaSecondary: "Work with Budhi",
    scrollCue: "WHAT WE'RE BUILDING",
  },

  proof: {
    items: [
      { eyebrow: "GROUNDED BY DEFAULT", line: "Every answer traces back to a source you gave it." },
      { eyebrow: "BUILT FOR THE LONG FORM", line: "Retrieval and evaluation, not prompt tricks." },
      { eyebrow: "KERALA, SELF-FUNDED", line: "Small team, early, no hurry to be acquired." },
    ],
  },

  fork: {
    eyebrow: "WHERE TO START",
    h2: "Two ways in.",
    sub: "The same research underneath, pointed at two very different problems.",
    cards: [
      {
        tag: "FOR STUDENTS & EDUCATORS",
        title: "NEST.ai",
        body: "A co-tutor that reads what you're actually studying — lectures, PDFs, slides, handwritten notes — and answers from that, not from the internet's average guess.",
        cta: "Coming soon — join the list",
        href: "#nest",
      },
      {
        tag: "FOR BUSINESSES",
        title: "Budhi",
        body: "AI agents and retrieval systems designed around your data and your workflow, not bolted on top of it.",
        cta: "Talk to us",
        href: "#budhi",
      },
    ],
  },

  nest: {
    marker: "01",
    tag: "COMING SOON",
    h2: "NEST.ai",
    lede:
      "An AI co-tutor that works from your own course material — lecture videos, PDFs, slides, notes — instead of guessing at the internet's average answer.",
    howTitle: "How it works",
    steps: [
      {
        n: "1",
        title: "Give it your material",
        body: "Lecture recordings, PDFs, slide decks, handwritten notes. Whatever the course actually runs on.",
      },
      {
        n: "2",
        title: "Ask it anything",
        body: "It answers from your sources, and shows you which one. Not a search result dressed up as a tutor.",
        // grounding thread #2 chips attach here
        chips: ["bio_lecture_04.mp4 · 12:31", "chapter_9.pdf · p.203", "notes_scan.jpg"],
      },
      {
        n: "3",
        title: "Study from it",
        body: "Summarize a lecture. Turn a chapter into flashcards. Generate a quiz. Lay out a plan for what's coming.",
      },
    ],
    educators: {
      title: "For educators",
      body: "Turn a lecture into structured material in one pass — and see where a class is actually struggling before the exam does.",
    },
    expect: {
      title: "What to expect",
      body: "Every answer is retrieved before it's generated, and grounded in the source you gave it. That's what keeps it from making things up. It works across languages, not just English. It's built to be something you come back to in week nine, not a demo you try once and forget.",
    },
    why: {
      title: "Why we're building it",
      body: "A private tutor has always been something only some students could afford. NEST.ai is our attempt at closing that gap — the same quality of one-on-one help, available to any student with a phone, not just the ones who can pay for it.",
    },
    ctaPrimary: "Join the early list",
    ctaSecondary: "See the project",
    repo: "https://github.com/adrifayin/nest-ai",
  },

  ctaBand: {
    // reused twice
    headline: [
      "Two ways in, one lab underneath.",
      "Join the list or talk to us directly.",
    ],
    ctaPrimary: "Join the early list",
    ctaSecondary: "Work with Budhi",
  },

  budhi: {
    marker: "02",
    tag: "ENTERPRISE",
    // h2 with italic emphasis on "how you already work"
    h2: [
      { text: "Budhi — AI, built into " },
      { text: "how you already work", em: true },
    ] as RichRun[],
    lede:
      "Budhi is Kritrimam's enterprise arm. We work directly with businesses to design, build and adapt AI agents and AI-driven features around your actual data and workflow — not a bolted-on chatbot.",
    capabilities: [
      {
        title: "Custom integration",
        body: "Bringing AI into the tools your team already opens every morning, instead of asking them to adopt something new.",
      },
      {
        title: "Model adaptation",
        body: "Grounding models in your own data, so answers reflect your business rather than the general internet.",
      },
      {
        title: "Applied agents",
        body: "Agent and retrieval systems built for one specific operational problem, not a generic demo.",
      },
      {
        title: "Evaluation",
        body: "Ongoing testing, so the system is still reliable in month six — not just on the day it shipped.",
      },
    ],
    engagementTitle: "How an engagement starts",
    engagement: [
      {
        n: "1",
        lead: "A conversation.",
        body: "What's the actual bottleneck, and is AI even the right tool for it? We'll say if it isn't.",
      },
      {
        n: "2",
        lead: "A scoped build.",
        body: "One problem, clearly defined, with a way to measure whether it worked.",
      },
      {
        n: "3",
        lead: "Then we keep testing it.",
        body: "Systems drift. Evaluation isn't a phase, it's the maintenance.",
      },
    ],
    cta: "Start a conversation",
  },

  vision: {
    marker: "03",
    h2: "Vision",
    paras: [
      "Kritrimam isn't set up to ship one product and call it a company. NEST.ai and Budhi are what we've built with what we know so far — proof of work, not the whole point. The point is the lab underneath both of them.",
      "Most AI products fail quietly, in the gap between what a system actually knows and what it confidently says. We care about that gap more than almost anything else — about where an answer comes from, whether it's grounded in something real, and whether a system can tell the difference between knowing and guessing. That's what we mean by data clarity: not more data, clearer footing under it.",
    ],
    pullQuote: "The difference between knowing and guessing is the whole problem.",
    closing:
      "We're building toward the kind of research work usually reserved for a handful of labs in the world. That's a long way from where we are today — a small team in Kerala, self-funded, early. But the foundation we're laying now, in how we think about retrieval, evaluation, and what it actually means for a model to understand something, is built for that horizon, not for a quick exit.",
  },

  motto: {
    // CLIENT: confirm motto wording — supplied as "elibrate"; using recommended "deliberate"
    lines: [
      [{ text: "Kritrimam is " }, { text: "artificial.", em: true, tone: "brass" as const }],
      [{ text: "We are here to make it " }, { text: "deliberate.", em: true, tone: "indigo" as const }],
    ],
    footnote: "കൃത്രിമം · KRITRIMAM · \"ARTIFICIAL\"",
  },

  waitlist: {
    eyebrow: "EARLY ACCESS",
    h2: [
      { text: "Know when NEST.ai " },
      { text: "opens up.", em: true },
    ] as RichRun[],
    sub: "One email when there's something real to try. Nothing else.",
    placeholder: "your@email.com",
    button: "Keep me posted",
    success: "You're on the list. We'll be in touch when there's something worth your time.",
    errorValidation: "That doesn't look like an email address — mind checking it?",
    errorServer: "That didn't send. Try again, or email info@kritrimam.com directly.",
  },

  // Multi-step branching modal (§12)
  waitlistModal: {
    interests: [
      { id: "nest", label: "NEST.ai early access" },
      { id: "budhi", label: "Budhi / enterprise" },
      { id: "research", label: "Research collaboration" },
      { id: "other", label: "Something else" },
    ],
    step1Title: "I'm interested in…",
    progress: (n: number, total: number) => `Step ${n} of ${total}`,
    back: "Go back",
    successTitle: "You're on the list.",
    successBody: "We'll be in touch when there's something worth your time.",
    successCta: "Back to site",
    failure: "That didn't send. Try again, or email info@kritrimam.com directly.",
    roles: ["Student", "Educator", "Institution"],
    teamSizes: ["1–10", "11–50", "51–200", "200+"],
  },

  contact: {
    h2: "Contact",
    sub: "If you're building something and think we could help, get in touch.",
    channels: [
      { channel: "Email", value: "info@kritrimam.com", href: "mailto:info@kritrimam.com" },
      { channel: "WhatsApp", value: "+91 77366 67318", href: "https://wa.me/917736667318" },
      { channel: "LinkedIn", value: "linkedin.com/in/adhilrifayinks", href: "https://linkedin.com/in/adhilrifayinks" },
      { channel: "GitHub", value: "github.com/adrifayin", href: "https://github.com/adrifayin" },
    ],
  },

  footer: {
    tagline: "Built in Kerala, India.",
    columns: [
      {
        title: "LAB",
        links: [
          { label: "Vision", href: "#vision" },
          { label: "Research", href: "#vision" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "BUILD",
        links: [
          { label: "NEST.ai", href: "#nest" },
          { label: "Budhi", href: "#budhi" },
          { label: "GitHub", href: "https://github.com/adrifayin" },
        ],
      },
      {
        title: "LEGAL",
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
    ],
    socials: [
      { label: "LinkedIn", href: "https://linkedin.com/in/adhilrifayinks" },
      { label: "GitHub", href: "https://github.com/adrifayin" },
      { label: "Instagram", href: "https://instagram.com/adrifayin" },
    ],
    copyright: "© 2026 Kritrimam",
    backToTop: "Back to top",
  },

  media: {
    // All cuts are H.264 (baseline-compatible profiles), audio stripped, and
    // written with +faststart so playback can begin before the full download.
    heroVideoDesktop: "/video/hero-desktop.mp4",
    heroVideoMobile: "/video/hero-mobile.mp4",
    heroPoster: "/img/hero-poster.jpg",
    flowVideoDesktop: "/video/flow-desktop.mp4",
    flowVideoMobile: "/video/flow-mobile.mp4",
    flowPoster: "/img/flow-poster.jpg",
  },

  images: {
    nest: "/img/nest.jpg", // brain + orbits
    budhi: "/img/budhi.jpg", // stippled figure
    blackhole: "/img/blackhole.jpg",
    contour: "/img/contour.jpg",
    smokeHead: "/img/smoke-head.jpg",
    asciiHands: "/img/ascii-hands.jpg",
    prismHead: "/img/prism-head.jpg", // the single colour pop
  },

  microcopy: {
    loading: "One moment.",
    notFoundHeadline: "Nothing here.",
    notFoundBody:
      "The page you're looking for doesn't exist — or doesn't yet. Head back to the start.",
  },
} as const;

export type Site = typeof site;
