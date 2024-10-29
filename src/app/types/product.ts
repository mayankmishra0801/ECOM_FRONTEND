export interface Product{
    _id?:string;
    name:string;
    shortDescription:string;
    description:string;
    price:number;
    discount:number;
    images:string[];
    categoryId:string;
    isFeatured:boolean;
    isNew:boolean;
}