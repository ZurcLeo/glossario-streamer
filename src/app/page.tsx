import { getAllCategories, getAllTerms } from '@/lib/content';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { TermCard } from '@/components/ui/TermCard';

export default async function Home() {
  const categories = getAllCategories();
  const allTerms = await getAllTerms();
  const featuredTerms = allTerms.filter(term => term.frontmatter.featured).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Glossário
          <span className="text-purple-600"> Streamer</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Seu guia completo para o sucesso no streaming. Aprenda estratégias, técnicas e segredos dos streamers de sucesso.
        </p>
      </div>

      {/* Categories Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Terms */}
      {featuredTerms.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Termos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTerms.map((term) => (
              <TermCard key={term.slug} term={term} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
