/**
 * @swagger
 * /api/onboarding:
 *   post:
 *     summary: User onboarding process
 *     description: Creates a new user profile with pseudo and avatar after authentication
 *     tags:
 *       - Users
 *     security:
 *       - clerkAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pseudo
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: User's display name
 *               avatar:
 *                 type: string
 *                 description: URL to user's avatar image
 *     responses:
 *       200:
 *         description: Onboarding successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Onboarding successful
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing pseudo
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
 *                   example: Onboarding failed
 */

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
    const { pseudo, avatar } = body

    if (!pseudo) {
        return new Response(JSON.stringify({ error: 'Missing pseudo' }), {
            status: 400,
        })
    }

    // Find if user already exists
    const userExists = await db.collection('users').findOne({ id })
    if (userExists) {
        return new Response(JSON.stringify({ error: 'User already exists' }), {
            status: 400,
        })
    }

    const res = await db.collection('users').insertOne({ pseudo, id, avatar })

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
