import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '@core/data/smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EditStatusDialogComponent } from '@theme/components/categories/status/edit-status-dialog.component';
import { AdminApiRoleApiClient } from '@core/api/admin-api.service.generated';
import { ConfirmDeleteDialogComponent } from '@theme/components/common/delete/dialog-confirm.component';
import { PermissionTreeComponent } from '@theme/components/system/permission-grant/permission-tree/permission-tree.component';
import { PermissionGrantDialogComponent } from '@theme/components/system/permission-grant/permission-grant-dialog.component';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent {
  settings = {
    actions: {
      add: true,
      edit: true,
      delete: false,
      position: 'right',
      columnTitle: 'Thao tác'
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
        title: 'ID', type: 'string'
      },
      name: {
        title: 'Tên', type: 'string'
      },
      displayName: { title: 'Tên hiển thị', type: 'string' },
    },
    mode: 'external'
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private dialogService: NbDialogService,
    private roleService: AdminApiRoleApiClient,
    private toastrService: NbToastrService
  ) {
    this.roleService
      .getRolesAllPaging(null, null, 1, 10)
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
    // this.dialogService.open(PermissionTreeComponent, {
    //   context: {
    //     roleId: 1
    //   },
    // }).onClose.subscribe(updatedData => {
    //   if (updatedData) {
    //     this.toastrService.success('Cập nhật thành công', 'Thành công');
    //   }
    // });

    this.dialogService.open(PermissionGrantDialogComponent, {
      context: {
        roleId: "fd467545-6069-4347-8e25-2ac7101d67f9",
        permissions: [
          {
            key: 'Dashboard',
            label: 'Dashboard',
            children: [
              {
                key: 'Permissions.Dashboard.View',
                label: 'Xem dashboard',
              },
            ],
          },
          {
            key: 'Users',
            label: 'Quản lý người dùng',
            children: [
              {
                key: 'Permissions.Users.View',
                label: 'Xem người dùng',
              },
              {
                key: 'Permissions.Users.Create',
                label: 'Tạo người dùng',
              },
              {
                key: 'Permissions.Users.Edit',
                label: 'Sửa người dùng',
              },
              {
                key: 'Permissions.Users.Delete',
                label: 'Xoá người dùng',
              },
            ],
          },
          {
            key: 'Roles',
            label: 'Quản lý vai trò',
            children: [
              {
                key: 'Permissions.Roles.View',
                label: 'Xem vai trò',
              },
              {
                key: 'Permissions.Roles.Create',
                label: 'Tạo vai trò',
              },
              {
                key: 'Permissions.Roles.Edit',
                label: 'Sửa vai trò',
              },
              {
                key: 'Permissions.Roles.Delete',
                label: 'Xoá vai trò',
              },
            ],
          },
          {
            key: 'Posts',
            label: 'Quản lý bài viết',
            children: [
              {
                key: 'Permissions.Posts.View',
                label: 'Xem bài viết',
              },
              {
                key: 'Permissions.Posts.Create',
                label: 'Tạo bài viết',
              },
              {
                key: 'Permissions.Posts.Edit',
                label: 'Sửa bài viết',
              },
              {
                key: 'Permissions.Posts.Delete',
                label: 'Xoá bài viết',
              },
              {
                key: 'Permissions.Posts.Approve',
                label: 'Duyệt bài viết',
              },
            ],
          },
          {
            key: 'Properties',
            label: 'Quản lý bất động sản',
            children: [
              {
                key: 'Permissions.Properties.View',
                label: 'Xem bất động sản',
              },
              {
                key: 'Permissions.Properties.Create',
                label: 'Tạo bất động sản',
              },
              {
                key: 'Permissions.Properties.Edit',
                label: 'Sửa bất động sản',
              },
              {
                key: 'Permissions.Properties.Delete',
                label: 'Xoá bất động sản',
              },
            ],
          },
        ]
      },
      dialogClass: 'wide-dialog',
    }).onClose.subscribe(result => {
      if (result) {
        console.log('Permissions selected:', result);
        // Gọi API lưu quyền tại đây
      }
    });
  }
}
