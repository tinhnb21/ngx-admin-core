import { Directive, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";
import { PermissionService } from "../../@core/services/permissions.service";

@Directive({
  selector: '[ngxPermission]',
})
export class AppPermissionDirective implements OnInit {

  @Input('ngxPermission') permission!: string | string[];
  @Input() permissionMode: 'hide' | 'disable' = 'hide';

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private el: ElementRef,
    private renderer: Renderer2,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    const allowed = Array.isArray(this.permission)
      ? this.permissionService.hasAny(this.permission)
      : this.permissionService.has(this.permission);

    if (allowed) {
      this.vcr.createEmbeddedView(this.tpl);
    } else {
      this.vcr.clear();

      if (this.permissionMode === 'disable') {
        this.renderer.setProperty(this.el.nativeElement, 'disabled', true);
      }
    }
  }
}
