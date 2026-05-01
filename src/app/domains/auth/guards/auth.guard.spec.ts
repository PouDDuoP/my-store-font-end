import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { runInInjectionContext } from '@angular/core';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { 
          provide: Router, 
          useValue: { createUrlTree: jest.fn(() => ({}) as any) } 
        }
      ]
    });
    localStorage.clear();
  });

  it('should allow access when authenticated', () => {
    localStorage.setItem('auth_token', 'test-token');
    
    const result = TestBed.runInInjectionContext(() => 
      authGuard({} as any, {} as any)
    );
    
    expect(result).toBe(true);
  });

  it('should redirect to login when not authenticated', () => {
    const result = TestBed.runInInjectionContext(() => 
      authGuard({} as any, {} as any)
    );
    
    expect(result).toBeTruthy(); // Returns UrlTree
    const router = TestBed.inject(Router);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
