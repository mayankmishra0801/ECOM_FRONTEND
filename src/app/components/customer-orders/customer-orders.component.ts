import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../types/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent {
   orders:Order[] = [];
   orderService = inject(OrderService)
   

   ngOnInit(){
    this.orderService.getCustomerOrder().subscribe(result=>{
       this.orders = result;
       console.log("hjgk",this.orders)
    })

   }

   sellingPrice(item:Product){
    return Math.round( item.price - (item.price * (item.discount)/100))
 }
}
