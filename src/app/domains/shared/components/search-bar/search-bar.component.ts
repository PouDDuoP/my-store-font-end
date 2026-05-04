import { Component, input, output, signal, ElementRef, viewChild, inject } from '@angular/core';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'app-search-bar',
  imports: [TranslatePipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  // Signal inputs
  placeholder = input<string>('products.search'); // Now using translation key as default

  // Signal output
  searchChange = output<string>();

  // Internal state
  searchQuery = signal('');

  // Reference to the input element
  searchInput = viewChild<ElementRef>('searchInput');

  // Debounce timer
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Handles input events from the search field
   * Updates internal signal and emits debounced search query
   */
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);

    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new debounce timer (300ms)
    this.debounceTimer = setTimeout(() => {
      this.searchChange.emit(value.trim());
    }, 300);
  }

  /**
   * Clears the search input and emits empty string
   */
  clearSearch(): void {
    this.searchQuery.set('');

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.searchChange.emit('');

    // Clear the input element
    const input = this.searchInput();
    if (input) {
      (input.nativeElement as HTMLInputElement).value = '';
    }
  }
}
