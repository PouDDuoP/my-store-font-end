import { computed, Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '@shared/models/product.model';

const CART_STORAGE_KEY = 'my-store-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private platformId = inject(PLATFORM_ID);
  
  cart = signal<Product[]>(this.loadCart());
  
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.price, 0)
  });

  private loadCart(): Product[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch (e) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  }

  addToCart(product: Product) {
    this.cart.update(state => [...state, product]);
    this.saveCart();
  }

  removeFromCart(product: Product) {
    this.cart.update(state => state.filter(p => p.id !== product.id));
    this.saveCart();
  }

  clearCart() {
    this.cart.set([]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }

  private saveCart() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart()));
    }
  }
}
