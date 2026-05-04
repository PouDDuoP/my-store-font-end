import { computed, Injectable, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';

const CART_STORAGE_KEY = 'my-store-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Product[]>(this.loadCart());
  
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.price, 0)
  });

  private loadCart(): Product[] {
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
    localStorage.removeItem(CART_STORAGE_KEY);
  }

  private saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart()));
  }
}
