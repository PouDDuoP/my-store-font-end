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

  getProducts(categoryId?: string) {
    let url = this.apiUrl;

    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }
    return this.http.get<Product[]>(url);
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
