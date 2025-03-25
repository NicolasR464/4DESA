/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Retrieve all posts
 *     description: Fetches all posts from the database, sorted by creation date (newest first)
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: A list of posts
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
 *                         description: Type of media
 *                       url:
 *                         type: string
 *                         description: URL to the media file
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Post creation timestamp
 *       404:
 *         description: No posts found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No posts found.
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
