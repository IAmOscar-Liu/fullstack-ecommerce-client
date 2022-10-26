module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // apiUrl: "http://172.18.0.1:4000",
    apiUrl: "http://ecommerce-server:4000/api",
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};
