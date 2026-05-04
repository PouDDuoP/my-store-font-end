import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

/**
 * Impure pipe for declarative template translation.
 * Uses pure: false to re-evaluate when currentLang signal changes.
 */
@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Impure: re-evaluate when language changes
})
export class TranslatePipe implements PipeTransform {
  private languageService = inject(LanguageService);

  /**
   * Transform a translation key to its translated string
   * @param key - Translation key (e.g., 'nav.home')
   * @param params - Optional parameters for interpolation (e.g., { count: 5 })
   * @returns Translated string with interpolated parameters
   */
  transform(key: string, params?: Record<string, any>): string {
    return this.languageService.translate(key, params);
  }
}
