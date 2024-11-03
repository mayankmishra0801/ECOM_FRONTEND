import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistCartService } from '../../services/wishlist-cart.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatButtonModule,ProductCardComponent,MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  customerService = inject(CustomerService)
  route = inject(ActivatedRoute)
  product!:Product
  mainImage!:string
  similarProducts:Product[] = []
  wishlistService = inject(WishlistCartService)
  cartService = inject(CartService)
  ngOnInit(){
    // const id = this.route.snapshot.params["id"];

    this.wishlistService.init();

    this.route.params.subscribe((x:any)=>{
      this.getProductDetail(x.id)
    })

   

  }

  getProductDetail(id:string){
    this.customerService.getProductById(id).subscribe((result:any)=>{
      this.product = result;
      this.mainImage = this.product.images[0]
      console.log(this.product);

      this.customerService.getProducts('',this.product.categoryId,'',-1,'',1,4).subscribe((result:any)=>{
        this.similarProducts = result
      })
    })
  }

  changeImage(url:string){
    this.mainImage = url 

  }

  get sellingPrice(){
     return Math.round( this.product.price - (this.product.price * (this.product.discount)/100))
  }

  addToWishList(product:Product){
    console.log(product);
    if(this.isInWishList(product._id!)){  
         this.wishlistService.removeFromWishList(product._id!).subscribe((result:any)=>{
             this.wishlistService.init();
         });
    }else{
      this.wishlistService.addInWishList(product._id!).subscribe((result:any)=>{
        this.wishlistService.init();
      })
    }
  }
 
   isInWishList(productId:string){
    console.log("hkgf",this.wishlistService?.wishlists)

      
     let isExists = this.wishlistService.wishlists?.find((x:any)=>x.productId?._id == productId);
     if(isExists) return true; else return false;
 
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
if(this.cartService.items.find(x=>x.product._id == productId)){
 return true;
}else{
 return false;
}

}

}
