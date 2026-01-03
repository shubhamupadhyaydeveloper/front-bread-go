import React, { useState, useRef } from 'react';
import { Image, Paperclip, Hash } from 'lucide-react';

interface CreatePostProps {
    onPost: (content: string, image: string | null) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
    // const { user } = useAuth();
    const user = {
        username: 'bread',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
    const [content, setContent] = useState('');
    const [attachedImage, setAttachedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && !attachedImage) return;

        onPost(content, attachedImage);
        setContent('');
        setAttachedImage(null);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAttachedImage(imageUrl);
        }
    };

    if (!user) return null;

    return (
        <div className="px-5 py-5 border-b border-[var(--border-color)]">
            <div className="flex gap-4">
                <img src={user.avatar} alt={user.username} className="w-11 h-11 rounded-full object-cover bg-[var(--surface-light)] flex-shrink-0" />
                <form className="flex-grow flex flex-col min-w-0" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="font-semibold text-base mb-2">{user.username}</div>
                        <textarea
                            className="w-full min-h-[60px] text-base text-[var(--text-main)] mb-4 resize-none font-inherit bg-transparent border-none outline-none placeholder:text-[var(--text-secondary)]"
                            placeholder="Start a thread..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={2}
                            style={{ height: 'auto', minHeight: '60px' }}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = Math.max(60, target.scrollHeight) + 'px';
                            }}
                        />
                        {attachedImage && (
                            <div className="relative mb-4">
                                <img src={attachedImage} alt="Preview" className="max-w-full rounded-xl max-h-[300px] object-cover border border-[var(--border-color)]" />
                                <button
                                    type="button"
                                    onClick={() => setAttachedImage(null)}
                                    className="absolute top-3 right-3 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center border-none cursor-pointer hover:bg-black/90 transition-colors text-xl font-bold"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                            <button type="button" className="text-[var(--text-secondary)] p-2 rounded-full transition-all hover:bg-[var(--surface-light)] hover:text-[var(--primary-color)] active:scale-95" aria-label="Add image" onClick={handleImageClick}>
                                <Image size={20} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <button type="button" className="text-[var(--text-secondary)] p-2 rounded-full transition-all hover:bg-[var(--surface-light)] hover:text-[var(--primary-color)] active:scale-95" aria-label="Add file">
                                <Paperclip size={20} />
                            </button>
                            <button type="button" className="text-[var(--text-secondary)] p-2 rounded-full transition-all hover:bg-[var(--surface-light)] hover:text-[var(--primary-color)] active:scale-95" aria-label="Add tag">
                                <Hash size={20} />
                            </button>
                        </div>

                        <button
                            type="submit"
                            style={{

                            }}
                            className="text-sm px-2 rounded-full bg-[var(--text-main)] text-[var(--bg-color)] font-semibold transition-all hover:bg-[var(--text-secondary)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--text-main)]"
                            disabled={!content.trim() && !attachedImage}
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
