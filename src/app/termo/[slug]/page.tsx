import { getAllTerms } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface TermPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const terms = await getAllTerms();
  return terms.map((term) => ({
    slug: term.slug,
  }));
}

export default async function TermPage({ params }: TermPageProps) {
  const { slug } = await params;
  
  // Find the term across all categories
  const allTerms = await getAllTerms();
  const term = allTerms.find(t => t.slug === slug);

  if (!term) {
    notFound();
  }

  const difficultyColors = {
    iniciante: 'bg-green-100 text-green-800',
    intermediario: 'bg-yellow-100 text-yellow-800',
    avancado: 'bg-red-100 text-red-800',
  };

  const difficultyColor = difficultyColors[term.frontmatter.difficulty];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-700">
              Início
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link 
              href={`/categoria/${term.frontmatter.category}`}
              className="hover:text-gray-700 capitalize"
            >
              {term.frontmatter.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">
            {term.frontmatter.title}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {term.frontmatter.title}
            </h1>
            {term.frontmatter.subtitle && (
              <p className="text-xl text-gray-600 mb-4">
                {term.frontmatter.subtitle}
              </p>
            )}
          </div>
          {term.frontmatter.featured && (
            <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              ⭐ Destaque
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${difficultyColor}`}>
            {term.frontmatter.difficulty}
          </span>
          <span className="text-sm text-gray-500">
            {term.frontmatter.estimatedReadTime}
          </span>
          <span className="text-sm text-gray-500">
            Última revisão: {new Date(term.frontmatter.lastReviewed).toLocaleDateString('pt-BR')}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {term.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: term.htmlContent }} />
      </article>

      {/* Related Terms */}
      {term.frontmatter.relatedTerms.length > 0 && (
        <section className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Termos Relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {term.frontmatter.relatedTerms.map((relatedSlug) => {
              const relatedTerm = allTerms.find(t => t.slug === relatedSlug);
              if (!relatedTerm) return null;
              
              return (
                <Link
                  key={relatedSlug}
                  href={`/termo/${relatedSlug}`}
                  className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {relatedTerm.frontmatter.title}
                  </h3>
                  {relatedTerm.frontmatter.subtitle && (
                    <p className="text-sm text-gray-600">
                      {relatedTerm.frontmatter.subtitle}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}