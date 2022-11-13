import { Product } from "./product.model";
import { Profile } from "./profile.model";
import { User } from "./user.model";

export interface Comment {
    body: string;
    product: Product;
    user: Profile | User;
}