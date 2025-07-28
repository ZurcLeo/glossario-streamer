import Link from 'next/link';
import { Term } from '@/types/content';

interface RelatedTermsProps {
  relatedTermSlugs: string[];
  allTerms: Term[];
}

export function RelatedTerms({ relatedTermSlugs, allTerms }: RelatedTermsProps) {
  // Filtrar apenas os termos que realmente existem
  const validRelatedTerms = relatedTermSlugs
    .map(slug => allTerms.find(term => term.slug === slug))
    .filter((term): term is Term => term !== undefined);

  // Se não há termos relacionados válidos, não renderizar nada
  if (validRelatedTerms.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">🔗</span>
        Termos Relacionados
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {validRelatedTerms.map((term) => (
          <Link
            key={term.slug}
            href={`/termo/${term.slug}`}
            className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-purple-700 mb-1">
                  {term.frontmatter.title}
                </h4>
                {term.frontmatter.subtitle && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {term.frontmatter.subtitle}
                  </p>
                )}
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {term.frontmatter.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">
                    {term.frontmatter.estimatedReadTime}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-shrink-0">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}