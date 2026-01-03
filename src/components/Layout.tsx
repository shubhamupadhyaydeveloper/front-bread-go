import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Home, Search, Heart, User, LogOut } from 'lucide-react';
import { ROUTES } from '../App';
import { useLogout } from '../api/auth';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Determine active tab from current location
    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/' || path === '/home') return 'home';
        if (path.startsWith('/search')) return 'search';
        if (path.startsWith('/activity')) return 'activity';
        if (path.startsWith('/profile')) return 'profile';
        return '';
    };

    const activeTab = getActiveTab();
    const showNavbar = !location.pathname.startsWith('/post/');
    const { mutateAsync } = useLogout();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ paddingBottom: 10, paddingLeft: 5, paddingRight: 5, paddingTop: 5 }} className="flex flex-col min-h-screen bg-[var(--bg-color)] relative">
            {showNavbar && (
                <header className={`flex justify-between items-center px-5 h-[60px] bg-[rgba(13,13,13,0.8)] backdrop-blur-xl sticky top-0 z-50 border-b transition-colors ${scrolled ? 'border-[var(--border-color)]' : 'border-transparent'}`}>
                    <div className="font-extrabold text-2xl tracking-tight text-[var(--text-main)]">bread</div>

                    <nav className="flex gap-6 items-center">
                        <button
                            className={`transition-all flex items-center justify-center p-2 rounded-lg hover:bg-[var(--surface-light)] active:scale-95 ${activeTab === 'home' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                            onClick={() => navigate(ROUTES.HOME)}
                            aria-label="Home"
                        >
                            <Home size={26} strokeWidth={activeTab === 'home' ? 3 : 2} />
                        </button>

                        <button
                            className={`transition-all flex items-center justify-center p-2 rounded-lg hover:bg-[var(--surface-light)] active:scale-95 ${activeTab === 'search' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                            onClick={() => navigate(ROUTES.SEARCH)}
                            aria-label="Search"
                        >
                            <Search size={26} strokeWidth={activeTab === 'search' ? 3 : 2} />
                        </button>

                        <button
                            className={`transition-all flex items-center justify-center p-2 rounded-lg hover:bg-[var(--surface-light)] active:scale-95 ${activeTab === 'activity' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                            onClick={() => navigate(ROUTES.ACTIVITY)}
                            aria-label="Activity"
                        >
                            <Heart size={26} strokeWidth={activeTab === 'activity' ? 3 : 2} />
                        </button>

                        <button
                            className={`transition-all flex items-center justify-center p-2 rounded-lg hover:bg-[var(--surface-light)] active:scale-95 ${activeTab === 'profile' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                            onClick={() => navigate(ROUTES.PROFILE)}
                            aria-label="Profile"
                        >
                            <User size={26} strokeWidth={activeTab === 'profile' ? 3 : 2} />
                        </button>
                    </nav>

                    <div className="flex items-center gap-2.5 relative">
                        <button onClick={() => mutateAsync()} className="text-[var(--text-muted)] transition-all flex items-center justify-center p-2 rounded-lg hover:text-[var(--text-main)] hover:bg-[var(--surface-light)] active:scale-95" title="Log out">
                            <LogOut size={24} />
                        </button>
                    </div>
                </header>
            )}

            <main className={showNavbar ? 'flex-grow pb-20' : 'flex-grow'}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
