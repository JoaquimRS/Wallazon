import { User } from "./user.model";

export interface Product {
    slug:string;
    title:string;
    category:string;
    price:number;
    condition:string;
    description:string;
    images:string[];
    location:{
        lat:string;
        long:string;
        city:string;
    };
    likes:number;
    userLike:boolean;
    owner: User;

}