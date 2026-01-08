export type FeedResponse = {
    post: {
        id: number,
        content: string,
        title: string,
        user_id: number,
        tags: string[],
        created_at: string,
        updated_at: string,
        image_url: string,
        comments: string,
        user: {
            id: number,
            username: string,
            email: string,
            bio: string,
            created_at: string
        }
    },
    comments_count: number,
    is_following : boolean
}