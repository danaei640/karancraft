import { COMPONENTS_METADATA } from '@/lib/components-meta';
import { getComponentStorySources } from '@/lib/story-source';
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
  const storySources = getComponentStorySources(slug);
  return <ComponentWorkbench slug={slug} storySources={storySources} />;
}
