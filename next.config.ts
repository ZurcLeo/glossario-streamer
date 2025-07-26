/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para GitHub Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  
  // Base path para GitHub Pages (nome do repositório)
  basePath: process.env.NODE_ENV === 'production' ? '/glossario-streamer' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/glossario-streamer/' : '',
  
  // Configurações de imagem para export estático
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js'
  },
  
  // Configurações adicionais
  reactStrictMode: true,
  swcMinify: true,
  
  // Webpack config para Markdown
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
}

module.exports = nextConfig
