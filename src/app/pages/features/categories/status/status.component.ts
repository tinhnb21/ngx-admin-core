import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '@core/data/smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EditStatusDialogComponent } from '@theme/components/categories/status/edit-status-dialog.component';
import { AdminApiStatusOfLandApiClient } from '@core/api/admin-api.service.generated';
import { ConfirmDeleteDialogComponent } from '@theme/components/common/delete/dialog-confirm.component';

@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  settings = {
    actions: {
      add: true,
      edit: true,
      delete: true,
      position: 'right',
      columnTitle: 'Thao tác',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      confirmSave: true,
      editRow: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      id: {
        title: 'STT', type: 'number'
      },
      name: {
        title: 'Tên', type: 'string'
      },
      description: { title: 'Mô tả', type: 'string' },
      status: {
        title: 'Trạng thái',
        type: 'number',
        valuePrepareFunction: (value) =>
          value === 1 ? 'Hoạt động' : 'Ngừng hoạt động',
      },
    },
    mode: 'external'
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private dialogService: NbDialogService,
    private statusOfLandApiClient: AdminApiStatusOfLandApiClient,
    private toastrService: NbToastrService
  ) {
    const data = this.service.getData();
    this.statusOfLandApiClient
      .getStatusOfLandPaging(null, null, null, 1, 10)
      .subscribe({
        next: (response) => {
          this.source.load(response.results);
        },
        error: () => {
        },
      });
  }

  onDeleteConfirm(event): void {
    this.dialogService
      .open(ConfirmDeleteDialogComponent, {
        dialogClass: 'confirm-wide-dialog',
      })
      .onClose.subscribe(confirm => {
        if (confirm) {
          // this.api.deleteStatusOfLand(event.data.id).subscribe(() => {
          //   event.confirm.resolve(); // xoá khỏi table
          // });
          if (true) {
            this.toastrService.success('Xoá bản ghi thành công', 'Thành công');
          } else {
            this.toastrService.danger('Xoá bản ghi thất bại', 'Thất bại');
          }
        } else {
          // event.confirm.reject();
        }
      });
  }

  onAdd() {
    const newData = {
      name: '',
      description: '',
      status: 1,
    };

    this.dialogService
      .open(EditStatusDialogComponent, {
        context: {
          data: newData,
          isAdd: true,
        }
      })
      .onClose.subscribe(result => {
        if (result) {
          this.toastrService.success('Thêm mới thành công', 'Thành công');
        }
      });
  }

  onEdit(event) {
    this.dialogService.open(EditStatusDialogComponent, {
      context: {
        data: event.data,
      },
    }).onClose.subscribe(updatedData => {
      if (updatedData) {
        // event.confirm.resolve(updatedData);
        this.toastrService.success('Cập nhật thành công', 'Thành công');
      }
    });
  }
}
