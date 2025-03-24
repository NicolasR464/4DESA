import { currentUser } from '@clerk/nextjs/server'

import { mongoConnect } from '@/utils/mongo'

export const POST = async (req: Request) => {
    console.log('🔥 POST')

    const user = await currentUser()

    const db = await mongoConnect()

    if (!db) {
        return new Response(
            JSON.stringify({ error: '❌ MongoDB not connected' }),
            {
                status: 500,
            }
        )
    }

    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        })
    }
    const { id: userId } = user

    const body = await req.json()

    const { text, fileUrl } = body

    if (!text) {
        return new Response(JSON.stringify({ error: 'Missing title' }), {
            status: 400,
        })
    }
    if (!fileUrl) {
        return new Response(JSON.stringify({ error: 'Missing fileUrl' }), {
            status: 400,
        })
    }

    console.log({ text, fileUrl })

    const resPost = await db
        .collection('posts')
        .insertOne({ text, userId, fileUrl, createdAt: new Date() })

    if (!resPost.acknowledged) {
        return new Response(JSON.stringify({ error: 'Couldn‘t update.' }), {
            status: 500,
        })
    }

    return new Response(JSON.stringify(resPost), {
        status: 200,
    })
}
