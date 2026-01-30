import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../../@core/services/permissions.service';
import { AuthApiService } from '../../@core/api/auth-api.service';
import { TokenService } from '../../@core/services/token.service';

@Component({
  selector: 'ngx-custom-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  model = {
    username: '',
    password: '',
  };

  constructor(
    private authApi: AuthApiService,
    private router: Router,
    private tokenService: TokenService,
    private permissionService: PermissionService
  ) { }

  login(): void {
    this.authApi.login({
      username: this.model.username,
      password: this.model.password,
    }).subscribe({
      next: (res) => {
        this.tokenService.saveToken(res.token);
        this.tokenService.saveRefreshToken(res.refreshToken);
        this.tokenService.saveUser(res);

        var user = this.tokenService.getUser();
        if (user == null) this.router.navigate(["/auth/login"]);
        var permissions = JSON.parse(user.permissions);
        this.permissionService.setPermissions(permissions);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
