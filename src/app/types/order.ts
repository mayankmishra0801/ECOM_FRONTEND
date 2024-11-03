import { CartItem } from "./cartItem"

export interface Order{

    _id?:string;
    items: CartItem[],
    paymentType: string,
    address : any,
    date:  Date,
    // totalAmount : number;
    status?: string

}