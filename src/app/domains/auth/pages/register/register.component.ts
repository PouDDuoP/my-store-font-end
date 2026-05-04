import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html'
})
export default class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  registrationMessage = 'User registration is handled by the administrator. Please contact the admin to create a new account.';
    
  onRegister(credentials: { email: string; password: string }) {
    // Registration endpoint not available - handled by admin
    // If an endpoint becomes available, call it here similar to login
    console.warn('Registration is handled by administrator');
  }
}
