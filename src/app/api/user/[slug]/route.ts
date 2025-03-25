import { mongoConnect } from '@/utils/mongo'

type Params = Promise<{ slug: string }>

export const GET = async (
    request: Request,
    segmentData: { params: Params }
) => {
    const params = await segmentData.params
    const pseudo = params.slug
    console.log('GET USER ROUTE')

    console.log({ pseudo })

    const db = await mongoConnect()

    if (!db) {
        return new Response(
            JSON.stringify({ error: '❌ MongoDB not connected' }),
            {
                status: 500,
            }
        )
    }

    if (!pseudo) {
        return new Response(JSON.stringify({ error: 'No pseudo provided.' }), {
            status: 404,
        })
    }

    const userData = await db.collection('users').findOne({ pseudo })

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
