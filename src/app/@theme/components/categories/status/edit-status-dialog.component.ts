import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-status-dialog',
  templateUrl: './edit-status-dialog.component.html',
  styleUrls: ['./edit-status-dialog.component.scss'],
})
export class EditStatusDialogComponent {
  @Input() data: any;
  @Input() isAdd = false;

  constructor(protected ref: NbDialogRef<EditStatusDialogComponent>) { }

  save() {
    this.ref.close(this.data);
  }

  cancel() {
    this.ref.close();
  }
}
