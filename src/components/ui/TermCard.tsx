import Link from 'next/link';
import { Term } from '@/types/content';

interface TermCardProps {
  term: Term;
}

export function TermCard({ term }: TermCardProps) {
  const difficultyColors = {
    iniciante: 'bg-green-100 text-green-800',
    intermediario: 'bg-yellow-100 text-yellow-800',
    avancado: 'bg-red-100 text-red-800',
  };

  const difficultyColor = difficultyColors[term.frontmatter.difficulty];

  return (
    <Link
      href={`/termo/${term.slug}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {term.frontmatter.title}
          </h3>
          {term.frontmatter.subtitle && (
            <p className="text-sm text-gray-600 mb-2">
              {term.frontmatter.subtitle}
            </p>
          )}
        </div>
        {term.frontmatter.featured && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            ⭐ Destaque
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
            {term.frontmatter.difficulty}
          </span>
          <span className="text-xs text-gray-500">
            {term.frontmatter.estimatedReadTime}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {term.frontmatter.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
          {term.frontmatter.tags.length > 2 && (
            <span className="text-xs text-gray-500">
              +{term.frontmatter.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}