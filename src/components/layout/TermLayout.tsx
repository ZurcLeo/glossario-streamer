'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { RelatedTerms } from '@/components/content/RelatedTerms';
import { Term, Category } from '@/types/content';

interface TermLayoutProps {
  term: Term;
  category?: Category;
  allTerms: Term[];
  children: React.ReactNode;
}

export function TermLayout({ term, category, allTerms, children }: TermLayoutProps) {
  const readingProgress = term.frontmatter.estimatedReadTime ?
    parseInt(term.frontmatter.estimatedReadTime.replace(/\D/g, '')) : 0;

  useEffect(() => {
    // Table of contents generator
    function generateTableOfContents() {
      const headings = document.querySelectorAll('article h2, article h3');
      const tocDesktop = document.getElementById('table-of-contents');
      const tocMobile = document.getElementById('table-of-contents-mobile');

      if (headings.length === 0) return;

      const createTocList = () => {
        const tocList = document.createElement('ul');
        tocList.className = 'space-y-2 text-sm';

        headings.forEach((heading, index) => {
          const id = heading.id || 'section-' + index;
          if (!heading.id) heading.id = id;

          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = '#' + id;
          a.textContent = heading.textContent;
          a.className = 'text-gray-600 hover:text-purple-600 transition-colors block py-1';

          if (heading.tagName === 'H3') {
            a.className += ' pl-4';
          }

          li.appendChild(a);
          tocList.appendChild(li);
        });

        return tocList;
      };

      // Aplicar ao desktop
      if (tocDesktop) {
        tocDesktop.innerHTML = '';
        tocDesktop.appendChild(createTocList());
      }

      // Aplicar ao mobile
      if (tocMobile) {
        tocMobile.innerHTML = '';
        tocMobile.appendChild(createTocList());
      }
    }

    // Reading progress - algoritmo melhorado
    function updateReadingProgress() {
      const article = document.querySelector('article');
      const progressBarDesktop = document.getElementById('reading-progress');
      const progressBarMobile = document.getElementById('reading-progress-mobile');

      if (!article) return;

      // Calcular posição do scroll relativa ao artigo
      const articleRect = article.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Início da leitura: quando o topo do artigo atinge o fundo da tela
      // Fim da leitura: quando o fundo do artigo sai do topo da tela
      const startReading = -articleRect.height;
      const endReading = viewportHeight;
      const totalReadingDistance = endReading - startReading;

      // Posição atual de leitura
      const currentPosition = -articleRect.top;

      // Calcular progresso (0-100%)
      const progress = Math.min(100, Math.max(0,
        ((currentPosition - startReading) / totalReadingDistance) * 100
      ));

      const progressPercentage = Math.round(progress) + '%';

      // Função para atualizar barra de progresso
      const updateProgressBar = (progressBar: HTMLElement | null) => {
        if (progressBar) {
          progressBar.style.width = progressPercentage;
          const progressText = progressBar.nextElementSibling as HTMLElement;
          if (progressText) {
            progressText.textContent = progressPercentage;
          }
        }
      };

      // Atualizar ambas as barras
      updateProgressBar(progressBarDesktop);
      updateProgressBar(progressBarMobile);
    }

    generateTableOfContents();
    updateReadingProgress();

    const handleScroll = () => updateReadingProgress();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-purple-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Início
            </Link>
            <span>/</span>
            {category && (
              <>
                <Link
                  href={`/categoria/${category.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-white font-medium">{term.frontmatter.title}</span>
          </nav>

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge
              variant="difficulty"
              difficulty={term.frontmatter.difficulty}
              className="bg-white/20 text-white border border-white/30"
            >
              {term.frontmatter.difficulty}
            </Badge>

            {term.frontmatter.featured && (
              <Badge className="bg-yellow-400 text-yellow-900 border border-yellow-500">
                ⭐ Destaque
              </Badge>
            )}

            <span className="text-purple-200 text-sm flex items-center">
              📖 {term.frontmatter.estimatedReadTime}
            </span>

            <span className="text-purple-200 text-sm flex items-center">
              📅 Atualizado em {term.frontmatter.lastReviewed}
            </span>
          </div>

          {/* Título e subtítulo */}
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {term.frontmatter.title}
            </h1>

            {term.frontmatter.subtitle && (
              <p className="text-xl lg:text-2xl text-purple-100 leading-relaxed">
                {term.frontmatter.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Container principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile: Sidebar no topo */}
        <div className="lg:hidden mb-8 space-y-4">
          {/* Progress indicator - Mobile */}
          <Card variant="outlined">
            <CardHeader>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Progresso de Leitura
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: '0%' }}
                    id="reading-progress-mobile"
                  />
                </div>
                <span className="text-sm text-gray-500">0%</span>
              </div>
            </CardContent>
          </Card>

          {/* Navegação rápida - Mobile */}
          <Card variant="outlined">
            <CardHeader>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Navegação Rápida
              </h3>
            </CardHeader>
            <CardContent>
              <nav id="table-of-contents-mobile">
                <p className="text-sm text-gray-500">Carregando índice...</p>
              </nav>
            </CardContent>
          </Card>

          {/* Tags - Mobile */}
          <Card variant="outlined">
            <CardHeader>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Tags
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {term.frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant="tag" size="sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Desktop apenas */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Progress indicator */}
              <Card variant="outlined">
                <CardHeader>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Progresso de Leitura
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: '0%' }}
                        id="reading-progress"
                      />
                    </div>
                    <span className="text-sm text-gray-500">0%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card variant="outlined">
                <CardHeader>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Tags
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {term.frontmatter.tags.map((tag) => (
                      <Badge key={tag} variant="tag" size="sm">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Navegação rápida (será populada via JS) */}
              <Card variant="outlined">
                <CardHeader>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Navegação Rápida
                  </h3>
                </CardHeader>
                <CardContent>
                  <nav id="table-of-contents">
                    <p className="text-sm text-gray-500">Carregando índice...</p>
                  </nav>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Conteúdo principal */}
          <main className="lg:col-span-3">
            <Card variant="elevated" padding="lg" className="mb-8">
              <article className="prose prose-lg max-w-none prose-purple prose-headings:text-gray-900 prose-a:text-purple-600 hover:prose-a:text-purple-800 prose-strong:text-gray-900 prose-code:text-purple-700 prose-code:bg-purple-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                {children}
              </article>
            </Card>

            {/* Terms relacionados */}
            <RelatedTerms
              relatedTermSlugs={term.frontmatter.relatedTerms}
              allTerms={allTerms}
            />

            {/* Footer do termo */}
            <Card variant="filled" className="mt-8">
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Última revisão: {term.frontmatter.lastReviewed}
                    </p>
                    <p className="text-sm text-gray-500">
                      Categoria: {category?.name || 'Não categorizado'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="text-sm text-purple-600 hover:text-purple-800 transition-colors">
                      📤 Compartilhar
                    </button>
                    <button className="text-sm text-purple-600 hover:text-purple-800 transition-colors">
                      📝 Sugerir edição
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}