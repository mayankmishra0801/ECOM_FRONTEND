import { Component, inject, Input } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent,MatSelectModule,FormsModule,MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  customerService = inject(CustomerService)
  searchTerm:string = "";
  categoryId:string = "";
  sortBy:string = "";
  page=1;
  pageSize=2;
  sortOrder:number = -1;
  brandId:string = "";
  product:Product[] = []
  route = inject(ActivatedRoute)
  category:Category[] = [];
  brands:Brand[] = [];
  isNext=true;

  ngOnInit(){

    this.customerService.getCategories().subscribe((result:any)=>{
      this.category = result
    })

    this.customerService.getBrands().subscribe((result:any)=>{    
       
      this.brands = result

    })
  
    this.route.queryParams.subscribe((x:any) => {
      console.log(x)
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryId || '';
      // this.sortBy = x.sortBy;
      // this.sortOrder = x.sortOrder;
      // this.brandId = x.brandId;
      // this.page = x.page;
      // this.pageSize = x.pageSize;
      this.getProducts();
    });
      
  }

   getProducts(){

    setTimeout(()=>{

      this.customerService.getProducts(this.searchTerm,this.categoryId,this.sortBy,this.sortOrder,this.brandId,this.page,this.pageSize).subscribe((result:any)=>{
        this.product = result;
        if(result.length < this.pageSize){
          this.isNext = false 
          
        }
          });},500)
      
    }

    orderChange(event:any){
      this.sortBy='price';
      this.sortOrder = event;
      this.getProducts()

    }

    pageChange(page:number){
      this.page = page;
      this.isNext = true
      this.getProducts()

    }
   
    

}
