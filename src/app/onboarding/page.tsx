'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getRandomAvatarUrl } from '@/utils/functions'

import { RefreshCw } from 'lucide-react'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

const Onboarding = () => {
    const [pseudo, setPseudo] = useState('')
    const [avatar, setAvatar] = useState('')
    const router = useRouter()

    useEffect(() => {
        setAvatar(getRandomAvatarUrl())
    }, [])

    const send = () => {
        console.log(pseudo)

        fetch('/api/onboarding', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pseudo, avatar }),
        })

        router.push('/')
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-3xl justify-center items-center border-2 p-4 rounded-2xl">
                <h2 className="text-2xl mb-14">Set up your profile info</h2>
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
                        <RefreshCw /> Choose your avatar
                    </Button>
                </div>

                <Input
                    onChange={(e) => setPseudo(e.target.value)}
                    id="pseudo"
                    placeholder="Write your speudo"
                    className="m-2 max-w-100"
                    name="pseudo"
                />

                <Button onClick={send} className="m-2 cursor-pointer">
                    SAVE
                </Button>
            </div>
        </div>
    )
}

export default Onboarding
