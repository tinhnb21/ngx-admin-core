import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '@core/data/smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EditStatusDialogComponent } from '@theme/components/categories/status/edit-status-dialog.component';
import { AdminApiRoleApiClient, AdminApiUserApiClient, PermissionDto, RoleClaimsDto } from '@core/api/admin-api.service.generated';
import { ConfirmDeleteDialogComponent } from '@theme/components/common/delete/dialog-confirm.component';
import { PermissionGrantDialogComponent } from '@theme/components/system/permission-grant/permission-grant-dialog.component';
import { PermissionNode } from '@theme/components/system/permission-grant/permission-tree/permission-tree.component';
import { EditUserDialogComponent } from '@theme/components/system/user/edit-user-dialog.component';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
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
      userName: {
        title: 'Tài khoản', type: 'string'
      },
      fullName: {
        title: 'Họ tên', type: 'string'
      },
      email: { title: 'Email', type: 'string' },
      isActive: {
        title: 'Trạng thái',
        type: 'number',
        valuePrepareFunction: (value) =>
          value == true ? 'Hoạt động' : 'Ngừng hoạt động',
      },
    },
    mode: 'external'
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private dialogService: NbDialogService,
    private userService: AdminApiUserApiClient,
    private toastrService: NbToastrService
  ) {
    this.userService
      .getAllUsersPaging(null, null, null, null, null, 1, 10)
      .subscribe({
        next: (response) => {
          console.log("response.results",response.results);
          const data = response.results.map((item: any) => ({...item, fullName: `${item.firstName} ${item.lastName}`}));
          this.source.load(data);
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
      .open(EditUserDialogComponent, {
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

  mapToPermissionNodes(permissions): PermissionNode[] {
    const map: Record<string, PermissionNode> = {};

    for (const p of permissions) {
      // Lấy module: Dashboard, User...
      const module = p.value.split('.')[1];

      if (!map[module]) {
        map[module] = {
          key: module,
          label: module,
          children: []
        };
      }

      map[module].children!.push({
        key: p.value,
        label: p.displayName,
        checked: p.selected ?? false
      });
    }

    return Object.values(map);
  }

  syncParentChecked(nodes: PermissionNode[]): boolean {
    if (!nodes || nodes.length === 0) return false;

    let allChecked = true;

    nodes.forEach(node => {
      if (node.children?.length) {
        node.checked = this.syncParentChecked(node.children);
      }

      if (!node.checked) {
        allChecked = false;
      }
    });

    return allChecked;
  }

  onEdit(event) {
    console.log("event.data",event.data);

    this.dialogService.open(EditUserDialogComponent, {
      context: {
        data: event.data,
      },
    }).onClose.subscribe(updatedData => {
      if (updatedData) {
        this.toastrService.success('Cập nhật thành công', 'Thành công');
      }
    });

    // this.userService
    //   .getAllRolePermissions(event.data.id)
    //   .subscribe({
    //     next: (response) => {
    //       const listPermission: PermissionNode[] = this.mapToPermissionNodes(response.roleClaims ?? []);
    //       this.syncParentChecked(listPermission);
    //       this.dialogService.open(PermissionGrantDialogComponent, {
    //         context: {
    //           roleId: event.data.id,
    //           permissions: listPermission
    //         },
    //         dialogClass: 'wide-dialog',
    //       }).onClose.subscribe(result => {
    //         if (result) {
    //           var roleClaims: RoleClaimsDto[] = [];
    //           for (let index = 0; index < result.length; index++) {
    //             roleClaims.push(
    //               new RoleClaimsDto({
    //                 type: result[index].split('.')[0],
    //                 selected: true,
    //                 value: result[index],
    //               })
    //             );
    //           }

    //           var updateValues = new PermissionDto({
    //             roleId: event.data.id,
    //             roleClaims: roleClaims,
    //           });

    //           this.roleService
    //             .savePermission(updateValues)
    //             .subscribe(() => {
    //               this.toastrService.success('Cập nhật quyền thành công', 'Thành công');
    //             });
    //         }
    //       });
    //     },
    //     error: () => {
    //     },
    //   });
  }
}
