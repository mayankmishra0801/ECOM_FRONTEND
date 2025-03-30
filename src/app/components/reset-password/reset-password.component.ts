import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  resetPasswordForm = this.formBuilder.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  token: string = ''; // To hold the reset token

  ngOnInit(): void {
    // Extract the token from the URL
    this.token = this.activatedRoute.snapshot.paramMap.get('token') || '';
  }

  submit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const newPassword = this.resetPasswordForm.value.newPassword;
    const confirmPassword = this.resetPasswordForm.value.confirmPassword;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Call the reset password API
    this.authService.resetPassword(this.token, this.resetPasswordForm.value.newPassword!).subscribe(response => {
      alert('Password has been reset successfully!');
      this.router.navigateByUrl('/login');
    }, error => {
      alert('Failed to reset password. Please try again.');
    });
  }

}
