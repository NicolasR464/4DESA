/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get current user information
 *     description: Retrieves information about the currently authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - clerkAuth: []
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
 *                   description: User ID from Clerk
 *                 pseudo:
 *                   type: string
 *                   description: User's display name
 *                 avatar:
 *                   type: string
 *                   description: URL to user's avatar image
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
 *         description: Server error or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No user found.
 *   put:
 *     summary: Update user information
 *     description: Updates the profile information of the currently authenticated user
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
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: User's new display name
 *               avatar:
 *                 type: string
 *                 description: URL to user's new avatar image
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   example: true
 *                 modifiedCount:
 *                   type: number
 *                   example: 1
 *                 upsertedId:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 upsertedCount:
 *                   type: number
 *                   example: 0
 *                 matchedCount:
 *                   type: number
 *                   example: 1
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
 *         description: Server error or update failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Couldn't update.
 */

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

    const userData = await db.collection('users').findOne({ id })

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

    if (!updatedUserData.acknowledged) {
        return new Response(JSON.stringify({ error: 'Couldn‘t update.' }), {
            status: 500,
        })
    }

    return new Response(JSON.stringify(updatedUserData), {
        status: 200,
    })
}
