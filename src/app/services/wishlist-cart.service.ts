import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Wishlist } from '../types/wishlists';

@Injectable({
  providedIn: 'root'
})
export class WishlistCartService {

  constructor() { }


  http = inject(HttpClient)
  wishlists:Wishlist[] = []

  init(){
    return this.getWishLishts().subscribe(result=>{
       this.wishlists = result
    })
  }
  
getWishLishts(){

  return this.http.get<Wishlist[]>(environment.apiUrl+"/customer/wishlists")
}

addInWishList(productId:string){  
  return this.http.post(environment.apiUrl+"/customer/wishlists/" + productId,{})
}
removeFromWishList(productId:string){
  return this.http.delete(environment.apiUrl+"/customer/wishlists/"+productId)
}
}