import { redirect } from "next/navigation";

export default async function MateriCourseRedirect({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  redirect(`/classes/${courseSlug}`);
}
