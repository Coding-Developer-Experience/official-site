"use client";

import Image, { type StaticImageData } from "next/image";
import {
  Code,
  Folder,
  CheckCircle,
  Users,
  MessagesSquare,
  BookOpen,
  GitCommitHorizontal,
  GitBranch,
  Globe,
  Rocket,
  TrendingUp,
  Briefcase,
  Plane,
  type LucideIcon,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import laptopImg from "@/lib/tujuan/laptop.png";
import percakapanImg from "@/lib/tujuan/percakapan.png";
import kolaborasiImg from "@/lib/tujuan/kolaborasi.png";
import karierImg from "@/lib/tujuan/karier.png";

type FeatureItem = {
  icon: LucideIcon;
  label: string;
};

type Feature = {
  image: StaticImageData;
  logo: LucideIcon;
  title: string;
  description: string;
  accent: string;
  items: FeatureItem[];
};

const features: Feature[] = [
  {
    image: laptopImg,
    logo: Code,
    title: "Project-Based Learning",
    description:
      "Mengembangkan kemampuan melalui pembangunan proyek nyata yang menghasilkan pengalaman praktis serta portofolio yang berkualitas.",
    accent: "#2563EB",
    items: [
      { icon: Code, label: "Real Project" },
      { icon: Folder, label: "Team Collaboration" },
      { icon: CheckCircle, label: "Portfolio Development" },
    ],
  },
  {
    image: percakapanImg,
    logo: Users,
    title: "Collaborative Learning",
    description:
      "Membangun budaya belajar yang kolaboratif melalui diskusi, code review, mentoring, dan kerja tim secara berkelanjutan.",
    accent: "#F59E0B",
    items: [
      { icon: Users, label: "Discussion" },
      { icon: MessagesSquare, label: "Code Review" },
      { icon: BookOpen, label: "Knowledge Sharing" },
    ],
  },
  {
    image: kolaborasiImg,
    logo: GitBranch,
    title: "Open Source Contribution",
    description:
      "Mendorong kontribusi terhadap proyek open source sebagai sarana memperoleh pengalaman praktis serta memahami standar pengembangan perangkat lunak modern.",
    accent: "#10B981",
    items: [
      { icon: GitCommitHorizontal, label: "Git Workflow" },
      { icon: GitBranch, label: "Open Source" },
      { icon: Globe, label: "Community Impact" },
    ],
  },
  {
    image: karierImg,
    logo: Plane,
    title: "Career Development",
    description:
      "Mempersiapkan anggota menghadapi dunia profesional melalui pengembangan kompetensi teknis, soft skills, dan portofolio yang relevan.",
    accent: "#8B5CF6",
    items: [
      { icon: Rocket, label: "Technical Skills" },
      { icon: TrendingUp, label: "Soft Skills" },
      { icon: Briefcase, label: "Career Readiness" },
    ],
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Features() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex w-full flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1 text-xs font-medium tracking-wide text-neutral-500"
          >
            <span className="size-1.5 rounded-full bg-[#2563EB]" />
            Pilar Utama
          </motion.p>

          <motion.h2
            variants={item}
            className="max-w-2xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-[1.1]"
          >
            Pilar Utama Komunitas
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-500 sm:mt-5 sm:text-base lg:text-lg"
          >
            Seluruh kegiatan di Xcode dibangun berdasarkan empat pilar utama yang
            menjadi landasan dalam proses pembelajaran, kolaborasi, pengembangan
            kompetensi, dan persiapan karier di bidang teknologi.
          </motion.p>

          <motion.div
            variants={container}
            className="mt-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="group flex h-full flex-col rounded-[24px] border border-[#E8ECF5] bg-white p-5 shadow-[0_8px_28px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-[0_28px_56px_-20px_rgba(15,23,42,0.18)] sm:p-6"
              >
                <div className="relative w-full">
                  <div
                    className="relative w-full overflow-hidden rounded-xl"
                    style={{ aspectRatio: "1425 / 1796" }}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="pointer-events-none object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at top left, ${feature.accent}22 0%, transparent 55%)`,
                      }}
                    />
                  </div>
                  <div
                    className="absolute left-3 top-3 z-10 grid size-10 place-items-center rounded-xl border border-white/80 bg-white/90 shadow-[0_8px_18px_-6px_rgba(15,23,42,0.25)] backdrop-blur-sm sm:size-11"
                    style={{ color: feature.accent }}
                  >
                    <feature.logo className="size-5" strokeWidth={2} />
                  </div>
                </div>

                <div className="mt-5 flex flex-1 flex-col text-left">
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500 flex-1">
                    {feature.description}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-neutral-100 pt-5">
                    {feature.items.map((featureItem) => (
                      <li key={featureItem.label} className="flex items-center gap-2.5">
                        <featureItem.icon
                          className="size-[18px] shrink-0"
                          style={{ color: feature.accent }}
                          strokeWidth={2}
                        />
                        <span className="text-sm font-medium text-neutral-700">
                          {featureItem.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}