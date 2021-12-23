module.exports = {
  
  distDir: 'build',
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      }
    ]
  },
  env: {
    USER_API: process.env.USER_API
  }
}
