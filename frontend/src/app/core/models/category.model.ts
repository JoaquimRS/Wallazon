import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { Product } from "./product.model";

export interface Category {
    slug?:string;
    title:string;
    description:string;
    image:{
        prefix: IconPrefix;
        name: IconName;
    };
    subcategories:string[];
    products: Product[];
}