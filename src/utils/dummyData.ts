export interface User {
    name: string;
    username: string;
    avatar: string;
}

export interface Post {
    id: number;
    user: User;
    content: string;
    image: string | null;
    likes: number;
    replies: number;
    timestamp: string;
    liked: boolean;
}

export const DUMMY_POSTS: Post[] = [
    {
        id: 1,
        user: {
            name: 'Jane Doe',
            username: 'janedoe',
            avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=jane',
        },
        content: 'Just baked some fresh bread! 🍞 Who wants a slice? This creates such a nice aroma in the house. #baking #fresh #sourdough',
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800',
        likes: 42,
        replies: 5,
        timestamp: '2h',
        liked: false
    },
    {
        id: 2,
        user: {
            name: 'Tech Insider',
            username: 'techinsider',
            avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=tech',
        },
        content: 'The new design system for Bread is looking incredibly crisp. Love the dark mode aesthetics. What do you think about the typography choices?',
        image: null,
        likes: 128,
        replies: 24,
        timestamp: '5h',
        liked: true
    },
    {
        id: 3,
        user: {
            name: 'Alex Smith',
            username: 'alexsmith',
            avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=alex',
        },
        content: 'Hiking trip this weekend was absolutely surreal. Nature is the best designer.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
        likes: 89,
        replies: 12,
        timestamp: '1d',
        liked: false
    }
];
