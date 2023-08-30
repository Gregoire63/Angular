import { Directive, ElementRef, HostBinding  } from '@angular/core';

@Directive({
  selector: '[appUpdatedAt]',
  standalone: true,
})
export class UpdatedAtDirective {
  @HostBinding("style")
  elementClass = "margin-left: 10px;";
  constructor(private el: ElementRef) {
    this.el.nativeElement.textContent  = ' - Dernière mis à jour : '+ this.el.nativeElement.textContent;
 }
}
