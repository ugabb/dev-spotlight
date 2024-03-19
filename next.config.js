/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { domains: ["avatars.githubusercontent.com","www.notion.so", "firebasestorage.googleapis.com", "m.economictimes.com", "www.flipar.com.br", 'i0.wp.com', "res.cloudinary.com"] }
}

module.exports = nextConfig
