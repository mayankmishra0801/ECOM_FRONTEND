import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   authService = inject(AuthService)
   router = inject(Router)

  formbuilder = inject(FormBuilder);

  loginForm = this.formbuilder.group({  
    email:['',[Validators.required,Validators.email]],  
    password:['',[Validators.required,Validators.minLength(5)]]

  })
  

  login(){
    this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!).subscribe(
      (result:any)=>{
        console.log(result)
        localStorage.setItem("token",result.token);
        localStorage.setItem("userId",JSON.stringify(result.user));
        // localStorage.setItem("userName", result.user.user.name);
        this.router.navigateByUrl("/")
      }
    )

    console.log(this.loginForm.value)

  }

}
