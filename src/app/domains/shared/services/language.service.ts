import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export type Language = 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = signal<Language>(this.getStoredLanguage());
  private http = inject(HttpClient);
  
  readonly language = this.currentLang.asReadonly();
  
  readonly isEnglish = computed(() => this.currentLang() === 'en');
  readonly isSpanish = computed(() => this.currentLang() === 'es');
  
  readonly availableLanguages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ];

  // Translation signals - loaded eagerly
  private enTranslations = signal<Record<string, string>>({});
  private esTranslations = signal<Record<string, string>>({});
  
  constructor() {
    // Load both JSON files eagerly
    this.http.get<Record<string, any>>('/assets/i18n/en.json')
      .subscribe(data => this.enTranslations.set(this.flattenTranslations(data)));
    this.http.get<Record<string, any>>('/assets/i18n/es.json')
      .subscribe(data => this.esTranslations.set(this.flattenTranslations(data)));
  }
  
  private getStoredLanguage(): Language {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('preferred-language');
      if (stored === 'en' || stored === 'es') {
        return stored;
      }
    }
    return 'es'; // Default language
  }
  
  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  }
  
  toggleLanguage(): void {
    const newLang = this.currentLang() === 'en' ? 'es' : 'en';
    this.setLanguage(newLang);
  }

  /**
   * Translate a key with optional parameter interpolation
   * @param key - Translation key (e.g., 'nav.home')
   * @param params - Optional parameters for interpolation (e.g., { count: 5 })
   * @returns Translated string or the key itself if not found
   */
  translate(key: string, params?: Record<string, any>): string {
    const translations = this.currentLang() === 'en' 
      ? this.enTranslations() 
      : this.esTranslations();
    
    let text = translations[key] || key; // Fallback: return key itself
    
    // Parameter interpolation: replace {{param}} with actual value
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
      });
    }
    
    return text;
  }

  /**
   * Flatten nested JSON objects to dot-notation keys
   * @param obj - Nested object from JSON
   * @param prefix - Current prefix for nested keys
   * @returns Flattened object with dot-notation keys
   */
  private flattenTranslations(obj: Record<string, any>, prefix = ''): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'string') {
        result[newKey] = value;
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(result, this.flattenTranslations(value, newKey));
      }
    }
    return result;
  }
}
