import Link from 'next/link';
import { Term } from '@/types/content';
import { Badge } from './Badge';
import { Card, CardContent, CardHeader } from './Card';

interface TermCardProps {
  term: Term;
}

export function TermCard({ term }: TermCardProps) {
  return (
    <Link href={`/termo/${term.slug}`} className="block">
      <Card variant="default" className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {term.frontmatter.title}
              </h3>
              {term.frontmatter.subtitle && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {term.frontmatter.subtitle}
                </p>
              )}
            </div>
            {term.frontmatter.featured && (
              <Badge variant="featured" size="sm" className="ml-2 flex-shrink-0">
                ⭐ Destaque
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="difficulty" difficulty={term.frontmatter.difficulty} size="sm">
                {term.frontmatter.difficulty}
              </Badge>
              <span className="text-xs text-gray-500 flex items-center">
                📖 {term.frontmatter.estimatedReadTime}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {term.frontmatter.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="tag" size="sm">
                #{tag}
              </Badge>
            ))}
            {term.frontmatter.tags.length > 3 && (
              <Badge variant="tag" size="sm" className="bg-gray-50 text-gray-500">
                +{term.frontmatter.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Metadata adicional */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>📅 {term.frontmatter.lastReviewed}</span>
            {term.frontmatter.priority && (
              <span className="flex items-center">
                🔥 Prioridade {term.frontmatter.priority}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}