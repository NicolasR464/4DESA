import { createSwaggerSpec } from 'next-swagger-doc'

export const getApiDocs = () => {
    const spec = createSwaggerSpec({
        apiFolder: 'src/app/api', // Path to API routes
        definition: {
            openapi: '3.0.0',
            info: {
                title: '4DESA Social API Documentation',
                version: '1.0.0',
                description: 'Documentation for the 4DESA Social App API',
                contact: {
                    name: 'API Support',
                    email: 'support@example.com',
                },
            },
            servers: [
                {
                    url:
                        process.env.NEXT_PUBLIC_APP_URL ||
                        'http://localhost:3000',
                    description: 'Development server',
                },
            ],
        },
    })
    return spec
}
