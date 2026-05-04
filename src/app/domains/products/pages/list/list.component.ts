
import { Component, inject, input, signal, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component'
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component'
import { Category } from '@shared/models/category.model';
import { Product } from '@shared/models/product.model'
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
    selector: 'app-list',
    imports: [ProductComponent, SearchBarComponent, RouterLink, TranslatePipe],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([])
  selectedCategory = signal<string | undefined>(undefined);
  searchQuery = signal<string>('');

  // Signal-based input for category_id
  category_id = input<string | undefined>(undefined);

  // Computed signal that filters products by category and search query
  filteredProducts = computed(() => {
    let result = this.products();

    // Filter by category if selected
    const categoryId = this.selectedCategory();
    if (categoryId) {
      result = result.filter(product => product.categoryId.toString() === categoryId);
    }

    // Filter by search query
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    return result;
  });

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService)

  constructor() {
    // Effect to react to category_id input changes
    effect(() => {
      const categoryId = this.category_id();
      this.selectedCategory.set(categoryId);
    });
  }

  ngOnInit() {
    this.getCategories();
    this.loadProducts();
  }

  private loadProducts(): void {
    const categoryId = this.selectedCategory();
    
    const request = categoryId 
      ? this.productService.getProductsByCategory(categoryId)
      : this.productService.getProducts();
      
    request.subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  selectCategory(categoryId: string | undefined): void {
    this.selectedCategory.set(categoryId);
    // Note: This is for UI interaction - programmatic navigation would update queryParams
  }

  private getCategories() {
    this.categoryService.getCategories()
      .subscribe({
        next: (categories) => {
          this.categories.set(categories)
        },
        error: (err) => {
          console.error('Error loading categories:', err);
        }
      })
  }


}
