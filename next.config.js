/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["avatars.githubusercontent.com", "firebasestorage.googleapis.com", "m.economictimes.com", "www.flipar.com.br", 'i0.wp.com', "res.cloudinary.com"] }
}

module.exports = nextConfig
