import { Category } from "./category.interface";


export interface Menu{

    id?: number;

    name?: string;

    category?: Category;

    submenuList?: Array<Menu>;

}