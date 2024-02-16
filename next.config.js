/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.coingecko.com'],
  },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  } ),
   webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.node = {
  //       net: 'empty',
  //     };
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
