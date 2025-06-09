/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
    dangerouslyAllowSVG: true,
  },
  // Sadece gerekli yapılandırmaları tut
  swcMinify: true,
  poweredByHeader: false,
  // Geliştirme sırasında daha iyi hata ayıklama için
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
