import { COMPONENTS_METADATA } from '@/lib/components-meta';
import { ComponentWorkbench } from '@/components/preview/component-workbench';

export function generateStaticParams() {
  return Object.keys(COMPONENTS_METADATA).map((slug) => ({
    slug,
  }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ComponentWorkbench slug={slug} />;
}
