import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css',
})
export class ImageCarouselComponent {
  // Input: array of image URLs
  images = input<string[]>([]);

  // Input: alt text prefix for images
  alt = input<string>('Product image');

  // Current index signal
  currentIndex = signal(0);

  // Computed values
  hasImages = computed(() => this.images().length > 0);
  hasMultipleImages = computed(() => this.images().length > 1);
  currentImage = computed(() => {
    const imgs = this.images();
    const idx = this.currentIndex();
    return imgs.length > 0 ? imgs[idx] : null;
  });

  // Navigation methods
  next(): void {
    const imgs = this.images();
    if (imgs.length === 0) return;
    this.currentIndex.update((idx) => (idx + 1) % imgs.length);
  }

  prev(): void {
    const imgs = this.images();
    if (imgs.length === 0) return;
    this.currentIndex.update(
      (idx) => (idx - 1 + imgs.length) % imgs.length
    );
  }

  goTo(index: number): void {
    const imgs = this.images();
    if (index >= 0 && index < imgs.length) {
      this.currentIndex.set(index);
    }
  }

  // Keyboard navigation handler
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prev();
    }
  }

  // Track by function for ngFor
  trackByIndex(index: number): number {
    return index;
  }
}
