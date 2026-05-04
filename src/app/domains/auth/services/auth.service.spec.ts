import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' },
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
      expect(service.isAuthenticated()).toBeTruthy();
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
    // First login
    const mockResponse = { token: 'test-jwt-token' };
    
    service.login('test@test.com', 'password').subscribe();
    const req = httpMock.expectOne('/api/v1/auth/login');
    req.flush(mockResponse);
    
    // Verify logged in
    expect(service.isAuthenticated()).toBeTruthy();
    
    // Now logout
    service.logout();
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should check if authenticated', () => {
    // Initially not authenticated
    expect(service.isAuthenticated()).toBeFalsy();
    
    // Login to become authenticated
    const mockResponse = { token: 'test-jwt-token' };
    service.login('test@test.com', 'password').subscribe();
    const req = httpMock.expectOne('/api/v1/auth/login');
    req.flush(mockResponse);
    
    expect(service.isAuthenticated()).toBeTruthy();
    
    // Logout
    service.logout();
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
