"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Moon, SunMedium, Mail, MapPin, Github, Linkedin, FileText, GraduationCap, FlaskConical, BookOpen, Cpu, Newspaper, LibraryBig, ArrowRight, Link as LinkIcon, ChevronDown, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

// ---- Quick config (edit these) ----
const PROFILE = {
  name: "Shivam Goel",
  title: "Ph.D. Candidate · Neuro-symbolic AI, RL & Robotics",
  location: "Boston, MA · Tufts University",
  email: "goelshivam1210@gmail.com",
  scholar: "https://scholar.google.com/citations?user=aKKyLbMAAAAJ",
  github: "https://github.com/goelshivam1210",
  linkedin: "https://www.linkedin.com/in/goelshivam12/",
  twitter: null,
  cv: "/cv.pdf",
  interests: ["Force-based manipulation", "Robot-agnostic policies", "Neuro-symbolic RL", "Open-world learning", "Cognitive Architectures"],
};

const PUBS = [
  {
    year: 2025,
    title: "FLEX: A Framework for Learning Robot-Agnostic Force-based Skills Involving Sustained Contact Object Manipulation",
    authors: "S. Goel*, S. Fang*, W. Gao*, M. Scheutz, J. Sinapov",
    venue: "ICRA 2025, Atlanta, GA",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2503.13418" },
      { label: "Project", href: "https://tufts-ai-robotics-group.github.io/FLEX/" }
    ],
    tags: ["force-space", "robot-agnostic", "sustained contact"],
    icons: [ "🔁 sim→real", "🧪 real-robot"],
  },
  {
    year: 2024,
    title: "Neurosymbolic Cognitive Architecture for Handling Novelties in Open Worlds",
    authors: "S. Goel et al.",
    venue: "AIJ Special Issue (Open World AI) — in press",
    links: [ { label: "PDF", href: "https://www.sciencedirect.com/science/article/am/pii/S000437022400047X" } ],
    tags: ["neurosymbolic", "novelty"],
    icons: ["🧾 journal", "🗣 long talk" ],
  },
  {
    year: 2024,
    title: "A Framework for Neurosymbolic Goal-Conditioned Continual Learning for Open World Environments",
    authors: "P. Lorang, S. Goel, Y. Shukla, P. Zips, M. Scheutz",
    venue: "IROS 2024",
    links: [ { label: "PDF", href: "https://hrilab.tufts.edu/publications/lorangetal24iros.pdf" } ],
    tags: ["continual learning", "neurosymbolic"],
    icons: ["🎤 oral"],
  },
  {
    year: 2024,
    title: "Agent-Centric Human Demonstrations Train World Models",
    authors: "J. Staley, S. Goel, Y. Shukla, E. S. Short",
    venue: "RLC 2024 / RLJ 2024",
    links: [ { label: "PDF", href: "https://aabl.cs.tufts.edu/papers/rlc2024_james.pdf" } ],
    tags: ["world models", "human demos"],
    icons: [""],
  },
  {
    year: 2024,
    title: "NovelGym: A Flexible Ecosystem for Hybrid Planning and Learning Agents Designed for Open Worlds",
    authors: "S. Goel, Y. Wei, P. Lymperopoulos, K. Chura, M. Scheutz, J. Sinapov",
    venue: "AAMAS 2024",
    links: [
      { label: "PDF", href: "https://www.ifaamas.org/Proceedings/aamas2024/pdfs/p688.pdf" },
      { label: "Website", href: "https://clarech712.github.io/ng-website/" }
    ],
    tags: ["benchmark", "open-world"],
    icons: ["📦 benchmark", "🎤 oral" ]
  },
  {
    year: 2023,
    title: "Few-Shot Policy Transfer through Observation Mapping and Behavior Cloning",
    authors: "Y. Shukla, B. Kesari, S. Goel, R. Wright, J. Sinapov",
    venue: "IROS 2023",
    links: [ { label: "PDF", href: "https://mulip.cs.tufts.edu/papers/shukla_iros_23.pdf" } ],
    tags: ["transfer", "imitation"],
    icons: ["🎤 oral"],
  },
  {
    year: 2022,
    title: "RAPid-Learn: Learning to Recover for Handling Novelties in Open-World Environments",
    authors: "S. Goel, Y. Shukla, V. Sarathy, M. Scheutz, J. Sinapov",
    venue: "ICDL 2022",
    links: [ { label: "arXiv", href: "https://arxiv.org/abs/2206.12493" } ],
    tags: ["novelty", "hybrid planning+RL"],
    icons: ["🗣 long talk"],
  },
  {
    year: 2021,
    title: "Spotter: Extending Symbolic Planning Operators through Targeted RL",
    authors: "V. Sarathy, D. Kasenberg, S. Goel, J. Sinapov, M. Scheutz",
    venue: "AAMAS 2021",
    links: [ { label: "PDF", href: "https://arxiv.org/abs/2012.13037" } ],
    tags: ["planning", "RL"],
  },
  {
    year: 2021,
    title: "A novelty-centric agent architecture for changing worlds.",
    authors: "Faizan Muhammad, Vasanth Sarathy, Gyan Tatiya, Shivam Goel, Saurav Gyawali, Mateo Guaman, Jivko Sinapov, Matthias Scheutz.",
    venue: "AAMAS 2021",
    links: [ { label: "PDF", href: "https://www.sift.net/sites/default/files/publications/muhammad_et_al._-_2021_-_a_novelty-centric_agent_architecture_for_changing_.pdf" } ],
    tags: ["planning", "Cognitive Architectures", "novelty"],
  },
  {
    year: 2019,
    title: "Robot-enabled support of daily activities in smart home environments",
    authors: "Garrett Wilson, Christopher Pereyda, Nisha Raghunath, Gabriel de la Cruz, Shivam Goel, Sepehr Nesaei, Bryan Minor, Maureen Schmitter-Edgecombe, Matthew E Taylor, Diane J Cook.",
    venue: "COgnitive Systems Research, 54(c), September 2019",
    links: [ { label: "PDF", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6764768/" } ],
    tags: ["planning", "ROS", "smart home"],
  },
  {
    year: 2019,
    title: "Teaching Robots to Interact with Humans in a Smart Environment.",
    authors: "Shivam Goel, Matthrew E. Taylor, Diane J. Cook.",
    venue: "IJCAI-2019, Extended Abstract",
    links: [ { label: "PDF", href: "https://www.ijcai.org/Proceedings/2019/0906.pdf" } ],
    tags: ["RL", "smart home", "human-robot interaction"],
  },
];

const PROJECTS = [
  {
    slug: "force-space",
    title: "Object-based Force-space Learning",
    img: "/fs-hero.jpg",
    blurb: "Robot-agnostic policies; sim→real (Spot/UR5/Panda/Kinova).",
  },
  {
    slug: "neurosymbolic-open-world",
    title: "Neurosymbolic Systems for Open-world Novelty Handling",
    img: "/ns-hero.jpg",
    blurb: "Reasoning + RL for novelty detection, adaptation, and recovery.",
  },
  {
    slug: "open-world-benchmarks",
    title: "Domains for Open-world Benchmarking",
    img: "/ng-hero.jpg",
    blurb: "NovelGym and evaluation suites for hybrid planning+RL agents.",
  },
];

const TEACHING = [
  { course: "Introduction to Data Structures", role: "Instructor", term: "Summer 2024" },
  { course: "Artificial Intelligence", role: "TA", term: "Spring 2023, Fall 2023, Spring 2024" },
  { course: "Object Oriented Techniques using C#", role: "TA" },
];

const NEWS = [
  { date: "Sep 2025", text: "I am on the Job market. Expected graduation in May 2026." },
  { date: "May 2025", text: "FLEX at ICRA 2025 (Atlanta, GA)." },
  { date: "Jan 2025", text: "AAAI 2025: Oral on neurosymbolic cognitive architecture (Open World AI)." },
  { date: "Dec 2024", text: "Joined ONR grant on force-based learning & rapid novelty adaptation using Spot." },
  { date: "Oct 2024", text: "Started NASA/UMass/MIT project on anomaly detection with drones." },
  { date: "Summer 2024", text: "Taught Introduction to Data Structures at Tufts." },
  { date: "May 2024", text: "NovelGym presented at AAMAS 2024, Auckland, NZ." },
];

const TAGS = {
  primary: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
  neutral: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
};

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
      {children}
    </a>
  );
}

function Header({ dark, setDark, mounted }: { dark: boolean; setDark: (v: boolean) => void; mounted: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-zinc-950/60 border-b dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-semibold tracking-tight text-lg" />
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <NavItem href="#top">Home</NavItem>
            <NavItem href="#research">Research</NavItem>
            <NavItem href="#publications">Publications</NavItem>
            <NavItem href="/#projects">Projects</NavItem>
            <NavItem href="#teaching">Teaching</NavItem>
            <NavItem href="#news">News</NavItem>
            <NavItem href="#contact">Contact</NavItem>
          </nav>
          <div className="flex items-center gap-2">
            {mounted && (
              <Button variant="ghost" size="icon" onClick={() => { const next = !dark; setDark(next); const root = document.documentElement; root.classList.toggle('dark', next); try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {} }} aria-label="Toggle theme">
                {dark ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {open && (
          <div className="md:hidden pb-3 flex flex-col gap-1 text-sm">
            <NavItem href="#top">Home</NavItem>
            <NavItem href="#research">Research</NavItem>
            <NavItem href="#publications">Publications</NavItem>
            <NavItem href="/#projects">Projects</NavItem>
            <NavItem href="#teaching">Teaching</NavItem>
            <NavItem href="#news">News</NavItem>
            <NavItem href="#contact">Contact</NavItem>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero({ educationExpanded, setEducationExpanded }: { educationExpanded: boolean; setEducationExpanded: (v: boolean) => void }) {
  return (
    <section id="top" className="max-w-6xl mx-auto px-4 pt-10 pb-8">
      <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/profile.jpg"
              alt="Shivam Goel"
              width={256}
              height={256}
              className="rounded-full object-cover shadow-lg"
              priority
            />
            <div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-3xl md:text-4xl font-semibold tracking-tight">
                {PROFILE.name}
              </motion.h1>
              <p className="text-zinc-600 dark:text-zinc-300 mt-1">{PROFILE.title}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {PROFILE.interests.map((t) => (
              <span key={t} className={`px-2 py-1 rounded-full text-xs ${TAGS.primary}`}>{t}</span>
            ))}
          </div>

            <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
            {/* Hi, I’m Shivam — a Ph.D. candidate at Tufts University. I build robots and AI that learn, adapt, and thrive in open worlds */}
            I am a Ph.D. candidate in Computer Science at Tufts University, specializing in robotics and artificial intelligence. My research focuses on neuro-symbolic AI and reinforcement learning for open-world robotics.
            I envision a future where autonomous robots handle the unexpected and can efficiently learn, adapt, and improve by observing our daily lives. Not just tools, but lifelong collaborators in our homes and workplaces.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild>
              <a href="#publications"><BookOpen className="mr-2 h-4 w-4"/>Publications</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={PROFILE.cv}><FileText className="mr-2 h-4 w-4"/>CV</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={PROFILE.github}><Github className="mr-2 h-4 w-4"/>GitHub</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={PROFILE.linkedin}><Linkedin className="mr-2 h-4 w-4"/>LinkedIn</a>
            </Button>
          </div>
        </div>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5"/> Education</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {/* Collapsed state - always visible */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <MapPin className="h-4 w-4"/> {PROFILE.location}
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Mail className="h-4 w-4"/> <a className="underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </div>
            </div>
            
            {/* Expandable education details */}
            <div className="mt-4">
              {!educationExpanded && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEducationExpanded(true)}
                  className="w-full justify-between p-0 h-auto text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <span>Show more</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              )}
              
              {educationExpanded && (
                <div className="mt-3 space-y-3 pt-3 border-t">
                  {/* Current PhD */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Ph.D. Computer Science</div>
                      <Badge variant="secondary" className="text-xs">2020-Present</Badge>
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400">Tufts University</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Advisors: Prof. Jivko Sinapov & Prof. Matthias Scheutz</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Research: Neuro-symbolic AI, RL & Robotics</div>
                  </div>
                  
                  <Separator />
                  
                  {/* MS */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">M.S. Computer Science</div>
                      <Badge variant="secondary" className="text-xs">2015-2017</Badge>
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400">Washington State University</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Advisors: Prof. Matthew E. Taylor</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Research: Computer Vision, Robotics</div>
                  </div>
                  
                  {/* Show less button at the bottom */}
                  <div className="pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEducationExpanded(false)}
                      className="w-full justify-between p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      <span>Show less</span>
                      <ChevronDown className="h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Research() {
  const areas = [
    { t: "Open-World Robotics", d: "Agents that handle novelty, uncertainty, and unstructured settings." },
    { t: "Force-Space Policies", d: "Object-centric control via contact forces; transfers across robots." },
    { t: "Articulated Objects", d: "Learning prismatic and revolute skills with sustained contact." },
    { t: "Neuro-Symbolic RL", d: "Planning-informed exploration, safety checks, and recovery." },
    { t: "Sim→Real & Transfer", d: "From simulation to Spot/UR5/Panda/Kinova with minimal retraining." },
    { t: "Safety & Evaluation", d: "Failure recovery, novelty detection, and standardized benchmarks." },
  ];

  const methods = ["RL (PPO/TD3)", "Force-space control", "PDDL Planning", "ROS", "Spot SDK"];
  const robots  = ["Spot", "UR5", "Panda", "Kinova", "LoCoBot", "TurtleBot"]; // fixed: no double comma

  return (
    <section id="research" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-3">
        <FlaskConical className="h-5 w-5" aria-hidden />
        <h2 className="text-xl font-semibold tracking-tight">Research</h2>
      </div>

      <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-5xl">
        My research aims to advance AI and robotics for <span className="font-medium">open-world environments</span>, where novelty, uncertainty, and unstructured interactions are the norm.
        A central focus is <span className="font-medium">force-space manipulation</span>, grounding policies in physical interaction and object-centric representations to transfer across robot embodiments.
        By combining <span className="font-medium">learning</span>, <span className="font-medium">planning</span>, and <span className="font-medium">structured object models</span>, I build frameworks and algorithms that unify high-level reasoning with low-level control aiming toward autonomous robots that thrive in dynamic real-world settings.
      </p>

      <div className="mt-4 grid md:grid-cols-3 gap-3">
        {areas.map(x => (
          <Card key={x.t} className="h-full">
            <CardHeader><CardTitle className="text-sm">{x.t}</CardTitle></CardHeader>
            <CardContent className="text-sm text-zinc-700 dark:text-zinc-300">{x.d}</CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-3">
        <Card>
          <CardHeader><CardTitle className="text-sm">Methods</CardTitle></CardHeader>
          <CardContent className="text-xs flex flex-wrap gap-2">
            {methods.map(m => (
              <span key={m} className={`px-2 py-1 rounded-full ${TAGS.neutral}`}>{m}</span>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Robots</CardTitle></CardHeader>
          <CardContent className="text-xs flex flex-wrap gap-2">
            {robots.map(r => (
              <span key={r} className={`px-2 py-1 rounded-full ${TAGS.neutral}`}>{r}</span>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Publications() {
  const [expanded, setExpanded] = useState(false);
  const sorted = [...PUBS].sort((a, b) => b.year - a.year);
  const SHOW_N = 4; // default visible count
  const visible = expanded ? sorted : sorted.slice(0, SHOW_N);
  const remaining = Math.max(0, sorted.length - SHOW_N);

  return (
    <section id="publications" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-5 w-5"/>
        <h2 className="text-xl font-semibold tracking-tight">Publications</h2>
        <Button variant="ghost" size="sm" asChild>
          <a href={PROFILE.scholar} className="gap-1"><LinkIcon className="h-4 w-4"/>Google Scholar</a>
        </Button>
      </div>
      <div className="mb-3 text-xs text-zinc-600 dark:text-zinc-400 flex flex-wrap gap-3">
        <span>Legend:</span>
        {/* <span>⭐ first-author</span> */}
        {/* <span>✳ co-first</span> */}
        {/* <span>🧭 corresponding</span> */}
        <span>🗣 long talk</span>
        <span>🎤 oral</span>
        {/* <span>🏆 best paper</span> */}
        {/* <span>🎥 video</span> */}
        {/* <span>💾 code</span> */}
        {/* <span>🌐 project</span> */}
        <span>🔁 sim→real</span>
        <span>🧪 real-robot</span>
        <span>📦 benchmark</span>
        <span>🧾 journal</span>
      </div>
      <div className="space-y-3">
        {visible.map((p, i) => (
          <Card key={`${p.title}-${i}`} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{p.year} · {p.venue}</div>
              <CardTitle className="text-base leading-snug">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm">
              <div className="text-zinc-700 dark:text-zinc-300">{p.authors}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.tags?.map((t) => (
                  <span key={t} className={`px-2 py-0.5 rounded-full text-xs ${TAGS.neutral}`}>{t}</span>
                ))}
              </div>
              {p.icons && p.icons.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {p.icons.map(ic => (
                    <span key={ic}>{ic}</span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex gap-2 flex-wrap">
                {p.links.map((l) => (
                  <Button key={l.label} variant="secondary" size="sm" asChild>
                    <a href={l.href}>{l.label}</a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {remaining > 0 && (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="pubs-extra"
          >
            {expanded ? "Show fewer" : `Show ${remaining} more`}
          </Button>
        </div>
      )}
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-3">
        <Cpu className="h-5 w-5"/>
        <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {PROJECTS.map((prj) => (
          <Card key={prj.slug} className="overflow-hidden flex flex-col h-full">
            {/* Title on top */}
            <CardHeader className="pb-2 min-h-[60px] flex items-center justify-center">
              <CardTitle className="text-base text-center">{prj.title}</CardTitle>
            </CardHeader>

            {/* Uniform image in the middle */}
            <div className="w-full bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={prj.img}
                alt={prj.title}
                width={1200}
                height={675}
                className="w-full h-40 object-cover"
                priority={false}
              />
            </div>

            {/* Description + link */}
            <CardContent className="text-sm text-zinc-700 dark:text-zinc-300 flex flex-col h-full">
              <p className="mt-3">{prj.blurb}</p>
              <div className="mt-auto pt-3">
                <Link
                  href={`/projects/${prj.slug}`}
                  className="underline"
                  aria-label={`Read more about ${prj.title}`}
                >
                  Click to know more →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Teaching() {
  return (
    <section id="teaching" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-3">
        <LibraryBig className="h-5 w-5"/>
        <h2 className="text-xl font-semibold tracking-tight">Teaching</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {TEACHING.map((t) => (
          <Card key={t.course}>
            <CardHeader>
              <CardTitle className="text-base">{t.course}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-700 dark:text-zinc-300">
              {t.role} · {t.term}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function News() {
  const [expanded, setExpanded] = useState(false);
  const SHOW_N = 4;
  const visible = expanded ? NEWS : NEWS.slice(0, SHOW_N);
  const remaining = Math.max(0, NEWS.length - SHOW_N);

  return (
    <section id="news" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-3">
        <Newspaper className="h-5 w-5"/>
        <h2 className="text-xl font-semibold tracking-tight">News</h2>
      </div>
      <div className="space-y-3">
        {visible.map((n) => (
          <Card key={n.text}>
            <CardContent className="pt-6 text-sm flex items-center justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">{n.date}</span>
              <span className="ml-3">{n.text}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      {remaining > 0 && (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Show fewer" : `Show ${remaining} more`}
          </Button>
        </div>
      )}
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-5 w-5"/>
        <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
      </div>
      <Card>
        <CardContent className="pt-6 text-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> <a className="underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {PROFILE.location}</div>
              <div className="flex items-center gap-2">
                <School className="h-4 w-4"/> 
                <div className="text-sm">
                  <div> Joyce Cummings Center (JCC) </div>
                  <div>177 College Ave, Room 483-06</div>
                </div>
              </div>
              <div className="flex items-center gap-2"><Github className="h-4 w-4"/> <a className="underline" href={PROFILE.github}>GitHub</a></div>
              <div className="flex items-center gap-2"><Linkedin className="h-4 w-4"/> <a className="underline" href={PROFILE.linkedin}>LinkedIn</a></div>
            </div>
            <Button asChild>
              <a href={`mailto:${PROFILE.email}?subject=Hello from your website`}>
                Say hi <ArrowRight className="ml-1 h-4 w-4"/>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default function AcademicSite() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [educationExpanded, setEducationExpanded] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Only run theme logic after component mounts
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
      } catch {}
    }
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Header dark={dark} setDark={setDark} mounted={mounted} />
        <main>
          <Hero educationExpanded={educationExpanded} setEducationExpanded={setEducationExpanded} />
          <Research />
          <Publications />
          <Projects />
          <Teaching />
          <News />
          <Contact />
        </main>
        <footer className="py-10 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} {PROFILE.name}. Last updated Aug 15, 2025.
        </footer>
      </div>
      <style>{`
        /* Smooth scroll for in-page anchor links */
        html { scroll-behavior: smooth; }
        
        /* Ensure full-height base elements */
        html, body, #root { height: 100%; }
        
        /* Offset for sticky header when jumping to #anchors */
        [id] { scroll-margin-top: 84px; }
      `}</style>
    </div>
  );
}
