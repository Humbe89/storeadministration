import { Category } from "./category.interface";


export interface Product{

    id?: number;
    
    name: string;

    description: string;

    price: number;

    amount: number;

    discount: number;

    minStock: number;

    active: boolean;

    productstatus: string;

    category: Category;

    photo?: string;
}