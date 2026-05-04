import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '@shared/services/cart.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { Product } from '@shared/models/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <div class="min-h-[calc(100vh-4rem)] bg-background py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-text mb-6 font-display">{{ 'cart.myCart' | translate }} ({{ itemCount() }})</h1>
        
        @if (cart().length === 0) {
          <div class="text-center py-12">
            <p class="text-text/70 text-lg mb-4">{{ 'cart.empty' | translate }}</p>
            <a routerLink="/" class="btn-emerald mt-4 inline-block px-6 py-3">
              {{ 'cart.startShopping' | translate }}
            </a>
          </div>
        } @else {
          <div class="space-y-4">
            @for (item of cartWithQuantity(); track item.product.id) {
              <div class="flex items-center space-x-4 p-4 border-2 border-border bg-white rounded-lg shadow-sm">
                <img 
                  [src]="item.product.image" 
                  [alt]="item.product.name" 
                  class="w-20 h-20 object-cover rounded"
                >
                <div class="flex-1">
                  <h3 class="font-semibold text-text">{{ item.product.name }}</h3>
                  <p class="text-text/70">
                    {{ item.quantity }} x {{ item.product.price | currency:'USD':'symbol':'1.2-2' }}
                  </p>
                </div>
                <div class="text-right flex items-center space-x-4">
                  <p class="font-bold text-text">
                    {{ (item.product.price * item.quantity) | currency:'USD':'symbol':'1.2-2' }}
                  </p>
                  <button 
                    (click)="removeFromCart(item.product)" 
                    class="text-sm text-accent hover:underline"
                  >
                    {{ 'cart.remove' | translate }}
                  </button>
                </div>
              </div>
            }
            
            <div class="border-t-2 border-border pt-6 mt-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <p class="text-text/70">{{ 'cart.items' | translate }} {{ itemCount() }}</p>
                  <p class="text-xl font-bold text-text">{{ 'cart.total' | translate }} {{ total() | currency:'USD':'symbol':'1.2-2' }}</p>
                </div>
                <div class="space-x-4">
                  <a routerLink="/" class="btn-secondary px-6 py-3 inline-block">
                    {{ 'cart.startShopping' | translate }}
                  </a>
                  <button 
                    (click)="proceedToCheckout()" 
                    class="btn-emerald px-8 py-3"
                  >
                    {{ 'cart.proceedToCheckout' | translate }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export default class CartComponent {
  private cartService = inject(CartService);
  
  cart = this.cartService.cart;
  total = this.cartService.total;
  
  itemCount = computed(() => {
    const items = this.cart();
    return items.length;
  });
  
  cartWithQuantity = computed(() => {
    const items = this.cart();
    const map = new Map<number, CartItem>();
    
    items.forEach(p => {
      const existing = map.get(p.id);
      if (existing) {
        existing.quantity++;
      } else {
        map.set(p.id, { product: p, quantity: 1 });
      }
    });
    
    return Array.from(map.values());
  });
  
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }
  
  proceedToCheckout() {
    alert('Checkout functionality coming soon!');
  }
}
