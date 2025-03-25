import { getApiDocs } from '@/utils/swagger'

export async function GET() {
    const spec = getApiDocs()
    return new Response(JSON.stringify(spec), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
