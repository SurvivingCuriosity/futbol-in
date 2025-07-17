import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Avatares de Google (p. ej. OAuth)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',     // cualquier ruta
      },
      // Imágenes firmadas en tu bucket
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/futbolin/**', // carpeta del bucket
        // ⬆️  Al no declarar `search`, Next acepta cualquier query‑string
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'futbolin.app' }],
        permanent: true,
        destination: 'https://futbolin.app/:path*',
      },
    ]
  },
}

export default nextConfig
