import Post from '@/components/Post'

import { getUserByPseudo, getUserPosts } from '@/utils/functions'
import Image from 'next/image'

const Profile = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug: pseudo } = await params

    const posts = await getUserPosts(pseudo)
    const userData = await getUserByPseudo(pseudo)

    return (
        <div>
            {/* Profile Banner */}
            <div className="relative w-full bg-gradient-to-r from-blue-500 to-purple-600 h-48 rounded-b-lg overflow-hidden">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0yNCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6Ii8+PC9nPjwvc3ZnPg==')]"></div>
                </div>

                {/* User info container */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end p-6">
                    <div className="relative">
                        {/* Avatar */}
                        <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                            {userData?.avatar ? (
                                <Image
                                    src={userData.avatar}
                                    alt={userData.pseudo || 'User'}
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                                    {userData?.pseudo
                                        ?.charAt(0)
                                        ?.toUpperCase() || '?'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User name */}
                    <div className="ml-4 mb-2">
                        <h1 className="text-2xl font-bold text-white drop-shadow-md">
                            {userData?.pseudo || 'Anonymous User'}
                        </h1>
                        <p className="text-white/80 text-sm">
                            @
                            {userData?.pseudo
                                ?.toLowerCase()
                                .replace(/\s+/g, '') || 'user'}
                        </p>
                    </div>
                </div>
            </div>
            {/* POSTS */}
            {posts.map((post, index) => (
                <Post key={post.id + index} post={post} />
            ))}

            {posts.length === 0 && (
                <h2 className="text-2xl text-center m-4">
                    {userData.pseudo} didn‘t post anything yet.
                </h2>
            )}
        </div>
    )
}

export default Profile
