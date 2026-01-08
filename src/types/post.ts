import { userInfo } from "./user"

export type PostResponse = {
    comments : any[],
    content : string,
    created_at : string,
    id : number,
    tags : string[],
    title : string,
    updated_at : string,
    user_id : number,
    image_url? : string
    user : userInfo
}
