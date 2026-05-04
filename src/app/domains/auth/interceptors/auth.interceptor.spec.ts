import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';

describe('authInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;

  beforeEach(() => {
    // Clear localStorage FIRST before creating services
    localStorage.clear();
    
    TestBed.resetTestingModule();
    
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header when token exists', (done) => {
    // Set token via login to properly update the signal
    const mockResponse = { token: 'test-token' };
    
    authService.login('test@test.com', 'password').subscribe(() => {
      // Now make the request that should have the Authorization header
      httpClient.get('/api/test').subscribe(() => done());

      const req = httpMock.expectOne('/api/test');
      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush({});
    });

    const loginReq = httpMock.expectOne('/api/v1/auth/login');
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(mockResponse);
  });

  it('should not add Authorization header when no token', (done) => {
    httpClient.get('/api/test').subscribe(() => done());

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBeFalsy();
    req.flush({});
  });
});
