import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DATA: Record<string, {
  title: string;
  blurb: string;
  abstract: string;
  highlights: string[];
  media: { type:"img"|"video"; src:string; alt?:string }[];
  people: { name:string; role?:string; url?:string }[];
  pubs: string[]; // match titles from PUBS in page.tsx
  links: { label:string; href:string }[];
}> = {
  "force-space": {
    title: "Object-based Force-space Learning",
    blurb: "Robot-agnostic force policies; sim→real to Spot.",
    abstract: "We study force-space policies that compose prismatic/revolute skills and transfer across robots via object-centric representations and symbolic planning.",
    highlights: [
      "Robot-agnostic policies in force-space",
      "Compositional primitives (prismatic/revolute)",
      "Sim→real transfer to Spot",
    ],
    media: [{ type:"img", src:"/fs-hero.jpg", alt:"Force-space policy"}],
    people: [{ name:"Shivam Goel" }, { name:"Collaborators", role:"" }],
    pubs: [
      "FLEX: A Framework for Learning Robot-Agnostic Force-based Skills Involving Sustained Contact Object Manipulation",
    ],
    links: [
      { label:"Project", href:"https://tufts-ai-robotics-group.github.io/FLEX/" },
      { label:"arXiv", href:"https://arxiv.org/abs/2503.13418" },
    ],
  },
  "neurosymbolic-open-world": {
    title: "Neurosymbolic Systems for Open-world Novelty Handling",
    blurb: "Hybrid reasoning and RL to detect, adapt, and recover from novelties.",
    abstract: "Neurosymbolic agents combine logical structure and learned policies to act robustly under novelty, with goal-conditioned continual learning.",
    highlights: [
      "Goal-conditioned continual learning",
      "Novelty detection and recovery",
      "Cognitive-architecture integration",
    ],
    media: [{ type:"img", src:"/ns-hero.jpg", alt:"Neurosymbolic"}],
    people: [{ name:"Shivam Goel" }, { name:"Collaborators" }],
    pubs: [
      "A Framework for Neurosymbolic Goal-Conditioned Continual Learning for Open World Environments",
      "Neurosymbolic Cognitive Architecture for Handling Novelties in Open Worlds",
      "RAPid-Learn: Learning to Recover for Handling Novelties in Open-World Environments",
    ],
    links: [],
  },
  "open-world-benchmarks": {
    title: "Domains for Open-world Benchmarking",
    blurb: "NovelGym and evaluation suites for hybrid planning + learning agents.",
    abstract: "We design domains and metrics that evaluate novelty handling and safety across open-world scenarios with hybrid planning+RL agents.",
    highlights: ["NovelGym benchmarks", "Clear metrics & protocols"],
    media: [{ type:"img", src:"/ng-hero.jpg", alt:"NovelGym"}],
    people: [{ name:"Shivam Goel" }, { name:"Collaborators" }],
    pubs: [
      "NovelGym: A Flexible Ecosystem for Hybrid Planning and Learning Agents Designed for Open Worlds",
    ],
    links: [
      { label:"Website", href:"https://clarech712.github.io/ng-website/" },
      { label:"Paper", href:"https://www.ifaamas.org/Proceedings/aamas2024/pdfs/p688.pdf" },
    ],
  },
};

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const p = DATA[slug];
  if (!p) return notFound();

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
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

      {/* related pubs */}
      <Card className="mt-4">
        <CardHeader><CardTitle className="text-base">Related Publications</CardTitle></CardHeader>
        <CardContent className="text-sm">
          <ul className="list-disc pl-5">
            {p.pubs.map(title => <li key={title}>{title}</li>)}
          </ul>
        </CardContent>
      </Card>

      {/* resources */}
      {p.links.length > 0 && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {p.links.map(l => (
            <Button key={l.href} asChild variant="secondary" size="sm">
              <Link href={l.href}>{l.label}</Link>
            </Button>
          ))}
        </div>
      )}
    </section>
  );
}