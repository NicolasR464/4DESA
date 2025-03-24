import { create } from 'zustand'

export const useUserStore = create((set) => ({
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
}))
