/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  basePath: '/glossario-streamer',
  assetPrefix: '/glossario-streamer/',
  images: {
    unoptimized: true,
  },
}

export default nextConfig