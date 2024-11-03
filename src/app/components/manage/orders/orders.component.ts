import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../types/order';
import { DatePipe } from '@angular/common';
import { Product } from '../../../types/product';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe,MatButtonModule,MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orderService = inject(OrderService)
   orders:Order[] = [];
   ngOnInit(){
    this.orderService.getAdminOrder().subscribe(result=>{
      this.orders = result;
    })
   }

   sellingPrice(item:Product){
    return Math.round( item.price - (item.price * (item.discount)/100))
 }


 statusChanged(button:any,order:any){
  // console.log(button)
  // console.log(order)
  console.log("igfjkhgjfhjlhkj",order,button)

  this.orderService.updateOrderStatus(order,button.value).subscribe((result)=>{
      alert("Order status updated")
  })
 }
}
