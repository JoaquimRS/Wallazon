import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export interface Category {
    slug?:string;
    title:string;
    description:string;
    image:{
        prefix: IconPrefix;
        name: IconName;
    };
    subcategories:string[];
}