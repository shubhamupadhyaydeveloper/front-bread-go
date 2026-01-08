import React, { useState, useRef, useEffect } from 'react';
import { Image, Paperclip, Hash } from 'lucide-react';
import { useUserInfo } from '../api/user/useUserInfo';
import { extractTags } from '../utils/tags';
import MirrorText from './MirrorText';

interface CreatePostProps {
    onPost: (content: string, image: File | null, tags?: string[]) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
    const { user: userInfo, isLoading } = useUserInfo()
    const user = {
        username: 'bread',
        avatar: `https://avatar.iran.liara.run/public?username=${userInfo?.username ?? "DUMMY"}`
    }
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log('userInfo in CreatePost:', userInfo)
    }, [userInfo])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && !imageFile) return;

        const tags = Array.from(
            new Set(extractTags(content))
        );

        onPost(content, imageFile, tags);
        setContent('');
        setImagePreview(null);
        setImageFile(null);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };


    if (!user) return null;
    if (isLoading) return null

    return (
        <div className="px-5 py-5 border-b border-[var(--border-color)]">
            <div className="flex gap-4">
                <img src={user.avatar} alt={user.username} className="w-11 h-11 rounded-full object-cover bg-[var(--surface-light)] flex-shrink-0" />
                <form className="flex-grow flex flex-col min-w-0" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="font-semibold text-base mb-2">{userInfo?.username}</div>
                        <MirrorText content={content} setContent={setContent} />
                        {imagePreview && (
                            <div className="relative mb-4">
                                <img src={imagePreview} alt="Preview" className="max-w-full rounded-xl max-h-[300px] object-cover border border-[var(--border-color)]" />
                                <button
                                    type="button"
                                    onClick={() => setImagePreview(null)}
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
                            {/* <button type="button" className="text-[var(--text-secondary)] p-2 rounded-full transition-all hover:bg-[var(--surface-light)] hover:text-[var(--primary-color)] active:scale-95" aria-label="Add file">
                                <Paperclip size={20} />
                            </button> */}
                        </div>

                        <button
                            type="submit"
                            style={{

                            }}
                            className="text-sm px-2 rounded-full bg-[var(--text-main)] text-[var(--bg-color)] font-semibold transition-all hover:bg-[var(--text-secondary)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--text-main)]"
                            disabled={!content.trim() && !imagePreview}
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
