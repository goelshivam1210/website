import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";

const DATA: Record<string, {
  title: string;
  blurb: string;
  abstract: string;
  highlights: string[];
  media: { type:"img"|"video"; src:string; alt?:string }[];
  videos: { src: string; title?: string }[];
  people: { name:string; role?:string; url?:string }[];
  pubs: { title: string; year?: string | number; venue?: string; href?: string; links?: { label: string; href: string }[] }[]; // title + optional labeled links + year/venue
  links: { label:string; href:string }[];
}> = {
  "force-space": {
    title: "Object-based Force-space Learning",
    blurb: "Robot-agnostic force policies; sim→real.",
    abstract: "We use force based formulation to learn object centric manipulation policies using reinforcement learning. After training in simulation, we use inverse kinematics to transfer these policies to a variety of robots including Spot, UR5, Panda and Kinova.",
    highlights: [
      "Robot-agnostic policies in force-space",
      "Compositional primitives (prismatic/revolute)",
      "Sim→real transfer",
    ],
    media: [{ type:"img", src:"/fs-hero.jpg", alt:"Force-space policy"}],
    videos: [
      { src: "https://www.youtube.com/embed/MvVBS6EenZE", title: "FLEX Demo" },
      { src: "https://www.youtube.com/embed/heBp1l0w8xI", title: "Force-space Learning" },
    ],
    people: [{ name:"Shivam Goel" }, { name:"Shijie Fang" }, { name:"Wenchang Gao" }],
    pubs: [
      {
        title: "FLEX: A Framework for Learning Robot-Agnostic Force-based Skills Involving Sustained Contact Object Manipulation",
        year: 2025,
        venue: "IEEE ICRA",
        links: [
          { label: "arXiv", href: "https://arxiv.org/abs/2503.13418" },
          { label: "Website", href: "https://tufts-ai-robotics-group.github.io/FLEX/" },
        ],
      },
    ],
    links: []
  },
  "neurosymbolic-open-world": {
    title: "Neurosymbolic Agents for Open-world Novelty Handling",
    blurb: "Hybrid reasoning and RL to detect, adapt, and recover from novelties.",
      abstract: "\"Open world\" environments are those in which novel objects, agents, events, and more can appear and contradict previous understandings of the environment. This contradicts the \"closed world\" assumption used in most AI research, where the environment is assumed to be fully understood and unchanging.The types of environments AI agents can be deployed in arelimited by the inability to handle the novelties that occur in open world environments. In this project, we develop Cognitive architectures, and general algorithms and frameworks that enable agents to detect, adapt, and recover from novelties in open world environments. We use a combination of symbolic reasoning and reinforcement learning to achieve this. Our work includes the development of neurosymbolic cognitive architectures, goal-conditioned continual learning algorithms, and rapid recovery mechanisms.",
    highlights: [
      "Goal-conditioned continual learning",
      "Novelty detection and recovery",
      "Cognitive-architecture",
    ],
    media: [{ type:"img", src:"/ns-hero.jpg", alt:"Neurosymbolic"}],
    videos: [],
      people: [{ name: "Shivam Goel" }, { name: "Yash Shukla" }, { name: "Panagiotis Lymperpolous" }, { name: "Pierrick Lorang" }, { name: "Ravenna Thielstorm" }, { name: "Vasanth Sarathy" }],
    pubs: [
      {
        title: "A neurosymbolic cognitive architecture framework for handling novelties in open worlds",
        year: 2024,
        venue: "AI Journal",
        links: [
          { label: "PDF", href: "https://hrilab.tufts.edu/publications/goeletal24aij.pdf" },
          { label: "DOI", href: "https://www.sciencedirect.com/science/article/pii/S000437022400047X?casa_token=YPjoDi2mJYMAAAAA:4ylWR_raJTP91XDu8Lqgx0ysoLPI_Nfa_9_2VUI5zgCZb76vh9Oe1nS_MEhhEfCSGgc6jqhG" }
        ],
      },
      {
        title: "A framework for neurosymbolic goal-conditioned continual learning in open world environments",
        year: 2024,
        venue: "IEEE IROS",
        links: [
          { label: "PDF", href: "https://hrilab.tufts.edu/publications/lorangetal2024iros.pdf" },
          { label: "DOI", href: "https://ieeexplore.ieee.org/abstract/document/10801627" },
        ],
        },
            {
        title: "Rapid-learn: A framework for learning to recover for handling novelties in open-world environments",
        year: 2022,
        venue: "IEEE ICDL",
        links: [
          { label: "PDF", href: "https://hrilab.tufts.edu/publications/goeletal22icdl.pdf" },
          { label: "arXiv", href: "https://arxiv.org/pdf/2206.12493" },
          { label: "DOI", href: "https://ieeexplore.ieee.org/abstract/document/9962230/" },
          { label: "Code", href: "https://github.com/goelshivam1210/RAPid-Learn" },
        ],
        },
      
      {
        title: "Spotter: Extending symbolic planning operators through targeted reinforcement learning",
        year: 2021,
        venue: "AAMAS",
        links: [
          { label: "PDF", href: "https://hrilab.tufts.edu/publications/sarathy2021aamas.pdf" },
          { label: "arXiv", href: "https://arxiv.org/pdf/2012.13037" },
          { label: "DOI", href: "https://www.ifaamas.org/Proceedings/aamas2021/pdfs/p1118.pdf" }
        ],
      },
      {
        title: "A novelty-centric agent architecture for changing worlds",
        year: 2021,
        venue: "AAMAS",
        links: [
          { label: "PDF", href: "https://hrilab.tufts.edu/publications/muhammadetal21aamas.pdf" },
          { label: "arXiv", href: "https://arxiv.org/pdf/2012.13037" },
          { label: "DOI", href: "https://ifaamas.org/Proceedings/aamas2021/pdfs/p925.pdf" }
        ],
      },
    ],
    links: [],
  },
  "open-world-benchmarks": {
    title: "Domains for Open-world Benchmarking",
    blurb: "NovelGym and evaluation suites for hybrid planning + learning agents.",
    abstract: "We design domains and metrics that evaluate novelty handling across open-world scenarios with hybrid planning+RL agents. We develop openAI gym based domains like NovelGym and NovelGridworlds that provide a flexible framework for benchmarking. We also provide clear metrics and protocols for evaluating novelty handling.",
    highlights: ["NovelGym benchmarks", "Clear metrics & protocols"],
    media: [{ type:"img", src:"/ng-hero.jpg", alt:"NovelGym"}],
    videos: [],
    people: [{ name:"Shivam Goel" }, { name:"Gyan Tatiya" }, { name:"Yichen Wei" }, { name:"Panagiotis Lymperopoulos" }, { name:"Klara Chura" }],
    pubs: [
      {
        title: "NovelGym: A Flexible Ecosystem for Hybrid Planning and Learning Agents Designed for Open Worlds",
        year: 2024,
        venue: "AAMAS",
        links: [
          { label: "PDF", href: "https://www.ifaamas.org/Proceedings/aamas2024/pdfs/p688.pdf" },
          { label: "Code", href: "https://github.com/tufts-ai-robotics-group/NovelGym" },
          { label: "Website", href: "https://clarech712.github.io/ng-website/" }
        ],
      },
      {
        title: "NovelGridworlds: A Benchmark Environment for Detecting and Adapting to Novelties in Open Worlds",
        year: 2021,
        venue: "AAMAS-ALA Workshop",
        links: [
          { label: "PDF", href: "https://mulip.cs.tufts.edu/papers/ALA2021_paper_61.pdf" },
          { label: "Code", href: "https://github.com/gtatiya/gym-novel-gridworlds" },
        ],
      }
    ],
    links: []
  },
};

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const p = DATA[slug];
  if (!p) return notFound();

  return (
    <PageWrapper>
      <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Back to Projects - Top */}
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Projects</span>
      </Link>
      
      <h1 className="text-2xl font-semibold tracking-tight">{p.title}</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{p.blurb}</p>

      {/* highlights */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {p.highlights.map(h => <span key={h} className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/60">{h}</span>)}
      </div>

      {/* media */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {p.media.map((m,i) => m.type === "img" ? (
          <Image key={i} src={m.src} alt={m.alt || p.title} width={1200} height={800} className="rounded-lg object-cover" />
        ) : (
          <video key={i} src={m.src} controls className="rounded-lg w-full" />
        ))}
      </div>

      {/* abstract */}
      <Card className="mt-6">
        <CardHeader><CardTitle className="text-base">Description</CardTitle></CardHeader>
        <CardContent className="text-sm text-zinc-700 dark:text-zinc-300">{p.abstract}</CardContent>
      </Card>

      {/* videos */}
      {p.videos && p.videos.length > 0 && (
        <Card className="mt-4">
          <CardHeader><CardTitle className="text-base">Videos</CardTitle></CardHeader>
          <CardContent className="text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              {p.videos.map((video, i) => (
                <div key={i} className="space-y-2">
                  {video.src.includes('youtube.com/embed') || video.src.includes('youtu.be') ? (
                    <iframe 
                      src={video.src} 
                      title={video.title || `Video ${i + 1}`}
                      className="rounded-lg w-full aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video src={video.src} controls className="rounded-lg w-full" />
                  )}
                  {video.title && (
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs text-center">{video.title}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* related pubs */}
      <Card className="mt-4">
        <CardHeader><CardTitle className="text-base">Related Publications</CardTitle></CardHeader>
        <CardContent className="text-sm">
            <ul className="space-y-3">
              {p.pubs.map((pub) => (
                <li key={pub.title} className="">
                  {/* top row: year | title | venue */}
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <span className="text-xs text-zinc-500 min-w-[3.5rem]">{pub.year ?? ''}</span>
                    <span className="flex-1 text-zinc-900 dark:text-zinc-100">{pub.title}</span>
                    <span className="text-xs text-zinc-500 whitespace-nowrap">{pub.venue ?? ''}</span>
                  </div>
                  {/* links row */}
                  {(pub.links && pub.links.length > 0) ? (
                    <div className="mt-2 ml-[3.5rem] flex flex-wrap gap-2">
                      {pub.links.map((l) => (
                        <Button key={l.href} asChild variant="secondary" size="sm">
                          <Link href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</Link>
                        </Button>
                      ))}
                    </div>
                  ) : pub.href ? (
                    <div className="mt-2 ml-[3.5rem] flex flex-wrap gap-2">
                      <Button asChild variant="secondary" size="sm">
                        <Link href={pub.href} target="_blank" rel="noopener noreferrer">Link</Link>
                      </Button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
        </CardContent>
      </Card>

      {/* people */}
      <Card className="mt-4">
        <CardHeader><CardTitle className="text-base">People</CardTitle></CardHeader>
        <CardContent className="text-sm">
          <ul className="list-disc pl-5">
            {p.people.map(pe => (
              <li key={pe.name}>
                {pe.url ? <Link className="underline" href={pe.url}>{pe.name}</Link> : pe.name}
                {pe.role ? ` — ${pe.role}` : ""}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* resources */}
      {p.links?.length ? (
        <div className="mt-4 flex gap-2 flex-wrap">
          {(p.links || []).map(l => (
            <Button key={l.href} asChild variant="secondary" size="sm">
              <Link href={l.href}>{l.label}</Link>
            </Button>
          ))}
        </div>
      ) : null}
      
      {/* Back to Projects - Bottom */}
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mt-10 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Projects</span>
      </Link>
      </section>
    </PageWrapper>
  );
}