import { Component, Input } from '@angular/core';

export interface PermissionNode {
  key: string;
  label: string;
  checked?: boolean;
  children?: PermissionNode[];
}

@Component({
  selector: 'ngx-permission-tree',
  templateUrl: './permission-tree.component.html',
  styleUrls: ['./permission-tree.component.scss'],
})
export class PermissionTreeComponent {

  @Input() permissions: PermissionNode[] = [];

  @Input() isChild: boolean = false;

  toggle(node: PermissionNode, checked: boolean) {
    node.checked = checked;
    if (node.children) {
      node.children.forEach(c => this.toggle(c, checked));
    }
  }
}
