import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { ImageCarouselComponent } from '@shared/components/image-carousel/image-carousel.component';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'app-product',
  imports: [
    RouterLinkWithHref,
    UpperCasePipe,
    CurrencyPipe,
    ReversePipe,
    TimeAgoPipe,
    ImageCarouselComponent,
    TranslatePipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  // Signal input for product
  product = input.required<Product>();

  // Signal output for add to cart
  addToCart = output<Product>();

  // Create images array wrapper for carousel
  // Product model has single `image` field, so we wrap it in an array
  images = computed(() => {
    const p = this.product();
    return p?.image ? [p.image] : [];
  });

  // Get product name for alt text
  productName = computed(() => this.product()?.name ?? 'Product');

  addToCartHandler(): void {
    console.log('click from child');
    this.addToCart.emit(this.product());
  }
}
