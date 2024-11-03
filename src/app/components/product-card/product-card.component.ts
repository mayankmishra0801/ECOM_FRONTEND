import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistCartService } from '../../services/wishlist-cart.service';
import { CartService } from '../../services/cart.service';
import { Wishlist } from '../../types/wishlists';
import { CheckwishlistPipe } from '../../pipes/checkwishlist.pipe';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule,RouterLink,MatIconModule,CheckwishlistPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

   wishlistService = inject(WishlistCartService)
   cartService = inject(CartService)
  @Input() item!:Product
  // @Input() product!:Product[]
  // @Input() item!:Product

  ngOninit(){
    console.log("kjhgk",this.item)
    // this.wishlistService.init()
  }

  get sellingPrice(){
    return Math.round( this.item.price - (this.item.price * (this.item.discount)/100))
 }

 addToWishList(item:Product){
   console.log(item);
   if(this.isInWishList(item)){  
        this.wishlistService.removeFromWishList(item._id!).subscribe((result:any)=>{
            this.wishlistService.init();
        });
   }else{
     this.wishlistService.addInWishList(item._id!).subscribe((result:any)=>{
       this.wishlistService.init();
     })
   }
 }

  isInWishList(product:Product){
    console.log("ghjgjgjjgjg",this.wishlistService.wishlists,product)
    if(this.wishlistService.wishlists.length){
      let isExists = this.wishlistService.wishlists?.find((x:any)=>x?.productId?._id == product?._id);
      if(isExists) return true; else return false;
    }else{
      return false;
    }
     
   

 }


 addToCart(product:Product){
       if(!this.isProductInCart(product._id!)){
          this.cartService.addToCart(product._id!,1).subscribe(()=>{
            this.cartService.init()
          })
       }else{
        this.cartService.removeFromCart(product._id!).subscribe(()=>{
          this.cartService.init()
        })
       }
 }

 isProductInCart(productId:string){
   if(this.cartService.items.find(x=>x.product?._id == productId)){
    return true;
   }else{
    return false;
   }
   
 }


}
