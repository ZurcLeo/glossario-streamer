import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Glossário Streamer
            </h3>
            <p className="text-gray-600 text-sm">
              Seu guia completo para o sucesso no streaming. Aprenda estratégias,
              técnicas e segredos dos streamers de sucesso.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Categorias
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/monetizacao" className="text-gray-600 hover:text-gray-900 text-sm">
                  Monetização
                </Link>
              </li>
              <li>
                <Link href="/categoria/crescimento" className="text-gray-600 hover:text-gray-900 text-sm">
                  Crescimento
                </Link>
              </li>
              <li>
                <Link href="/categoria/comunidade" className="text-gray-600 hover:text-gray-900 text-sm">
                  Comunidade
                </Link>
              </li>
              <li>
                <Link href="/categoria/seguranca" className="text-gray-600 hover:text-gray-900 text-sm">
                  Segurança
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Recursos
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/guias" className="text-gray-600 hover:text-gray-900 text-sm">
                  Guias
                </a>
              </li>
              <li>
                <a href="/busca" className="text-gray-600 hover:text-gray-900 text-sm">
                  Buscar
                </a>
              </li>
              <li>
                <a href="/contribuir" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contribuir
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © 2024 Glossário Streamer. Feito com ❤️ para a comunidade de streamers.
          </p>
        </div>
      </div>
    </footer>
  );
}