import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTerms, getAllCategories } from '@/lib/content';
import { RelatedTerms } from '@/components/content/RelatedTerms';

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
  // Precisamos encontrar o termo em todas as categorias
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
  // Buscar o termo em todas as categorias
  const { slug } = await params;
  const allTerms = await getAllTerms();
  const term = allTerms.find(t => t.slug === slug);
  
  if (!term) {
    notFound();
  }

  // Buscar informações da categoria
  const categories = await getAllCategories();
  const category = categories.find(c => c.slug === term.frontmatter.category);

  const difficultyColors = {
    iniciante: 'bg-green-100 text-green-800',
    intermediario: 'bg-yellow-100 text-yellow-800',
    avancado: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">
          Início
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link 
              href={`/categoria/${category.slug}`}
              className="hover:text-purple-600"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900">{term.frontmatter.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[term.frontmatter.difficulty]}`}>
            {term.frontmatter.difficulty}
          </span>
          <span className="text-sm text-gray-500">
            {term.frontmatter.estimatedReadTime}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {term.frontmatter.title}
        </h1>
        
        {term.frontmatter.subtitle && (
          <p className="text-xl text-gray-600 mb-4">
            {term.frontmatter.subtitle}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {term.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content - USANDO htmlContent PROCESSADO */}
      <article 
        className="prose prose-lg max-w-none prose-purple prose-headings:text-gray-900 prose-a:text-purple-600 hover:prose-a:text-purple-800"
        dangerouslySetInnerHTML={{ __html: term.htmlContent }}
      />

      {/* Related Terms */}
      <RelatedTerms 
        relatedTermSlugs={term.frontmatter.relatedTerms} 
        allTerms={allTerms}
      />

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Última revisão: {term.frontmatter.lastReviewed}
        </p>
      </footer>
    </div>
  );
}