import { AuthService } from '../../services/auth.service';
import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
    imports: [MatButtonModule, MatInputModule,ReactiveFormsModule,RouterLink],
    templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {

  authService = inject(AuthService)

  

}
