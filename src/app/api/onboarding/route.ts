import { currentUser } from '@clerk/nextjs/server'

import { mongoConnect } from '@/utils/mongo'

export const POST = async (req: Request) => {
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

    const { id } = user

    const body = await req.json()
    const { pseudo } = body

    if (!pseudo) {
        return new Response(JSON.stringify({ error: 'Missing pseudo' }), {
            status: 400,
        })
    }

    // Find if user already exists
    const userExists = await db.collection('user').findOne({ id })
    if (userExists) {
        return new Response(JSON.stringify({ error: 'User already exists' }), {
            status: 400,
        })
    }

    const res = await db.collection('user').insertOne({ pseudo, id })

    if (res.acknowledged)
        return new Response(
            JSON.stringify({ message: 'Onboarding successful' }),
            {
                status: 200,
            }
        )

    return new Response(JSON.stringify({ error: 'Onboarding failed' }), {
        status: 500,
    })
}
