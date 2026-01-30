import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  template: `
    <nb-card>
      <nb-card-header>Xác nhận</nb-card-header>
      <nb-card-body>
        Bạn có chắc chắn muốn xoá?
      </nb-card-body>
      <nb-card-footer class="text-right footer-actions">
        <button nbButton status="basic" (click)="cancel()">Huỷ</button>
        <button nbButton status="danger" (click)="confirm()">Xoá</button>
      </nb-card-footer>
    </nb-card>
  `,
  styles: [`
    .footer-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
    }

    nb-card {
      width: 350px;
    }
  `],
})
export class ConfirmDeleteDialogComponent {
  constructor(protected ref: NbDialogRef<ConfirmDeleteDialogComponent>) { }

  cancel() {
    this.ref.close(false);
  }

  confirm() {
    this.ref.close(true);
  }
}
