/**
 * @swagger
 * /api/profile/{slug}:
 *   get:
 *     summary: Get user profile posts
 *     description: Retrieves all posts created by a specific user identified by their pseudo
 *     tags:
 *       - Profiles
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's pseudo/username
 *     responses:
 *       200:
 *         description: List of posts by the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The post ID
 *                   text:
 *                     type: string
 *                     description: The content of the post
 *                   author:
 *                     type: object
 *                     properties:
 *                       pseudo:
 *                         type: string
 *                         description: User's display name
 *                       avatar:
 *                         type: string
 *                         description: URL to user's avatar image
 *                   media:
 *                     type: object
 *                     nullable: true
 *                     properties:
 *                       type:
 *                         type: string
 *                         enum: [image, video]
 *                       url:
 *                         type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No user ID provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No id provided.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: MongoDB not connected
 */
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
