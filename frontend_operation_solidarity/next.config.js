/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'he'],
    defaultLocale: 'he',
    localeDetection: false,
  },

  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
