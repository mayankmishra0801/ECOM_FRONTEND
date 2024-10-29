import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  http = inject(HttpClient)

  getAllProducts(){
     return this.http.get<Product[]>(environment.apiUrl+"/products");
  }
  getProductbyId(id:string){
    return this.http.get<Product[]>(environment.apiUrl+"/products/"+id);
 }

 addProduct(model:Product){
  return this.http.post(environment.apiUrl+"/products",model)
 }

 updateProduct(id:string,model:Product){
  return this.http.put(environment.apiUrl+"/products/"+id,model)
 }
 deleteProduct(id:string){
  return this.http.delete(environment.apiUrl+"/products/"+id)
 }
}
