import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  http = inject(HttpClient)

  constructor() { }

  getNewProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"/customer/new-products")
  }

  getFeaturedProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"/customer/featured-products")
  }
}
