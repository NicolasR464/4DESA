import { mongoConnect } from '@/utils/mongo'
import { currentUser } from '@clerk/nextjs/server'

export const GET = async () => {
    const db = await mongoConnect()
    const user = await currentUser()

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

    const userData = await db.collection('users').findOne({ id })

    if (!userData) {
        return new Response(JSON.stringify({ error: 'No user found.' }), {
            status: 500,
        })
    }

    console.log({ userData })

    return new Response(JSON.stringify(userData), {
        status: 200,
    })
}

export const PUT = async (req: Request) => {
    const db = await mongoConnect()
    const user = await currentUser()
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

    const { pseudo, avatar } = await req.json()

    console.log('🔥 PSEUDO   -- ', pseudo)

    const userData = await db.collection('users').findOne({ id })

    console.log({ userData })

    if (!userData) {
        return new Response(JSON.stringify({ error: 'No user found.' }), {
            status: 500,
        })
    }

    const updatedUserData = await db.collection('users').updateOne(
        { id },
        {
            $set: {
                pseudo,
                avatar,
            },
        }
    )

    console.log({ updatedUserData })

    if (!updatedUserData.acknowledged) {
        return new Response(JSON.stringify({ error: 'Couldn‘t update.' }), {
            status: 500,
        })
    }

    return new Response(JSON.stringify(updatedUserData), {
        status: 200,
    })
}
