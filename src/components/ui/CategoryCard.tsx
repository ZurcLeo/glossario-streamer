import Link from 'next/link';
import { Category } from '@/types/content';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const colors = {
    seguranca: 'bg-red-50 text-red-700 border-red-200',
    monetizacao: 'bg-green-50 text-green-700 border-green-200',
    conteudo: 'bg-blue-50 text-blue-700 border-blue-200',
    comunidade: 'bg-purple-50 text-purple-700 border-purple-200',
    crescimento: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    tecnico: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const colorClass = colors[category.slug as keyof typeof colors] || colors.tecnico;

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className={`block p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${colorClass}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">{category.name}</h3>
        <span className="text-sm font-medium bg-white/50 px-2 py-1 rounded-full">
          {category.termCount} termos
        </span>
      </div>
      <p className="text-sm opacity-80">{category.description}</p>
    </Link>
  );
}