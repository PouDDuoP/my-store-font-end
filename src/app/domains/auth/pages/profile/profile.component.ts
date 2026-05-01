import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html'
})
export default class ProfileComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
    
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
