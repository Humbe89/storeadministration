import { Category } from "./category.interface";


export interface Submenu{

    id?: number;

    name: string;

    category: Category;

    menu?: Submenu;
    
}