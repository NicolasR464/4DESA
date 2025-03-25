import { PostType } from '@/types/post'

export const getRandomAvatarUrl = (): string => {
    const randomSeed = Math.random().toString(36).substring(7)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`
}

export const getUserByPseudo = async (userPseudo: string) => {
    const res = await fetch(
        `${
            process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        }/api/user/${userPseudo}`
    )

    if (!res.ok) {
        return null
    }

    const userData = await res.json()

    return userData
}

export const getUserPosts = async (id: string) => {
    {
        const res = await fetch(
            `${
                process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
            }/api/profile/${id}`
        )

        if (!res.ok) {
            return []
        }

        const data = (await res.json()) as PostType[]

        return data
    }
}
