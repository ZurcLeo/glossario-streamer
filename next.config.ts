/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // ← ESSENCIAL para gerar ./out
  basePath: process.env.NODE_ENV === 'production' ? '/glossario-streamer' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/glossario-streamer/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig