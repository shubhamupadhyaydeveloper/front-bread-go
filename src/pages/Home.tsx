import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { DUMMY_POSTS, Post as PostType } from '../utils/dummyData';

// Function to generate more dummy posts
const generateMorePosts = (startId: number, count: number): PostType[] => {
    const templates = [
        {
            content: 'Just discovered this amazing new coffee shop downtown! ☕ The atmosphere is perfect for working.',
            image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
        },
        {
            content: 'Working on a new project and loving every minute of it. The creative process is so rewarding!',
            image: null,
        },
        {
            content: 'Sunset views from my balcony never get old 🌅',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
        },
        {
            content: 'Finally finished reading that book everyone recommended. Totally worth it! 📚',
            image: null,
        },
        {
            content: 'Homemade pizza night! 🍕 Nothing beats fresh ingredients and good company.',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
        },
        {
            content: 'Morning runs are the best way to start the day. Feeling energized! 🏃‍♂️',
            image: null,
        },
    ];

    const users = [
        { name: 'Sarah Johnson', username: 'sarahj', avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=sarah' },
        { name: 'Mike Chen', username: 'mikechen', avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=mike' },
        { name: 'Emma Wilson', username: 'emmaw', avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=emma' },
        { name: 'David Lee', username: 'davidlee', avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=david' },
    ];

    return Array.from({ length: count }, (_, i) => {
        const template = templates[(startId + i) % templates.length];
        const user = users[(startId + i) % users.length];
        return {
            id: startId + i,
            user,
            content: template.content,
            image: template.image,
            likes: Math.floor(Math.random() * 200),
            replies: Math.floor(Math.random() * 50),
            timestamp: `${Math.floor(Math.random() * 24)}h`,
            liked: Math.random() > 0.5,
        };
    });
};

const Home: React.FC = () => {
 
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Initial load
    useEffect(() => {
        if (posts.length === 0) {
            setTimeout(() => {
                setPosts(DUMMY_POSTS);
                setLoading(false);
                setPage(1);
            }, 500);
        } else {
            setLoading(false);
        }
    }, []);

    // Load more posts
    const loadMorePosts = useCallback(() => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        setTimeout(() => {
            const newPosts = generateMorePosts(1000 + page * 10, 10);
            setPosts(prev => [...prev, ...newPosts]);
            setPage(prev => prev + 1);
            setLoadingMore(false);

            // Stop loading after 5 pages (50 posts + initial 3)
            if (page >= 5) {
                setHasMore(false);
            }
        }, 800);
    }, [loadingMore, hasMore, page]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    loadMorePosts();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [loadMorePosts, loading]);

    const handleCreatePost = (content: string, image?: string | null) => {

        const newPost: PostType = {
            id: Date.now(),
            user: {
                name: "",
                username: "",
                avatar: "",
            },
            content,
            image: image || null,
            likes: 0,
            replies: 0,
            timestamp: 'Now',
            liked: false
        };

        setPosts([newPost, ...posts]);
    };

    const handleDeletePost = (postId: number) => {
        setPosts(posts.filter(p => p.id !== postId));
    };

    if (loading) {
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
                {posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        onDelete={handleDeletePost}
                        onClick={() => navigate(`/post/${post.id}`)}
                    />
                ))}
            </div>

            {/* Intersection observer target */}
            <div ref={observerTarget} className="py-4">
                {loadingMore && (
                    <div className="flex justify-center p-6">
                        <div className="w-6 h-6 border-2 border-[var(--text-secondary)] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* End message */}
            {!hasMore && (
                <div className="py-10 px-5 text-center text-[var(--text-secondary)] text-sm">
                    <p>You've reached the end</p>
                    <div className="mt-2 text-xl">🍞</div>
                </div>
            )}
        </div>
    );
};

export default Home;
