import { Pipe, PipeTransform } from '@angular/core';
import { Wishlist } from '../types/wishlists';
import { Product } from '../types/product';

@Pipe({
  name: 'checkwishlist',
  standalone: true
})
export class CheckwishlistPipe implements PipeTransform {
  
  transform(wishlists:Wishlist [], productId: any): unknown {
   
      let isExists = wishlists?.find((x:any)=>x?.productId?._id == productId);
      if(isExists) return true; else return false;
    }
  }


