import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component'
import { Category } from '@shared/models/category.model';
import { Product } from '@shared/models/product.model'
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([])
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService)
  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products)
      },
      error: () => {

      }
    })
  }

  private getCategories() {
    this.categoryService.getCategories()
    .subscribe({
      next: (categories) => {
        this.categories.set(categories)
        console.log(categories)
      },
      error: () => {

      }
    })
  }


}
