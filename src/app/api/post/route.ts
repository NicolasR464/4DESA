/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post with text content and optional media
 *     tags:
 *       - Posts
 *     security:
 *       - clerkAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - author
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the post
 *               author:
 *                 type: object
 *                 required:
 *                   - id
 *                   - pseudo
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: User ID from Clerk
 *                   pseudo:
 *                     type: string
 *                     description: User's display name
 *                   avatar:
 *                     type: string
 *                     description: URL to user's avatar image
 *               media:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [image, video]
 *                     description: Type of media
 *                   url:
 *                     type: string
 *                     description: URL to the media file
 *     responses:
 *       200:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   example: true
 *                 insertedId:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c85"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing text
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
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

import { currentUser } from '@clerk/nextjs/server'

import { mongoConnect } from '@/utils/mongo'

export const POST = async (req: Request) => {
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
