import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const adminGuard: CanActivateFn=(route,state)=>{

const router = inject(Router)

    const authService = inject(AuthService)
    if(authService.isLoggedIn){
        if(authService.isAdmin){
      return true
            
        }else{
          router.navigateByUrl('/')
          return false
        }
    }else{
      router.navigateByUrl('/login')
      return false
    }
}