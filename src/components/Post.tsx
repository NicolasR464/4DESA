import type { PostType } from '@/types/post'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Post = ({ post }: { post: PostType }) => {
    console.log(post)

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden my-4 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                {/* User info */}
                <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                        <Avatar>
                            <AvatarImage src={post.author.avatar} alt="IM" />
                            <AvatarFallback>🐒</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {post.author.pseudo || 'Anonymous'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {post.createdAt
                                ? formatDistanceToNow(
                                      new Date(post.createdAt)
                                  ) + ' ago'
                                : 'Just now'}
                        </p>
                    </div>
                </div>

                {/* Post content */}
                {post.text && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                        {post.text}
                    </p>
                )}

                {/* Media content */}
                {post.media && (
                    <div className="mt-2 rounded-lg overflow-hidden">
                        {/* If content is image */}
                        {post.media.type === 'image' && (
                            <Image
                                src={post.media.url}
                                alt="Post image"
                                width={500}
                                height={300}
                                className="w-full h-auto object-cover rounded-lg"
                                unoptimized
                            />
                        )}

                        {/* If content is video */}
                        {post.media.type === 'video' && (
                            <video
                                src={post.media.url}
                                controls
                                className="w-full rounded-lg"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Post
