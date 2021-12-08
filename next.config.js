module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/mainlayout',
        permanent: true,
      }
    ]
  },
  env: {
    USER_API: process.env.USER_API
  }
}
