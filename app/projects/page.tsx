"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PROJECT_INDEX = [
  { slug: "force-space", title: "Object-based Force-space Learning", blurb: "Robot-agnostic policies; sim→real (Spot/UR5/Panda/Kinova)." },
  { slug: "neurosymbolic-open-world", title: "Neurosymbolic Systems for Open-world Novelty", blurb: "Reasoning + RL for novelty handling and recovery." },
  { slug: "open-world-benchmarks", title: "Domains for Open-world Benchmarking", blurb: "NovelGym and related evaluation suites." },
];

export default function ProjectsIndex() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">Projects</h1>
      <div className="grid md:grid-cols-3 gap-3">
        {PROJECT_INDEX.map(p => (
          <Card key={p.slug}>
            <CardHeader><CardTitle className="text-base">{p.title}</CardTitle></CardHeader>
            <CardContent className="text-sm">
              <p className="mb-3">{p.blurb}</p>
              <Link className="underline" href={`/projects/${p.slug}`}>View project →</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}