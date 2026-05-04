import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products without category', (done) => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', description: '', price: 100, image: '', categoryId: 1, isActive: true, createdAt: '' }
    ];

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Product 1');
      done();
    });

    const req = httpMock.expectOne('/api/v1/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch products with category filter', (done) => {
    service.getProductsByCategory('1').subscribe((products) => {
      expect(products).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne('/api/v1/categories/1/products');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should fetch single product', (done) => {
    const mockProduct: Product = { id: 1, name: 'Product 1', description: '', price: 100, image: '', categoryId: 1, isActive: true, createdAt: '' };

    service.getOne('1').subscribe((product) => {
      expect(product.name).toBe('Product 1');
      done();
    });

    const req = httpMock.expectOne('/api/v1/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});
