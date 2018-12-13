import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  // This is a property, but we can also define a setter method here too
  // It will fire when the property changes

  // The property name can match what you bind to in the template
  // which is the same as the Directive selector
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  // Need to get access to the template
  // and we also need access to the place in the Dcoument where we want to render it
  // Both can be injected

  // The template is the "what"
  // The view Reference is the "where"
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
