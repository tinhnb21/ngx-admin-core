import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { PermissionService } from './permissions.service';

@Injectable({
  providedIn: 'root',
})
export class MenuPermissionService {

  constructor(private permissionService: PermissionService) { }

  filterMenu(items: NbMenuItem[]): NbMenuItem[] {
    return items
      .map(item => this.filterMenuItem(item))
      .filter(item => item !== null) as NbMenuItem[];
  }

  private filterMenuItem(item: NbMenuItem): NbMenuItem | null {

    const policy = item.data?.policy;

    // Không có quyền → ẩn
    if (policy && !this.permissionService.has(policy)) {
      return null;
    }

    // Có children → filter tiếp
    if (item.children) {
      item.children = item.children
        .map(c => this.filterMenuItem(c))
        .filter(c => c !== null) as NbMenuItem[];

      // Không còn child nào → ẩn luôn parent
      if (item.children.length === 0 && !item.link) {
        return null;
      }
    }

    return item;
  }
}
