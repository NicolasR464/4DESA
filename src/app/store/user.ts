import { create } from 'zustand'

export interface UserStore {
    pseudo: string
    avatar: string
    setPseudo: (pseudo: string) => void
    setAvatar: (avatar: string) => void
    getUserData: () => Promise<void>
}

export const useUserStore = create(
    (set): UserStore => ({
        pseudo: '',
        avatar: '',

        setPseudo: (pseudo: string) => set({ pseudo }),
        setAvatar: (avatar: string) => set({ avatar }),

        getUserData: async () => {
            const res = await fetch('/api/user')
            const userData = await res.json()

            console.log({ data: userData })

            if (userData.pseudo) set({ pseudo: userData.pseudo })
            if (userData.avatar) set({ avatar: userData.avatar })
        },
    })
)
