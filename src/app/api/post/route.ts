import { currentUser } from '@clerk/nextjs/server'

import { mongoConnect } from '@/utils/mongo'

export const POST = async (req: Request) => {
    console.log('🔥 POST')

    const user = await currentUser()

    const db = await mongoConnect()

    const body = await req.json()

    const { text, media, author } = body

    if (!db) {
        return new Response(
            JSON.stringify({ error: '❌ MongoDB not connected' }),
            {
                status: 500,
            }
        )
    }

    console.log(author)

    if (!user || author.id !== user.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }

    if (!text) {
        return new Response(JSON.stringify({ error: 'Missing text' }), {
            status: 400,
        })
    }

    const { pseudo, avatar } = author

    const resPost = await db.collection('posts').insertOne({
        text,
        author: { pseudo, avatar },
        media,
        createdAt: new Date(),
    })

    if (!resPost.acknowledged) {
        return new Response(JSON.stringify({ error: 'Couldn‘t update.' }), {
            status: 500,
        })
    }

    return new Response(JSON.stringify(resPost), {
        status: 200,
    })
}
