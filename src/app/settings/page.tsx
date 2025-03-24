'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getRandomAvatarUrl } from '@/utils/functions'

import { toast } from 'sonner'

import { RefreshCw } from 'lucide-react'
import Image from 'next/image'

import { UserStore, useUserStore } from '@/app/store/user'

const Settings = () => {
    const { pseudo, avatar, setPseudo, setAvatar } = useUserStore() as UserStore

    const send = async () => {
        const res = await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pseudo, avatar }),
        })

        console.log(res.status)

        if (res.status !== 200) {
            toast('❌ Error')
            return
        }

        toast('✅ Updated')
    }

    return (
        <div className="flex justify-center m-4">
            <div className="flex flex-col w-3xl justify-center items-center border-2 p-4 rounded-2xl">
                <h2 className="text-2xl mb-14">Update your profile info</h2>
                <div className="flex mb-4 items-center">
                    {avatar && (
                        <Image
                            src={avatar}
                            alt="@shadcn"
                            width={80}
                            height={80}
                            className="rounded-full"
                            unoptimized
                        />
                    )}

                    <Button
                        className="cursor-pointer"
                        onClick={() => {
                            setAvatar(getRandomAvatarUrl())
                        }}
                    >
                        <RefreshCw /> Change your avatar
                    </Button>
                </div>

                <Input
                    required
                    onChange={(e) => setPseudo(e.target.value)}
                    id="pseudo"
                    placeholder="Update your speudo"
                    className="m-2 max-w-100"
                    name="pseudo"
                    value={pseudo}
                />

                <Button onClick={send} className="m-2 cursor-pointer">
                    UPDATE
                </Button>
            </div>
        </div>
    )
}

export default Settings
