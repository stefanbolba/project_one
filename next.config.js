/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    FUNCTIONS: "http://localhost:7071/api",
    APPLICATION_KEY: "9dc9bccd-a9fa-4bc7-b946-e4349bd71676",
  },
};

module.exports = nextConfig;
