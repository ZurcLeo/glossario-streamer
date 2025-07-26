import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { Term, TermFrontmatter, Category } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'content');
const termsDirectory = path.join(contentDirectory, 'terms');

export async function getAllTerms(): Promise<Term[]> {
  const terms: Term[] = [];
  
  // Get all category directories
  const categories = fs.readdirSync(termsDirectory);
  
  for (const category of categories) {
    const categoryPath = path.join(termsDirectory, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const slug = file.replace(/\.md$/, '');
          const term = await getTermBySlug(category, slug);
          if (term) {
            terms.push(term);
          }
        }
      }
    }
  }
  
  return terms.sort((a, b) => b.frontmatter.priority - a.frontmatter.priority);
}

export async function getTermBySlug(category: string, slug: string): Promise<Term | null> {
  try {
    const filePath = path.join(termsDirectory, category, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Process markdown to HTML
    const processedContent = await remark().use(remarkGfm).use(html).process(content);
    const htmlContent = processedContent.toString();
    
    return {
      slug,
      frontmatter: data as TermFrontmatter,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error loading term ${category}/${slug}:`, error);
    return null;
  }
}

export async function getTermsByCategory(category: string): Promise<Term[]> {
  const categoryPath = path.join(termsDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  
  const files = fs.readdirSync(categoryPath);
  const terms: Term[] = [];
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const slug = file.replace(/\.md$/, '');
      const term = await getTermBySlug(category, slug);
      if (term) {
        terms.push(term);
      }
    }
  }
  
  return terms.sort((a, b) => b.frontmatter.priority - a.frontmatter.priority);
}

export function getAllCategories(): Category[] {
  const categories = fs.readdirSync(termsDirectory);
  
  return categories
    .filter(category => {
      const categoryPath = path.join(termsDirectory, category);
      return fs.statSync(categoryPath).isDirectory();
    })
    .map(category => {
      const categoryPath = path.join(termsDirectory, category);
      const files = fs.readdirSync(categoryPath);
      const termCount = files.filter(file => file.endsWith('.md')).length;
      
      return {
        slug: category,
        name: getCategoryDisplayName(category),
        description: getCategoryDescription(category),
        termCount,
      };
    });
}

function getCategoryDisplayName(slug: string): string {
  const displayNames: Record<string, string> = {
    seguranca: 'Segurança',
    monetizacao: 'Monetização',
    conteudo: 'Conteúdo',
    comunidade: 'Comunidade',
    crescimento: 'Crescimento',
    tecnico: 'Técnico',
  };
  
  return displayNames[slug] || slug;
}

function getCategoryDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    seguranca: 'Diretrizes e práticas para manter um ambiente seguro',
    monetizacao: 'Estratégias para maximizar receita e presentes',
    conteudo: 'Técnicas para criar conteúdo envolvente',
    comunidade: 'Gestão e moderação da comunidade',
    crescimento: 'Táticas para aumentar seguidores e engajamento',
    tecnico: 'Configurações técnicas e otimizações',
  };
  
  return descriptions[slug] || '';
}