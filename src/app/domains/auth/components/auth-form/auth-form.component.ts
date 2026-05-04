import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  // Signal-based inputs (Angular 21 pattern)
  title = input<string>('Authentication');
  loginType = input<'login' | 'register'>('login');
  
  // Signal-based output (Angular 21 pattern)
  formSubmit = output<{ email: string; password: string }>();
  
  // Form state using signals
  email = signal('');
  password = signal('');
  
  onSubmit() {
    this.formSubmit.emit({ email: this.email(), password: this.password() });
  }
}
