import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Input from '../components/Input';
import Post from '../components/Post';
import { Lock, LogOut, Settings } from 'lucide-react';
import { DUMMY_POSTS } from '../utils/dummyData';
import { userInfo } from '../types/user';
import { useUserInfo } from '../api/user/useUserInfo';

const Profile: React.FC = () => {
    // const [stateUserInfo,setStateUserInfo] = useState<userInfo| null>(null)
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'threads' | 'replies' | 'reposts'>('threads');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [expandedSettings, setExpandedSettings] = useState(false);
    const {data : userInfo} = useUserInfo()

    const stats = {
        followers: 1254,
        following: 348
    };

    const userPosts = DUMMY_POSTS;

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setMessage('Password updated successfully');
            setTimeout(() => setMessage(''), 3000);
            setPassword('');
            setNewPassword('');
        }, 1000);
    };

    if (!userInfo) return null;

    return (
        <div className="fade-in">
            {/* Profile Header */}
            <div className="flex justify-between items-start px-5 py-5 border-b border-[var(--border-color)]">
                <div className="flex-1">
                    {/* <div className="text-xl font-bold text-[var(--text-main)]">{user.name}</div> */}
                    <div className="text-[var(--text-secondary)] text-base">@{userInfo.data.username}</div>

                    <div className="mt-4 text-[var(--text-main)] text-base leading-relaxed">
                        Bread enthusiast. Baking cleaner code, one loaf at a time. 🍞
                    </div>

                    <div className="mt-4 flex gap-5 text-sm">
                        <span className="text-[var(--text-secondary)]">
                            <span className="text-[var(--text-main)] font-semibold">{stats.followers.toLocaleString()}</span> followers
                        </span>
                        <span className="text-[var(--text-secondary)]">
                            <span className="text-[var(--text-main)] font-semibold">{stats.following.toLocaleString()}</span> following
                        </span>
                    </div>
                </div>
                {/* <img src={user.avatar} alt={user.username} className="w-20 h-20 rounded-full object-cover" /> */}
            </div>

            {/* Profile Actions */}
            <div className="flex gap-3 px-5 py-4 border-b border-[var(--border-color)]">
                <button className="flex-1 py-2.5 px-5 bg-[var(--surface-color)] text-[var(--text-main)] rounded-xl font-semibold hover:bg-[var(--surface-light)] transition-all active:scale-95">
                    Edit Profile
                </button>
                <button className="flex-1 py-2.5 px-5 bg-[var(--surface-color)] text-[var(--text-main)] rounded-xl font-semibold hover:bg-[var(--surface-light)] transition-all active:scale-95">
                    Share Profile
                </button>
                <button
                    className="w-11 h-11 flex items-center justify-center bg-[var(--surface-color)] text-[var(--text-main)] rounded-xl hover:bg-[var(--surface-light)] transition-all active:scale-95"
                    onClick={() => setExpandedSettings(!expandedSettings)}
                >
                    <Settings size={20} />
                </button>
            </div>

            {/* Settings Section */}
            {expandedSettings && (
                <div className="px-5 py-5 border-b border-[var(--border-color)] fade-in">
                    <div className="bg-[var(--surface-color)] rounded-2xl p-5 border border-[var(--border-color)] mb-4">
                        <h3 className="mb-5 text-base flex items-center gap-2">
                            <Lock size={16} /> Update Password
                        </h3>

                        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                            <Input
                                type="password"
                                placeholder="Current Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <Button type="submit" loading={loading} disabled={!password || !newPassword}>
                                Update
                            </Button>

                            {message && (
                                <div className="text-[var(--accent-green)] text-sm text-center">
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => {}}
                        className="w-full text-[var(--accent-red)] border-[var(--accent-red)]/20"
                    >
                        <LogOut size={18} className="mr-2" /> Log out
                    </Button>
                </div>
            )}

            {/* Profile Tabs */}
            <div className="flex border-b border-[var(--border-color)]">
                {(['threads', 'replies', 'reposts'] as const).map((tab) => (
                    <div
                        key={tab}
                        className={`flex-1 py-4 text-center font-semibold cursor-pointer transition-colors ${activeTab === tab
                            ? 'text-[var(--text-main)] border-b-2 border-[var(--text-main)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </div>
                ))}
            </div>

            {/* Profile Content */}
            <div>
                {activeTab === 'threads' && (
                    <div className="flex flex-col">
                        {/* {userPosts.map(post => (
                            <Post
                                key={post.id}
                                post={{ ...post, user: stateUserInfo }}
                                onClick={() => navigate(`/post/${post.id}`)}
                            />
                        ))} */}
                    </div>
                )}
                {activeTab === 'replies' && (
                    <div className="py-10 text-center text-[var(--text-secondary)]">
                        No replies yet.
                    </div>
                )}
                {activeTab === 'reposts' && (
                    <div className="py-10 text-center text-[var(--text-secondary)]">
                        No reposts yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
