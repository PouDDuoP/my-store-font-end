import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  @Input() title = 'Authentication';
  @Output() submitted = new EventEmitter<{ email: string; password: string }>();
  
  email = '';
  password = '';
  
  onSubmit() {
    this.submitted.emit({ email: this.email, password: this.password });
  }
}
