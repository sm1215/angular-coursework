import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // This works but...
    // It's not a good practice to directly access elements because there can be some cases
    // where a DOM is not available while this code is executing - such as a service worker
    // (Angular can render templates without a DOM)
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
