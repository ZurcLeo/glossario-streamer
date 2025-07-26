// src/lib/imageLoader.js
export default function imageLoader({ src, width, quality }) {
    const basePath = process.env.NODE_ENV === 'production' ? '/glossario-streamer' : '';
    return `${basePath}${src}?w=${width}&q=${quality || 75}`;
  }