import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CartService } from '@shared/services/cart.service';
import { AuthService } from '@auth/services/auth.service';
import { LanguageService } from '@shared/services/language.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { Product } from '@shared/models/product.model';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';

interface CartItem {
  product: Product;
  quantity: number;
}

interface NavLink {
  path: string;
  label: string; // Translation key (e.g., 'nav.home')
  exact: boolean;
}

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, TranslatePipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  showMobileMenu = signal(false);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public languageService = inject(LanguageService);
  
  // Computed label for language switcher
  languageSwitchLabel = computed(() => {
    const isEnglish = this.languageService.language() === 'en';
    const targetLangKey = isEnglish ? 'language.spanish' : 'language.english';
    const targetLang = this.languageService.translate(targetLangKey);
    return this.languageService.translate('language.switchTo', { lang: targetLang });
  });
  
  // Navigation links - using translation keys as labels
  navLinks: NavLink[] = [
    { path: '/', label: 'nav.home', exact: true },
    { path: '/about', label: 'nav.about', exact: false }
  ];
  
  // Current route for aria-current
  currentRoute = computed(() => this.router.url);
  
  cart = this.cartService.cart;
  total = this.cartService.total;
  itemCount = computed(() => this.cart().length);
  
  // Group cart items by product ID to show quantity
  cartItemsWithQuantity = computed((): CartItem[] => {
    const cart = this.cart();
    const itemMap = new Map<number, CartItem>();
    
    cart.forEach(product => {
      const existing = itemMap.get(product.id);
      if (existing) {
        existing.quantity++;
      } else {
        itemMap.set(product.id, { product, quantity: 1 });
      }
    });
    
    return Array.from(itemMap.values());
  });
  
  isAuthenticated = this.authService.isAuthenticated;
  userEmail = computed(() => {
    const token = this.authService.getToken();
    return token ? 'User' : '';
  });

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  toggleMobileMenu() {
    this.showMobileMenu.update(prevState => !prevState);
  }

  logout() {
    this.authService.logout();
    this.toggleMobileMenu();
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }
}
