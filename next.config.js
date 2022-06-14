const { isPropertyAccessChain, isPropertyAccessExpression } = require('typescript')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    API_KEY : process.env.API_KEY,
    AUTH_DOMAIN : process.env.AUTH_DOMAIN,
    DATABASE_URL : process.env.DATABASE_URL,
    PROJECT_ID : process.env.PROJECT_ID,
    STORAGE_BUCKET : process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID : process.env.MESSAGING_SENDER_ID,
    APP_ID : process.env.APP_ID,
    INFURA_ID : process.env.INFURA_ID,
    ALCHEMY_API_KEY : process.env.ALCHEMY_API_KEY,
    ETHERSCAN_API_KEY : process.env.ETHERSCAN_API_KEY
  },
}

module.exports = nextConfig
