import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private apiUrl = '/api/v1/products';

  constructor() { }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsByCategory(categoryId: string) {
    return this.http.get<Product[]>(`/api/v1/categories/${categoryId}/products`);
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
