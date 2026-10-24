import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseModule } from "@/lib/materi/data";
import MateriView from "@/components/materi/materi-view";

interface PageProps {
  params: Promise<{
    slug: string;
    moduleSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, moduleSlug } = await params;
  const data = await getCourseModule(slug, moduleSlug);

  if (!data) {
    return {
      title: "Modul Tidak Ditemukan — Xcode HMTI",
    };
  }

  return {
    title: `${data.moduleItem.orderNumber} ${data.moduleItem.title} — ${data.course.title} | Xcode HMTI`,
    description: data.moduleItem.summary || data.course.description,
  };
}

export default async function ClassModuleReaderPage({ params }: PageProps) {
  const { slug, moduleSlug } = await params;
  const data = await getCourseModule(slug, moduleSlug);

  if (!data) {
    notFound();
  }

  return (
    <MateriView
      course={data.course}
      chapter={data.chapter}
      moduleItem={data.moduleItem}
      prevModule={data.prevModule}
      nextModule={data.nextModule}
    />
  );
}
