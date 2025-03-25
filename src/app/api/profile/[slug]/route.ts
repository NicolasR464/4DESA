import { mongoConnect } from '@/utils/mongo'

type Params = Promise<{ slug: string }>

export const GET = async (
    request: Request,
    segmentData: { params: Params }
) => {
    const params = await segmentData.params
    const pseudo = params.slug

    console.log('GET PROFILE ROUTE')
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
        return new Response(JSON.stringify({ error: 'No id provided.' }), {
            status: 404,
        })
    }

    console.log({ pseudo })

    const posts = await db
        .collection('posts')
        .find({ 'author.pseudo': pseudo })
        .toArray()

    return new Response(JSON.stringify(posts), { status: 200 })
}
