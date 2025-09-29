import { notFound } from 'next/navigation';
import { getAllTerms, getAllCategories } from '@/lib/content';
import { TermLayout } from '@/components/layout/TermLayout';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const terms = await getAllTerms();
  return terms.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const allTerms = await getAllTerms();
  const term = allTerms.find(t => t.slug === slug);

  if (!term) {
    return {
      title: 'Termo não encontrado',
      description: 'O termo solicitado não foi encontrado.',
    };
  }

  return {
    title: `${term.frontmatter.title} | Glossário Streamer`,
    description: term.frontmatter.subtitle || `Aprenda sobre ${term.frontmatter.title}`,
    keywords: term.frontmatter.keywords.join(', '),
  };
}

export default async function TermPage({ params }: Props) {
  const { slug } = await params;
  const allTerms = await getAllTerms();
  const term = allTerms.find(t => t.slug === slug);

  if (!term) {
    notFound();
  }

  const categories = await getAllCategories();
  const category = categories.find(c => c.slug === term.frontmatter.category);

  return (
    <TermLayout term={term} category={category} allTerms={allTerms}>
      <div dangerouslySetInnerHTML={{ __html: term.htmlContent }} />
    </TermLayout>
  );
}