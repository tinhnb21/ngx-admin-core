import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { PermissionNode } from './permission-tree/permission-tree.component';

@Component({
  selector: 'ngx-permission-grant-dialog',
  templateUrl: './permission-grant-dialog.component.html',
})
export class PermissionGrantDialogComponent {
  @Input() roleId!: string;
  @Input() permissions: PermissionNode[] = [];

  constructor(protected dialogRef: NbDialogRef<PermissionGrantDialogComponent>) {
    console.log("roleId", this.roleId);
    console.log("permissions", this.permissions);
  }

  save() {
    const selected = this.collect(this.permissions);
    this.dialogRef.close(selected);
  }

  close() {
    this.dialogRef.close();
  }

  private collect(nodes: PermissionNode[]): string[] {
    let result: string[] = [];
    nodes.forEach(n => {
      if (n.checked && !n.children) result.push(n.key);
      if (n.children) result.push(...this.collect(n.children));
    });
    return result;
  }
}
