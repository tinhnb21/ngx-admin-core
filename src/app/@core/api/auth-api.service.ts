import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface IAuthenticatedResult {
  token?: string | undefined;
  refreshToken?: string | undefined;
}

export class AuthenticatedResult implements IAuthenticatedResult {
  token?: string | undefined;
  refreshToken?: string | undefined;

  constructor(data?: IAuthenticatedResult) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.token = _data["token"];
      this.refreshToken = _data["refreshToken"];
    }
  }

  static fromJS(data: any): AuthenticatedResult {
    data = typeof data === 'object' ? data : {};
    let result = new AuthenticatedResult();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["token"] = this.token;
    data["refreshToken"] = this.refreshToken;
    return data;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {

  login(data: LoginRequest) {
    return this.http.post<AuthenticatedResult>(
      `${this.baseUrl}/api/admin/auth`,
      data,
    );
  }

  refreshToken(refreshToken: string): Observable<AuthenticatedResult> {
    return this.http.post<AuthenticatedResult>(
      `${this.baseUrl}/api/admin/token/refresh`,
      { refreshToken }
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/api/admin/auth/logout`,
      {}
    );
  }
}
