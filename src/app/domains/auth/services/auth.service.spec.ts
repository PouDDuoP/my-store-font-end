import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token', (done) => {
    const mockResponse = { token: 'test-jwt-token' };
    
    service.login('test@test.com', 'password').subscribe(() => {
      expect(localStorage.getItem('auth_token')).toBe('test-jwt-token');
      done();
    });

    const req = httpMock.expectOne('/api/v1/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should recover password', (done) => {
    service.recovery('test@test.com').subscribe((response) => {
      expect(response).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne('/api/v1/auth/recovery');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Email sent' });
  });

  it('should change password', (done) => {
    service.changePassword('token123', 'newPassword').subscribe((response) => {
      expect(response).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne('/api/v1/auth/change-password');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Password changed' });
  });

  it('should logout and remove token', () => {
    localStorage.setItem('auth_token', 'test-token');
    service.logout();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('should check if authenticated', () => {
    expect(service.isAuthenticated()).toBeFalsy();
    localStorage.setItem('auth_token', 'test-token');
    expect(service.isAuthenticated()).toBeTruthy();
  });
});
