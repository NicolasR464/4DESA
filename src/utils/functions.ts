export const getRandomAvatarUrl = (): string => {
    const randomSeed = Math.random().toString(36).substring(7)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`
}
