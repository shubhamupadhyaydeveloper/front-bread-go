import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { User } from '../utils/dummyData';

interface SearchUser extends User {
    id: number;
}

const SUGGESTED_USERS: SearchUser[] = [
    { id: 1, username: 'ui_wizard', name: 'UI Designer', avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=ui' },
    { id: 2, username: 'react_fan', name: 'React Developer', avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=react' },
    { id: 3, username: 'nature_lover', name: 'Alice Green', avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=nature' },
    { id: 4, username: 'bread_official', name: 'Bread App', avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=bread' },
    { id: 5, username: 'coffee_addict', name: 'Java Script', avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=coffee' },
];

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchUser[]>(SUGGESTED_USERS);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setQuery(text);
        if (!text) {
            setResults(SUGGESTED_USERS);
        } else {
            const filtered = SUGGESTED_USERS.filter(u =>
                u.username.toLowerCase().includes(text.toLowerCase()) ||
                u.name.toLowerCase().includes(text.toLowerCase())
            );
            setResults(filtered);
        }
    };

    return (
        <div className="fade-in">
            {/* Search Header */}
            <div className="sticky top-0 z-10 bg-[var(--bg-color)] border-b border-[var(--border-color)] px-5 py-4">
                <div className="relative flex items-center">
                    <SearchIcon className="absolute left-4 text-[var(--text-secondary)]" size={20} />
                    <input
                        type="text"
                        className="w-full bg-[var(--surface-color)] text-[var(--text-main)] rounded-full py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all border border-[var(--border-color)] focus:border-[var(--primary-color)]"
                        placeholder="Search"
                        value={query}
                        onChange={handleSearch}
                        autoFocus
                    />
                </div>
            </div>

            {/* Search Results */}
            <div className="px-5 py-5">
                <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                    {query ? 'Results' : 'Suggested for you'}
                </h3>

                {results.length === 0 ? (
                    <div className="text-center text-[var(--text-secondary)] py-10">
                        No users found.
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {results.map(user => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between p-4 rounded-xl hover:bg-[var(--surface-color)] transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={user.avatar}
                                        alt={user.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-[var(--text-main)] font-semibold text-base">
                                            {user.username}
                                        </span>
                                        <span className="text-[var(--text-secondary)] text-sm">
                                            {user.name}
                                        </span>
                                    </div>
                                </div>
                                <button className="px-5 py-2 bg-[var(--text-main)] text-[var(--bg-color)] rounded-full font-semibold text-sm hover:bg-[var(--text-secondary)] transition-all active:scale-95">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
