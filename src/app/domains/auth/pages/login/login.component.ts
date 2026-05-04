import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
    
  onLogin(credentials: { email: string; password: string }) {
    this.authService.login(credentials.email, credentials.password)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Login failed', err)
      });
  }
}
