import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) id: number = 0;
  @Input({required: true}) img: string = '';
  @Input({required: true}) name: string = '';
  @Input({required: true}) price: number = 0;
  @Input() description: string = '';

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log(' click form child ');
    this.addToCart.emit('Hi, I am the child ' + this.name);
  }
}
