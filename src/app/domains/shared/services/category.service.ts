import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);
  private apiUrl = '/api/v1/categories';

  constructor() { }

  getCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getOne(id: string) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
}
