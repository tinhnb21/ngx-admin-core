import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UrlConstants } from '../constants/url.constants';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(
    activateRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {

    const requiredPolicy = activateRoute.data['requiredPolicy'] as string;

    const loggedInUser = this.tokenService.getUser();

    // 1. Chưa login → về login
    if (!loggedInUser) {
      this.router.navigate([UrlConstants.LOGIN], {
        queryParams: { returnUrl: routerState.url },
      });
      return false;
    }

    // 2. Lấy permission an toàn
    let permissions: string[] = [];

    try {
      permissions = JSON.parse(loggedInUser.permissions || '[]');
    } catch {
      permissions = [];
    }

    // 3. Có quyền → cho vào
    if (permissions.includes(requiredPolicy)) {
      return true;
    }

    // 4. Không có quyền → 403
    this.router.navigate(['/pages/miscellaneous/403'], {
      queryParams: { returnUrl: routerState.url },
    });
    return false;
  }
}
