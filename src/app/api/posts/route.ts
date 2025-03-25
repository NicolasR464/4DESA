import { mongoConnect } from '@/utils/mongo'

export const GET = async () => {
    const db = await mongoConnect()

    if (!db) {
        return new Response(
            JSON.stringify({ error: '❌ MongoDB not connected' }),
            {
                status: 500,
            }
        )
    }

    const posts = await db
        .collection('posts')
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

    if (!posts) {
        return new Response(JSON.stringify({ error: 'No posts found.' }), {
            status: 404,
        })
    }
    return new Response(JSON.stringify(posts), { status: 200 })
}
