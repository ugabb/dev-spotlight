/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["avatars.githubusercontent.com","firebasestorage.googleapis.com"]
  }
}

module.exports = nextConfig
