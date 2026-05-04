import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private tokenKey = 'auth_token';
  
  // Reactive signal for authentication state - only access localStorage in browser
  private authToken = signal<string | null>(
    isPlatformBrowser(this.platformId) ? localStorage.getItem(this.tokenKey) : null
  );
  
  // Computed signal for authenticated state
  isAuthenticated = computed(() => !!this.authToken());

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/v1/auth/login', { username, password })
      .pipe(tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.authToken.set(response.token);
      }));
  }

  register(name: string, email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/v1/auth/register', { name, email, password })
      .pipe(tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.authToken.set(response.token);
      }));
  }

  recovery(email: string): Observable<any> {
    return this.http.post<any>('/api/v1/auth/recovery', { email });
  }

  changePassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>('/api/v1/auth/change-password', { token, newPassword });
  }

  getProfile(): Observable<any> {
    return this.http.get<any>('/api/v1/profile');
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authToken.set(null);
  }

  getToken(): string | null {
    return this.authToken();
  }
}
