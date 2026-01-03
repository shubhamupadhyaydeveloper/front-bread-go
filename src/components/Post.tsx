import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Repeat, Send, MoreHorizontal, Trash2, Share2 } from 'lucide-react';
import { Post as PostType } from '../utils/dummyData';

interface PostProps {
    post: PostType;
    onDelete?: (id: number) => void;
    onClick?: (post: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post, onDelete, onClick }) => {
    const [liked, setLiked] = useState(post.liked);
    const [likesCount, setLikesCount] = useState(post.likes);
    const [showMenu, setShowMenu] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (liked) {
            setLikesCount(prev => prev - 1);
        } else {
            setLikesCount(prev => prev + 1);
        }
        setLiked(!liked);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            onDelete?.(post.id);
        }
        setShowMenu(false);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(`Check out this post by @${post.user.username}`);
        alert('Link copied to clipboard!');
        setShowMenu(false);
    };

    const handleComment = () => {
        if (commentText.trim()) {
            alert('Comment posted!');
            setCommentText('');
            setShowComments(false);
        }
    };

    const isOwner = true
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFollowing(!isFollowing);
    };

    return (
        <article
            style={{
                padding: '10px',
                gap: 10
            }}
            className="border-b border-[var(--border-color)] flex cursor-pointer transition-colors hover:bg-[var(--surface-color)]/30 fade-in"
            onClick={() => onClick && onClick(post)}
        >
            <div className="flex-shrink-0 flex flex-col items-center">
                <img src={post.user.avatar} alt={post.user.username} className="w-11 h-11 rounded-full object-cover bg-[var(--surface-light)]" />
            </div>

            <div className="flex-grow min-w-0">
                <div style={{ marginBottom: 5 }} className="flex justify-between items-start ">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-semibold text-base text-[var(--text-main)]">{post.user.username}</span>
                        {!isOwner && (
                            <button
                                onClick={handleFollow}
                                style={{
                                    padding: '5px 10px',
                                    gap: 5
                                }}
                                className={`border rounded-lg  text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${isFollowing
                                    ? 'border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'
                                    : 'border-[var(--text-main)] bg-[var(--text-main)] text-[var(--bg-color)] hover:bg-[var(--text-secondary)]'
                                    }`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2 text-[var(--text-secondary)] text-sm items-center">
                        <span>{post.timestamp}</span>
                        <div className="relative" ref={menuRef} onClick={(e) => e.stopPropagation()}>
                            <button
                                className="text-[var(--text-secondary)] p-1.5 rounded-full transition-all hover:bg-[var(--surface-light)] hover:text-[var(--text-main)]"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                <MoreHorizontal size={18} />
                            </button>
                            {showMenu && (
                                <div className="absolute top-full right-0 mt-1 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl shadow-lg p-1.5 min-w-[160px] z-10 animate-fadeIn">
                                    <button className="flex items-center gap-2.5 w-full py-2.5 px-3 text-left text-sm text-[var(--text-main)] rounded-lg hover:bg-[var(--surface-light)] transition-colors" onClick={handleShare}>
                                        <Share2 size={16} /> Share
                                    </button>
                                    {isOwner && (
                                        <button className="flex items-center gap-2.5 w-full py-2.5 px-3 text-left text-sm text-[var(--accent-red)] rounded-lg hover:bg-[rgba(239,68,68,0.1)] transition-colors" onClick={handleDelete}>
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-[0.95rem] leading-relaxed text-[var(--text-main)] whitespace-pre-wrap mb-3">{post.content}</div>

                {post.image && (
                    <img src={post.image} style={{ marginBottom: 10, marginTop: 10 }} alt="Post content" className="w-full rounded-xl mt-2  border border-[var(--border-color)] max-h-[400px] object-cover" loading="lazy" />
                )}

                <div className="flex gap-6 mt-3">
                    <button
                        className={`flex items-center gap-2 transition-all p-2 rounded-full -ml-2 hover:bg-white/5 active:scale-90 ${liked ? 'text-[var(--accent-red)]' : 'text-[var(--text-secondary)] hover:text-[var(--accent-red)]'
                            }`}
                        onClick={handleLike}
                        aria-label="Like"
                    >
                        <Heart size={20} strokeWidth={liked ? 0 : 2} className={liked ? 'fill-[var(--accent-red)] animate-heartPop' : ''} />
                        {likesCount > 0 && <span className="text-sm font-medium">{likesCount}</span>}
                    </button>

                    <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-all p-2 rounded-full -ml-2 hover:bg-white/5 active:scale-90" onClick={(e) => { e.stopPropagation(); setShowComments(!showComments); }} aria-label="Reply">
                        <MessageCircle size={20} />
                        {post.replies > 0 && <span className="text-sm font-medium">{post.replies}</span>}
                    </button>

                    <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-green)] transition-all p-2 rounded-full -ml-2 hover:bg-white/5 active:scale-90" onClick={(e) => { e.stopPropagation(); }} aria-label="Repost">
                        <Repeat size={20} />
                    </button>

                    <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-all p-2 rounded-full -ml-2 hover:bg-white/5 active:scale-90" onClick={(e) => { e.stopPropagation(); }} aria-label="Share">
                        <Send size={20} />
                    </button>
                </div>

                {showComments && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)] animate-slideUp" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                className="flex-grow bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl py-2.5 px-4 text-[var(--text-main)] text-sm focus:border-[var(--primary-color)] outline-none placeholder:text-[var(--text-secondary)]"
                                placeholder="Reply to this thread..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button
                                className="text-[var(--primary-color)] font-semibold text-sm px-4 py-2 rounded-xl hover:bg-[var(--primary-color)]/10 transition-colors disabled:opacity-50 disabled:cursor-default"
                                disabled={!commentText.trim()}
                                onClick={handleComment}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};

export default Post;
