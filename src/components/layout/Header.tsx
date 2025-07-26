import Link from 'next/link';
import { SearchBox } from '@/components/ui/SearchBox';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-purple-600">
                Glossário Streamer
              </h1>
            </Link>
          </div>
          
          <div className="flex-1 max-w-lg mx-8">
            <SearchBox />
          </div>
          
          <nav className="flex space-x-8">
            <Link
              href="/categorias"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Categorias
            </Link>
            <Link
              href="/busca"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Buscar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}