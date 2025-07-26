export interface TermFrontmatter {
  title: string;
  subtitle?: string;
  category: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  tags: string[];
  keywords: string[];
  searchTerms: string[];
  priority: number;
  featured?: boolean;
  lastReviewed: string;
  estimatedReadTime: string;
  relatedTerms: string[];
}

export interface Term {
  slug: string;
  frontmatter: TermFrontmatter;
  content: string;
  htmlContent: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  termCount: number;
}

export interface SearchResult {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  excerpt: string;
  relevanceScore: number;
}