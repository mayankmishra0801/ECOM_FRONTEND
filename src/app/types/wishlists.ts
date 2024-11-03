import { Product } from "./product";

export interface Wishlist{
    _id?:string,
    productId:Product,
    userId:string
    
}