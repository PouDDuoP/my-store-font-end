import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent, TranslatePipe],
  templateUrl: './register.component.html'
})
export default class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  registrationMessage = ''; // Using translation in template instead
    
  onRegister(credentials: { email: string; password: string }) {
    // Registration endpoint not available - handled by admin
    // If an endpoint becomes available, call it here similar to login
    console.warn('Registration is handled by administrator', credentials);
  }
}
