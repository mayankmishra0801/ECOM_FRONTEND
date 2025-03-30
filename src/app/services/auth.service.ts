import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http = inject(HttpClient)

  register(name:string,email:string,password:string){
    return this.http.post(environment.apiUrl+"/auth/register",{
      name,
      email,
      password
    })

  }


  login(email:string,password:string){
      return this.http.post(environment.apiUrl+"/auth/login",{
        email,
        password
      })

  }

  get isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token){
      return true
    }else{
      return false
    }

    
  }

  get isAdmin(){
    let userData = localStorage.getItem('userId');
    if(userData){
      return JSON.parse(userData).isAdmin
    }
  }

  get userName(){
     let userData = localStorage.getItem("userId")
     if(userData){
      console.log(JSON.parse(userData).name)
       return JSON.parse(userData).name

     }else{
      return ""
     }
  }

   get userEmail(){
    let userData = localStorage.getItem("userId")
    if(userData){
      return JSON.parse(userData).email
    } else{
      return ""
    }

  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  }

  forgotPassword(email: string) {
    return this.http.post(environment.apiUrl + '/auth/forgot-password', { email });
  }

  resetPassword(token: string, newPassword: string){
    return this.http.post(`${environment.apiUrl}/auth/reset-password`, { token, newPassword });
  }
  
}
