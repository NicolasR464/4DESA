import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['api.dicebear.com'],
    },

    experimental: {
        suppressHydrationWarnings: true,
    },
}

export default nextConfig
