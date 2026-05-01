import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenKey = 'auth_token';

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/v1/auth/login', { email, password })
      .pipe(tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
      }));
  }

  recovery(email: string): Observable<any> {
    return this.http.post<any>('/api/v1/auth/recovery', { email });
  }

  changePassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>('/api/v1/auth/change-password', { token, newPassword });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
