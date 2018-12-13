import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  HostBinding,
  Input
  } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  // Setting some default values using @Input() that can be overridden by property binding in the template

  // Property binding:
  // If passing just a string, you can remove square brackets and single quotes
  // Check the app.component.html for this syntax.
  // Could be confusing because it might not appear to be a bound property anymore
  // Example: defaultColor="yellow"
  @Input() defaultColor = 'transparent';

  // Providing an alias that matches the Directive selector here is possible and results in a template syntax of:
  // [appBetterHighlight]="'red'"
  @Input('appBetterHighlight') highlightColor = 'blue';

  // Alternative to using renderer, bind to a single css property
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent'; // Set an initial value

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  // Equivalent of a regular js listener
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    // this.backgroundColor = 'blue';
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    // this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
  }
}
