import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, ProductCardComponent,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
   
    nav: true
  }
  customerService = inject(CustomerService)
   newProducts: Product[] = [];
   featuredProducts: Product[] = []; 
   bannerImages:Product[] = [];
   
   ngOnInit(){
    this.customerService.getFeaturedProducts().subscribe((result:any)=>{
      this.featuredProducts = result;
      console.log(this.featuredProducts)
      this.bannerImages.push(...result)
    });

    this.customerService.getNewProducts().subscribe((result:any)=>{
      this.newProducts = result;
      console.log(this.newProducts)
      this.bannerImages.push(...result)

    })
   }

}
