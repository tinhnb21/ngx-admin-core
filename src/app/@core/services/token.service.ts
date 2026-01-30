import { Injectable } from '@angular/core';

export interface UserModel {
  id: string;
  email: string;
  firstName: string;
  roles: string[];
  permissions: any;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private ACCESS_TOKEN = 'access_token';
  private REFRESH_TOKEN = 'refresh_token';
  private USER = 'user';
  private PERMISSIONS = 'permissions';

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  setPermissions(permissions: string[]) {
    localStorage.setItem(this.PERMISSIONS, JSON.stringify(permissions));
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getPermissions(): string[] {
    return JSON.parse(localStorage.getItem(this.PERMISSIONS) || '[]');
  }

  clear() {
    localStorage.clear();
  }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(this.ACCESS_TOKEN);
    window.localStorage.setItem(this.ACCESS_TOKEN, token);

    const user = this.getUser();
    if (user?.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return window.localStorage.getItem(this.ACCESS_TOKEN);
  }

  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem(this.REFRESH_TOKEN);
    window.localStorage.setItem(this.REFRESH_TOKEN, token);
  }


  public saveUser(user: any): void {
    window.localStorage.removeItem(this.USER);
    window.localStorage.setItem(this.USER, JSON.stringify(user));
  }

  public getUser(): UserModel | null {
    const token = window.localStorage.getItem(this.ACCESS_TOKEN);
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const user: UserModel = JSON.parse(this.b64DecodeUnicode(base64));
    return user;
  }

  b64DecodeUnicode(str: any) {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(str), function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }
}
