import { X } from 'lucide-react';
import React, { useState } from 'react'
import Input from '../../components/Input';
import { userInfo, userInfoRequest } from '../../types/user';
import Button from '../../components/Button';

interface ProfileModal {
    userInfo: userInfo;
    loading: boolean;
    message: string;
    setIsEditModalOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
    setMessage: (message: string) => void;
}

const ProfileModal: React.FC<ProfileModal> = ({ userInfo, loading, message, setIsEditModalOpen, setLoading, setMessage }) => {
    const [editForm, setEditForm] = useState({
        username: '',
        bio: ''
    });
    const handleEditProfile = () => {
        setEditForm({
            username: userInfo?.username || '',
            bio: userInfo?.bio || ''
        });
        setIsEditModalOpen(true);
    };
    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // TODO: Implement API call to update profile
        setTimeout(() => {
            setLoading(false);
            setIsEditModalOpen(false);
            setMessage('Profile updated successfully');
            setTimeout(() => setMessage(''), 3000);
        }, 1000);
    };
    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" onClick={() => setIsEditModalOpen(false)}>
            <div className="bg-[var(--surface-color)] rounded-2xl p-6 w-full max-w-md border border-[var(--border-color)] fade-in" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Edit Profile</h2>
                    <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--surface-light)] transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm text-[var(--text-secondary)] mb-2 block">Username</label>
                        <Input
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={editForm.username}
                            onChange={handleEditFormChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[var(--text-secondary)] mb-2 block">Bio</label>
                        <textarea
                            name="bio"
                            placeholder="Tell us about yourself..."
                            value={editForm.bio}
                            onChange={handleEditFormChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-[var(--text-main)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--text-main)] transition-colors resize-none"
                        />
                    </div>

                    {message && (
                        <div className="text-[var(--accent-green)] text-sm text-center">
                            {message}
                        </div>
                    )}

                    <div className="flex gap-3 mt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setIsEditModalOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={loading}
                            className="flex-1"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileModal;