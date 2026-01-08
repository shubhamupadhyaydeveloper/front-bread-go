import React from 'react';
import { useNavigate } from 'react-router-dom';

import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { useCreatePost } from '../api/post/useCreatePost';
import { toast } from 'sonner';
import { useGetFeed } from '../api/feed/useGetFeed';


const Home: React.FC = () => {

    const navigate = useNavigate();
    const { mutateAsync } = useCreatePost()
    const { data: feedData, isLoading } = useGetFeed()



    const handleCreatePost = async (content: string, image?: File | null, tags?: string[]) => {
        try {
            await mutateAsync({
                Content: content,
                Title: "_",
                Tags: tags,
                Image: image ?? undefined
            })

            toast.success("Post created successfully")
        } catch (error) {
            toast.error("Failed to create post")
        }
    };

    const handleDeletePost = (_postId: number) => {
        // TODO: Implement delete post functionality
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-10">
                <div className="w-6 h-6 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="fade-in">

            <CreatePost onPost={handleCreatePost} />

            <div className="flex flex-col">
                {feedData && feedData.length > 0 ? (
                    feedData.map(feedItem => (
                        <Post
                            key={feedItem.post.id}
                            postInfo={feedItem}
                            onDelete={handleDeletePost}
                            onClick={() => navigate(`/post/${feedItem.post.id}`)}
                        />
                    ))
                ) : (
                    <div className="py-10 text-center text-[var(--text-secondary)]">
                        <p>No posts in your feed yet.</p>
                        <p className="mt-2 text-sm">Follow some users to see their posts here!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
