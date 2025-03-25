/**
 * @swagger
 * /api/user/{slug}:
 *   get:
 *     summary: Get user information
 *     description: Retrieves user information by their pseudo/username
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's pseudo/username
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: MongoDB document ID
 *                 id:
 *                   type: string
 *                   description: User ID from authentication system
 *                 pseudo:
 *                   type: string
 *                   description: User's display name
 *                 avatar:
 *                   type: string
 *                   description: URL to user's avatar image
 *       404:
 *         description: No pseudo provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No pseudo provided.
 *       500:
 *         description: Server error or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No user found.
 */

import { mongoConnect } from '@/utils/mongo'

type Params = Promise<{ slug: string }>

export const GET = async (
    request: Request,
    segmentData: { params: Params }
) => {
    const params = await segmentData.params
    const pseudo = params.slug

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

    return new Response(JSON.stringify(userData), {
        status: 200,
    })
}
