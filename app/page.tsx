"use client";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, Moon, SunMedium, Mail, MapPin, Github, Linkedin, FileText, GraduationCap, FlaskConical, BookOpen, Newspaper, LibraryBig, ArrowRight, Link as LinkIcon, ChevronDown, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

// ---- Quick config (edit these) ----
const PROFILE = {
  name: "Shivam Goel",
  title: "Postdoctoral Scholar, University of Alberta",
  location: "Edmonton, AB · University of Alberta & Amii",
  office: "7-250C University Commons (UComm)",
  address: "Edmonton, Alberta, Canada T6G 2E8",
  email: "goelshivam1210@gmail.com",
  scholar: "https://scholar.google.com/citations?user=aKKyLbMAAAAJ",
  github: "https://github.com/goelshivam1210",
  linkedin: "https://www.linkedin.com/in/goelshivam12/",
  twitter: null,
  cv: "/cv.pdf",
  interests: ["Open-world robotics", "Human–robot interaction", "RL for robotics", "Neuro-symbolic AI", "Force-based manipulation"],
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
    venue: "Cognitive Systems Research, 54(c), September 2019",
    links: [ { label: "PDF", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6764768/" } ],
    tags: ["planning", "ROS", "smart home"],
  },
  {
    year: 2019,
    title: "Teaching Robots to Interact with Humans in a Smart Environment.",
    authors: "Shivam Goel, Matthew E. Taylor, Diane J. Cook.",
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

const DISSERTATION_URL = "https://www.proquest.com/openview/58923caf9b69fdec8403710154acaefb/1?pq-origsite=gscholar&cbl=18750&diss=y";

const NEWS: { date: string; text: ReactNode }[] = [
  { date: "Fall 2026", text: "Joined the University of Alberta and Amii as a Postdoctoral Scholar with Matt Taylor in the IRL Lab." },
  { date: "Aug 2026", text: "Graduated from Tufts University." },
  { date: "May 2026", text: <>Defended my Ph.D. dissertation, <a href={DISSERTATION_URL} target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">Structured Abstractions for Learning and Adaptation in Open-World Environments</a>.</> },
  { date: "May 2025", text: "FLEX at ICRA 2025 (Atlanta, GA)." },
  { date: "Jan 2025", text: "AAAI 2025: Oral on neurosymbolic cognitive architecture (Open World AI)." },
  { date: "Dec 2024", text: "Joined ONR grant on force-based learning & rapid novelty adaptation using Spot." },
  { date: "Oct 2024", text: "Started NASA/UMass/MIT project on anomaly detection with drones." },
  { date: "Summer 2024", text: "Taught Introduction to Data Structures at Tufts." },
  { date: "May 2024", text: "NovelGym presented at AAMAS 2024, Auckland, NZ." },
];

const TAGS = {
  primary: "bg-[#E5E1EE] text-zinc-900 dark:bg-[#E5E1EE]/80 dark:text-zinc-900",
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
    <header className="sticky top-0 z-50 bg-[#E0E1E9] dark:bg-[#2A3D42] border-b dark:border-zinc-700/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="font-semibold tracking-tight text-lg">{PROFILE.name}</a>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <NavItem href="#top">About</NavItem>
            <NavItem href="#news">News</NavItem>
            <NavItem href="#research">Research</NavItem>
            <NavItem href="#publications">Publications</NavItem>
            <NavItem href="#teaching">Teaching</NavItem>
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
            <NavItem href="#top">About</NavItem>
            <NavItem href="#news">News</NavItem>
            <NavItem href="#research">Research</NavItem>
            <NavItem href="#publications">Publications</NavItem>
            <NavItem href="#teaching">Teaching</NavItem>
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
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {PROFILE.name}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-300 mt-1">{PROFILE.title}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {PROFILE.interests.map((t) => (
              <span key={t} className={`px-2 py-1 rounded-full text-xs ${TAGS.primary}`}>{t}</span>
            ))}
          </div>

            <div className="mt-4 space-y-3 leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                I am an incoming postdoctoral scholar at the{" "}
                <a href="https://www.ualberta.ca" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">University of Alberta</a>
                {" "}and{" "}
                <a href="https://www.amii.ca" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">Amii</a>
                , working with{" "}
                <a href="https://drmatttaylor.net" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">Matt Taylor</a>
                {" "}in the{" "}
                <a href="https://irll.ca" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">IRL Lab</a>
                . I am also affiliated with{" "}
                <a href="http://rlai.ualberta.ca/" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">RLAI</a>
                .
              </p>
              <p>
                I recently completed my Ph.D. in Computer Science at{" "}
                <a href="https://www.tufts.edu" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">Tufts University</a>
                {" "}with a focus on AI and Robotics, where I worked with{" "}
                <a href="https://www.cs.tufts.edu/~jsinapov" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">Jivko Sinapov</a>
                {" "}and{" "}
                <a href="https://engineering.tufts.edu/cs/people/faculty/matthias-scheutz" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">Matthias Scheutz</a>
                . My{" "}
                <a href="https://www.proquest.com/openview/58923caf9b69fdec8403710154acaefb/1?pq-origsite=gscholar&cbl=18750&diss=y" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">dissertation</a>
                {" "}explored how structured abstractions can help robots to learn and adapt when facing novelty in open-world environments.
              </p>
              <p>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">Research interests:</span>{" "}
                open-world robotics, human–robot interaction, and reinforcement learning for robotics.
              </p>
              <p>
                My long-term goal is to build autonomous robots that can handle the unexpected and efficiently learn, adapt, and improve by observing our daily lives — not just tools, but lifelong collaborators in our homes and workplaces.{" "}
                <a href="#research" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">Know more about my research →</a>
              </p>
            </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild>
              <a href="#publications"><BookOpen className="mr-2 h-4 w-4"/>Publications</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={PROFILE.cv}><FileText className="mr-2 h-4 w-4"/>CV</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={PROFILE.scholar} target="_blank" rel="noopener noreferrer"><GraduationCap className="mr-2 h-4 w-4"/>Google Scholar</a>
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
            <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5"/> Contact</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <MapPin className="h-4 w-4"/> {PROFILE.location}
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Mail className="h-4 w-4"/> <a className="underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </div>
            </div>
            
            <div className="mt-4">
              {!educationExpanded && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEducationExpanded(true)}
                  className="w-full justify-between p-0 h-auto text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <span>Education</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              )}
              
              {educationExpanded && (
                <div className="mt-3 space-y-3 pt-3 border-t">
                  <div className="flex items-center gap-2 font-medium text-zinc-800 dark:text-zinc-200">
                    <GraduationCap className="h-4 w-4"/> Education
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Ph.D. Computer Science</div>
                      <Badge variant="secondary" className="text-xs">2026</Badge>
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400">Tufts University</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Advisors:{" "}
                      <a href="https://scholar.google.com/citations?user=-mHoWKEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">
                        Prof. Jivko Sinapov
                      </a>
                      {" & "}
                      <a href="https://scholar.google.com/citations?user=5yT3GScAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">
                        Prof. Matthias Scheutz
                      </a>
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Research: Neuro-symbolic AI, RL & Robotics</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">M.S. Computer Science</div>
                      <Badge variant="secondary" className="text-xs">2017</Badge>
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400">Washington State University</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Advisors:{" "}
                      <a href="https://scholar.google.com/citations?user=edQgLXcAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-[#004777] dark:text-[#3AAFB9] hover:underline">
                        Prof. Matthew E. Taylor
                      </a>
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Research: Computer Vision, Robotics</div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEducationExpanded(false)}
                      className="w-full justify-between p-0 h-auto text-[#E5E1EE] dark:text-[#E5E1EE] hover:text-[#E5E1EE]/80 dark:hover:text-[#E5E1EE]/80"
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
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

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

      {/* Projects as the visual entry points into the research — not a second parallel grid of theme cards */}
      <div id="projects" className="mt-5 grid md:grid-cols-3 gap-3">
        {PROJECTS.map((prj) => {
          const isExpanded = expandedProject === prj.slug;
          const isOtherExpanded = expandedProject !== null && expandedProject !== prj.slug;

          return (
            <Link
              key={prj.slug}
              href={`/projects/${prj.slug}`}
              className="block"
              aria-label={`Read more about ${prj.title}`}
            >
              <Card
                className={`overflow-hidden flex flex-col h-full transition-all duration-500 ease-in-out cursor-pointer ${
                  isExpanded
                    ? "ring-2 ring-[#E5E1EE] dark:ring-[#E5E1EE]/30 scale-105 shadow-2xl z-50"
                    : isOtherExpanded
                    ? "opacity-40 blur-sm"
                    : ""
                }`}
                onMouseEnter={() => setExpandedProject(prj.slug)}
                onMouseLeave={() => setExpandedProject(null)}
              >
                <CardHeader className="pb-2 min-h-[56px] flex items-center justify-center">
                  <CardTitle className="text-base text-center leading-snug">{prj.title}</CardTitle>
                </CardHeader>
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
                <CardContent className="text-sm text-zinc-700 dark:text-zinc-300 flex flex-col h-full">
                  <p className="mt-3">{prj.blurb}</p>
                  <div className="mt-auto pt-3">
                    <span className="underline">Learn more →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Publications() {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const sorted = [...PUBS].sort((a, b) => b.year - a.year);
  const SHOW_N = 4;
  const visible = expanded ? sorted : sorted.slice(0, SHOW_N);
  const remaining = Math.max(0, sorted.length - SHOW_N);

  return (
    <section id="publications" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-5 w-5"/>
        <h2 className="text-xl font-semibold tracking-tight">Publications</h2>
        <Button variant="ghost" size="sm" asChild>
          <a href={PROFILE.scholar} target="_blank" rel="noopener noreferrer" className="gap-1"><LinkIcon className="h-4 w-4"/>Google Scholar</a>
        </Button>
      </div>
      <div className="mb-3 text-xs text-zinc-600 dark:text-zinc-400 flex flex-wrap gap-3">
        <span>Legend:</span>
        <span>🗣 long talk</span>
        <span>🎤 oral</span>
        <span>🔁 sim→real</span>
        <span>🧪 real-robot</span>
        <span>📦 benchmark</span>
        <span>🧾 journal</span>
      </div>
      <div className="space-y-3">
        {visible.map((p, i) => {
          const key = `${p.title}-${i}`;
          const isHovered = hovered === key;
          const isOtherHovered = hovered !== null && hovered !== key;

          return (
            <Card
              key={key}
              className={`border-l-4 border-l-[#E5E1EE] dark:border-l-[#E5E1EE]/70 transition-all duration-500 ease-in-out cursor-default ${
                isHovered
                  ? "ring-2 ring-[#E5E1EE] dark:ring-[#E5E1EE]/30 scale-[1.02] shadow-xl z-20"
                  : isOtherHovered
                  ? "opacity-40 blur-sm"
                  : ""
              }`}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
            >
              <CardHeader className="pb-2">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{p.year} · {p.venue}</div>
                <CardTitle className="text-base leading-snug">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm">
                <div className="text-zinc-700 dark:text-zinc-300">{p.authors}</div>
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className={`px-2 py-0.5 rounded-full text-xs ${TAGS.neutral}`}>{t}</span>
                    ))}
                  </div>
                )}
                {p.icons && p.icons.filter(Boolean).length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    {p.icons.filter(Boolean).map((ic) => (
                      <span key={ic}>{ic}</span>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex gap-2 flex-wrap">
                  {p.links.map((l) => (
                    <Button key={l.label} variant="secondary" size="sm" asChild>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
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
              {t.role}{t.term ? ` · ${t.term}` : ""}
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
        {visible.map((n, i) => (
          <Card key={`${n.date}-${i}`}>
            <CardContent className="pt-6 text-sm flex items-center justify-between gap-3">
              <span className="text-zinc-500 dark:text-zinc-400 shrink-0">{n.date}</span>
              <span className="text-right sm:text-left sm:ml-3 flex-1">{n.text}</span>
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
              <div className="flex items-start gap-2">
                <School className="h-4 w-4 mt-0.5 shrink-0"/>
                <div className="text-sm">
                  <div>{PROFILE.office}</div>
                  <div>{PROFILE.address}</div>
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
      <div className="min-h-screen bg-[#FAFFFD] text-zinc-900 dark:bg-[#1A2B2F] dark:text-zinc-100">
        <Header dark={dark} setDark={setDark} mounted={mounted} />
        <main>
          <Hero educationExpanded={educationExpanded} setEducationExpanded={setEducationExpanded} />
          <News />
          <Research />
          <Publications />
          <Teaching />
          <Contact />
        </main>
        <footer className="py-10 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} {PROFILE.name}. Last updated Nov 01, 2026.
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
