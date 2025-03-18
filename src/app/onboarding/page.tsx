'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useRouter } from 'next/navigation'

import { useState } from 'react'

const Onboarding = () => {
    const [pseudo, setPseudo] = useState('')
    const router = useRouter()

    const send = () => {
        console.log(pseudo)

        fetch('/api/onboarding', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pseudo }),
        })

        router.push('/')
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-3xl justify-center items-center border-2 p-4 rounded-2xl">
                <Label htmlFor="pseudo">Ton pseudo</Label>
                <Input
                    onChange={(e) => setPseudo(e.target.value)}
                    id="pseudo"
                    placeholder="Ton speudo"
                    className="m-2 max-w-100"
                    name="pseudo"
                />

                <Button onClick={send} className="m-2">
                    ENREGISTER
                </Button>
            </div>
        </div>
    )
}

export default Onboarding
