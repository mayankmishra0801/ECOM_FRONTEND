import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 router= inject(Router)
  customerService = inject(CustomerService);
  // categoryService = inject(CategoryService)
  categoryList:Category[] = [];
  authService = inject(AuthService);
  userName!:string
  private cdr = inject(ChangeDetectorRef);
   ngOnInit() {
  console.log("hjh",this.authService.isAdmin)

       this.customerService.getCategories().subscribe((result:any)=>{
           this.categoryList = result
       })

        this.userName = this.authService.userName.toString();
      //  localStorage.setItem("userId",JSON.stringify(result.user));

      //  this.userName = this.authService.userName;
       console.log("khjghf",this.userName)
       this.cdr.detectChanges();
   }

   onSearch(e:any){
    console.log(e.target.value) 
     if(e.target.value){
      this.router.navigateByUrl("/products?search="+e.target.value)

   }

  

  }
  searchCategory(id:string){
     this.router.navigateByUrl("/products?categoryId="+id)

  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl("/login")
  }
}
