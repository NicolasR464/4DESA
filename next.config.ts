import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    distDir: 'build',
    output: 'standalone',
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    },
}

export default nextConfig
