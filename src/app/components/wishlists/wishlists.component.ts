import { Component, inject } from '@angular/core';
import { WishlistCartService } from '../../services/wishlist-cart.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Wishlist } from '../../types/wishlists';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.scss'
})
export class WishlistsComponent {
  wishlistService = inject(WishlistCartService);
  // wishlist
  wishlists:Wishlist[] = []
  ngOnInit() {
     this.wishlistService.init(); 
  }

}
