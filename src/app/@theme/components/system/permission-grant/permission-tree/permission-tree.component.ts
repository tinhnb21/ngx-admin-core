import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() stateChange = new EventEmitter<void>();

  // Toggle từ checkbox
  onToggle(node: PermissionNode, checked: boolean) {
    this.setCheckedDown(node, checked);
    this.updateParentState();
  }

  // Set check xuống toàn bộ con
  private setCheckedDown(node: PermissionNode, checked: boolean) {
    node.checked = checked;
    node.children?.forEach(c => this.setCheckedDown(c, checked));
  }

  // Khi component con thay đổi
  onChildStateChange() {
    this.updateParentState();
  }

  // Check lại trạng thái của node cha
  private updateParentState() {
    this.permissions.forEach(node => {
      if (node.children?.length) {
        node.checked = node.children.every(c => c.checked);
      }
    });

    // báo ngược lên cha cao hơn
    this.stateChange.emit();
  }
}
