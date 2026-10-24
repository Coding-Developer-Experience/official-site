import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseModule } from "@/lib/materi/data";
import MateriView from "@/components/materi/materi-view";

interface PageProps {
  params: Promise<{
    courseSlug: string;
    moduleId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug, moduleId } = await params;
  const data = await getCourseModule(courseSlug, moduleId);

  if (!data) {
    return {
      title: "Modul Tidak Ditemukan — Codex",
    };
  }

  return {
    title: `${data.moduleItem.orderNumber} ${data.moduleItem.title} — ${data.course.title} | Codex`,
    description: data.moduleItem.summary || data.course.description,
  };
}

export default async function ModulDetailPage({ params }: PageProps) {
  const { courseSlug, moduleId } = await params;
  const data = await getCourseModule(courseSlug, moduleId);

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
