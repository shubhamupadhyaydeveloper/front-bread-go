import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Repeat, Share2, MoreHorizontal } from 'lucide-react';
import { useGetPostById } from '../api/post/useGetPostById';

interface User {
    name: string;
    username: string;
    avatar: string;
}


interface Comment {
    id: number;
    user: User;
    content: string;
    time: string;
    likes: number;
}

const PostDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: postDetails } = useGetPostById(id || '');
    const [comments] = useState<Comment[]>([
        {
            id: 101,
            user: {
                name: 'Sarah Wilson',
                username: 'sarahw',
                avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=sarah'
            },
            content: 'This is exactly what I was thinking! Great point.',
            time: '1h',
            likes: 5
        },
        {
            id: 102,
            user: {
                name: 'Mike Johnson',
                username: 'mike_j',
                avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=mike'
            },
            content: 'Can you elaborate more on the second paragraph? I find that really interesting.',
            time: '2h',
            likes: 2
        },
        {
            id: 103,
            user: {
                name: 'Emily Davis',
                username: 'emilyd',
                avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=emily'
            },
            content: 'Totally agree! 💯',
            time: '30m',
            likes: 1
        }
    ]);

    if (!postDetails) {
        return (
            <div className="w-full max-w-[600px] mx-auto pb-20 min-h-screen bg-[var(--bg-color)] border-x border-[var(--border-color)]">
                <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-[var(--border-color)] px-4 h-[60px] flex items-center gap-5">
                    <button
                        className="bg-transparent border-none text-[var(--text-main)] cursor-pointer p-2 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold m-0">Thread</h1>
                </header>
                <div className="p-5 text-center">Post not found</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[600px] mx-auto pb-20 min-h-screen animate-[fadeIn_0.3s_ease] bg-[var(--bg-color)] border-x border-[var(--border-color)]">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-[var(--border-color)] px-4 h-[60px] flex items-center gap-5">
                <button
                    className="bg-transparent border-none text-[var(--text-main)] cursor-pointer p-2 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold m-0">Thread</h1>
            </header>


            <main>
                {/* Main Post */}
                <article className="border-b border-[var(--border-color)] p-4">
                    {/* Post Header */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <img
                                src={`https://avatar.iran.liara.run/public?username=${postDetails?.data?.user?.username}`}
                                alt={postDetails?.data?.user?.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex flex-col">
                                <span className="text-[var(--text-main)] font-semibold text-base">
                                    {postDetails?.data?.user?.username}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                            <span className="text-sm">{postDetails?.data?.created_at}</span>
                            <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="mt-3 text-[var(--text-main)] text-lg leading-relaxed">
                        {postDetails?.data?.content}
                    </div>

                    {/* Post Image */}
                    {postDetails?.data?.image_url && (
                        <img
                            src={postDetails?.data?.image_url}
                            alt="Post content"
                            className="mt-3 w-full rounded-2xl object-cover max-h-[500px]"
                        />
                    )}

                    {/* Post Stats */}
                    {/* <div className="py-4 border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm">
                        <span>{post.likes} likes</span> • <span>{post.replies} replies</span>
                    </div> */}

                    {/* Post Actions */}
                    <div className="flex justify-between items-center py-3">
                        <button className="flex items-center justify-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-red)] transition-colors p-2 rounded-full hover:bg-white/5">
                            <Heart size={24} />
                        </button>
                        <button className="flex items-center justify-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors p-2 rounded-full hover:bg-white/5">
                            <MessageCircle size={24} />
                        </button>
                        <button className="flex items-center justify-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-green)] transition-colors p-2 rounded-full hover:bg-white/5">
                            <Repeat size={24} />
                        </button>
                        <button className="flex items-center justify-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors p-2 rounded-full hover:bg-white/5">
                            <Share2 size={24} />
                        </button>
                    </div>
                </article>

                {/* Replies Section */}
                <div className="px-4 py-3 font-semibold border-b border-[var(--border-color)] text-[var(--text-secondary)]">
                    Replies
                </div>

                {/* Comments List */}
                <div className="flex flex-col">
                    {comments.map(comment => (
                        <div
                            key={comment.id}
                            className="p-4 border-b border-[var(--border-color)] flex gap-3"
                        >
                            <img
                                src={comment.user.avatar}
                                alt={comment.user.username}
                                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="font-semibold text-[var(--text-main)]">
                                        {comment.user.username}
                                    </span>
                                    <span className="text-[var(--text-secondary)] text-sm">
                                        {comment.time}
                                    </span>
                                </div>
                                <div className="text-[var(--text-main)] text-[0.95rem] leading-snug">
                                    {comment.content}
                                </div>
                                <div className="mt-2 flex gap-4">
                                    <button className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors text-sm">
                                        <Heart size={16} /> {comment.likes}
                                    </button>
                                    <button className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors text-sm">
                                        <MessageCircle size={16} /> Reply
                                    </button>
                                    <button className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors text-sm">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PostDetails;
