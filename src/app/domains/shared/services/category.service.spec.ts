import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../models/category.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch categories', (done) => {
    const mockCategories: Category[] = [
      { id: 1, name: 'Category 1', image: '', isActive: true, createdAt: '' }
    ];

    service.getCategories().subscribe((categories) => {
      expect(categories.length).toBe(1);
      done();
    });

    const req = httpMock.expectOne('/api/v1/categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch single category', (done) => {
    const mockCategory: Category = { id: 1, name: 'Category 1', image: '', isActive: true, createdAt: '' };

    service.getOne('1').subscribe((category) => {
      expect(category.name).toBe('Category 1');
      done();
    });

    const req = httpMock.expectOne('/api/v1/categories/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);
  });
});
