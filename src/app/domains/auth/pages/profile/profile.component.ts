import { Component, inject, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './profile.component.html'
})
export default class ProfileComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Get user email from token
  userEmail = computed(() => {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email || payload.user || 'User';
      } catch {
        return 'User';
      }
    }
    return '';
  });
     
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
