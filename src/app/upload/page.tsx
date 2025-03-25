'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { blobContainerNames } from '@/utils/variables'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import type { MediaType } from '@/types/post'
import { UserStore, useUserStore } from '../store/user'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const UploadPage = () => {
    const router = useRouter()

    const [text, setText] = useState('')
    const [file, setFile] = useState<MediaType>()
    const { pseudo, avatar } = useUserStore() as UserStore

    const { userId, isSignedIn } = useAuth()

    if (!isSignedIn) router.push('/')

    const handleUpload = async (file: File) => {
        console.log('🚀 ~ file: page.tsx:83 ~ handleUpload ~ file:')

        console.log(file.name)

        const fileType = file.type
        const isImage = fileType.startsWith('image/')
        const isVideo = fileType.startsWith('video/')

        console.log(fileType)

        console.log(isImage)
        console.log(isVideo)

        if (!isImage && !isVideo) {
            toast('❌ Invalid file type. Only images and videos are allowed.')
            return
        }

        const res = await fetch(
            `/api/upload?containerName=${
                isImage ? blobContainerNames.images : blobContainerNames.videos
            }&fileName=${encodeURIComponent(file.name)}`
        )

        if (!res.ok) {
            console.error('❌ Failed to get upload URL')
            toast('❌ Failed to upload the file.')
            return
        }
        const { url } = await res.json()

        const upload = await fetch(url, {
            method: 'PUT',
            headers: {
                'x-ms-blob-type': 'BlockBlob',
            },
            body: file,
        })

        console.log(upload)

        setFile({
            url: upload.url.split('?')[0],
            type: isImage ? 'image' : 'video',
        })
    }

    const handleSubmit = async () => {
        // API call to save the post
        const postRes = await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                author: {
                    id: userId,
                    pseudo,
                    avatar,
                },
                ...(file && { media: file }),
            }),
        })

        if (postRes.ok) toast('✅ Posted!')
        if (!postRes.ok) toast('❌ An error occured!')
    }

    return (
        <div className="flex justify-center items-center flex-col m-8 border-2 p-10 rounded-lg">
            <h1 className="text-center text-xl m-2">Post your stuff</h1>

            <Textarea
                className="m-2"
                placeholder="Say something"
                name="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
            />

            <Input
                className="m-2"
                type="file"
                onChange={(e) =>
                    e.target.files && handleUpload(e.target.files[0])
                }
            />

            <Button className="m-2 max-w-sm" onClick={() => handleSubmit()}>
                Submit
            </Button>
        </div>
    )
}

export default UploadPage
