import { redirect } from "next/navigation";

export default async function MateriModuleRedirect({
  params,
}: {
  params: Promise<{ courseSlug: string; moduleId: string }>;
}) {
  const { courseSlug, moduleId } = await params;
  redirect(`/classes/${courseSlug}/modules/${moduleId}`);
}
