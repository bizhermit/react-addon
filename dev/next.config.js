/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.BASE_PATH,
  env: {
    BASE_PATH: process.env.BASE_PATH,
    PORT: process.env.PORT,
    API_BASE_PATH: process.env.BASE_PATH,
  }
}

module.exports = nextConfig
