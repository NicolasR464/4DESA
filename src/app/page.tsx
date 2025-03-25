import Post from '@/components/Post'
import { PostType } from '@/types/post'

async function getPosts() {
    const res = await fetch(
        `${
            process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        }/api/posts`
    )

    if (!res.ok) {
        throw new Error('Failed to fetch posts')
    }

    return res.json()
}

const Home = async () => {
    const posts = await getPosts()

    return (
        <div>
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold mb-6">Recent Posts</h1>
                {posts && posts.length > 0 ? (
                    posts.map((post: PostType) => (
                        <Post key={post.id} post={post} />
                    ))
                ) : (
                    <p className="text-gray-500">No posts found</p>
                )}
            </div>
        </div>
    )
}

export default Home
