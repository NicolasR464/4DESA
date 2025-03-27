import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['api.dicebear.com'],
    },
}

export default nextConfig
