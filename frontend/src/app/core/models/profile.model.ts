import { Product } from "./product.model";
export interface Profile{
    username: string,
    email?: string,
    bio: string,
    avatar: string,
    products: Product[],
    likes: Product[],
    followers: number,
    following: Profile[],
    userFollow?: boolean
}