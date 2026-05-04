import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  size = input<'sm' | 'md' | 'lg'>('md');

  sizeClass = computed(() => {
    const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-4xl',
    };
    return sizeMap[this.size()];
  });
}
