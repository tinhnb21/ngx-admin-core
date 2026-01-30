import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PermissionService {

  private permissions: string[] = [];

  setPermissions(perms: string[]) {
    this.permissions = perms;
  }

  has(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  hasAny(perms: string[]): boolean {
    return perms.some(p => this.has(p));
  }
}
