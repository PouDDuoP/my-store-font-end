import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    image: 'http://test.com/image.jpg',
    categoryId: 1,
    isActive: true,
    createdAt: '2024-01-01'
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Use TestBed to provide injection context
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: PLATFORM_ID, useValue: 'browser' }  // Mock as browser platform
      ]
    });
    
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    service.addToCart(mockProduct);
    expect(service.cart().length).toBe(1);
    expect(service.cart()[0]).toEqual(mockProduct);
  });

  it('should add multiple products to cart', () => {
    service.addToCart(mockProduct);
    service.addToCart({ ...mockProduct, id: 2 });
    expect(service.cart().length).toBe(2);
  });

  it('should remove product from cart', () => {
    service.addToCart(mockProduct);
    service.addToCart({ ...mockProduct, id: 2 });
    service.removeFromCart(mockProduct);
    expect(service.cart().length).toBe(1);
    expect(service.cart()[0].id).toBe(2);
  });

  it('should persist cart to localStorage', () => {
    service.addToCart(mockProduct);
    const saved = localStorage.getItem('my-store-cart');
    expect(saved).toBeTruthy();
    const parsed = JSON.parse(saved!);
    expect(parsed.length).toBe(1);
  });

  it('should load cart from localStorage on init', () => {
    // Reset the testing module to get a fresh service instance
    TestBed.resetTestingModule();
    
    // Set localStorage BEFORE configuring the module
    localStorage.setItem('my-store-cart', JSON.stringify([mockProduct]));
    
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    
    // Create a new service instance - it should load from localStorage
    const newService = TestBed.inject(CartService);
    expect(newService.cart().length).toBe(1);
  });

  it('should calculate total correctly', () => {
    service.addToCart(mockProduct);
    service.addToCart({ ...mockProduct, id: 2, price: 200 });
    expect(service.total()).toBe(300);
  });
});
