import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Магазин дитячої книги Мишка',
    short_name: 'Мишка',
    start_url: '/',
    description: 'Магазин дитячої книги Мишка',
    background_color: '#fde68a',
    theme_color: '#fde68a',
    display: 'standalone',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64 512x512 144x144 192x192 256x256 384x384 512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo.webp',
        sizes: '64x64 512x512 144x144 192x192 256x256 384x384 512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
