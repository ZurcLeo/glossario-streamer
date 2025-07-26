import { getTermsByCategory, getAllCategories } from '@/lib/content';
import { TermCard } from '@/components/ui/TermCard';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const terms = await getTermsByCategory(slug);
  const categories = getAllCategories();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {category.description}
        </p>
        <div className="text-sm text-gray-500">
          {terms.length} {terms.length === 1 ? 'termo' : 'termos'} encontrados
        </div>
      </div>

      {terms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terms.map((term) => (
            <TermCard key={term.slug} term={term} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum termo encontrado nesta categoria ainda.
          </p>
        </div>
      )}
    </div>
  );
}