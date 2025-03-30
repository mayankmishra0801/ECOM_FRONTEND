import { Component,inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatButtonModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
   
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  submit() {
    const email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword(this.forgotPasswordForm.value.email!).subscribe(response => {
      alert("Password reset link sent to your email!");
      this.authService.logout();
      this.router.navigateByUrl('/login');

    }, error => {
      alert("Failed to send reset link. Please try again.");
    });
  }
}
