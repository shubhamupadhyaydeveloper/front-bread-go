
export interface userInfo {
    email: string;
    username: string;
    bio : string;
    id: number;
    created_at: string;
}

export interface userInfoRequest {
    data : {
        user : userInfo,
        followers : number,
        following : number,
    }
}

