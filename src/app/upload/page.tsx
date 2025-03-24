'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { blobContainerNames } from '@/utils/variables'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const UploadPage = () => {
    const [text, setText] = useState('')

    const handleUpload = async (file: File) => {
        console.log(file.name)

        const fileType = file.type
        const isImage = fileType.startsWith('image/')
        const isVideo = fileType.startsWith('video/')

        console.log(fileType)

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

        if (upload.ok) {
            console.log('✅ File Upload successful!')

            // API call to save the post
            const postRes = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    fileUrl: upload.url.split('?')[0],
                }),
            })

            if (postRes.ok) toast('✅ Posted!')
        } else {
            console.error('❌ Upload failed')
            toast('❌ Upload failed')
        }
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

            <Button className="m-2 max-w-sm">Submit</Button>
        </div>
    )
}

export default UploadPage
