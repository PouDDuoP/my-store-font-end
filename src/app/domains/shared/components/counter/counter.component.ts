import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';

  constructor() {
    // NO ASYNC
    // Before render
    // Corre solo una vez
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // Befor and during render
    // Puede correr multiples veces
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    console.log(duration);
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomthing();
    }
  }

  ngOnInit() {
    // after render
    // Corre solo una vez
    // IS ASYNC, iedal for (async, then, subs)
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
  }

  ngAfterViewInit() {
    // after render
    // hijos ya fueron render?
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    // before destroy
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
  }

  doSomthing() {
    // async, can be async
    console.log('change duration');
    console.log('-'.repeat(10));
  }

}
