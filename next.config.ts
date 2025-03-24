import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    images: {
        domains: ['api.dicebear.com'],
    },
}

export default nextConfig
