import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthApiService } from '../api/auth-api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshToken$ = new BehaviorSubject<string | null>(null);

  constructor(
    private tokenService: TokenService,
    private authApi: AuthApiService,
    private router: Router,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // 1. Attach access token
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken) {
      req = this.addToken(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        // 2. Access token hết hạn
        if (error.status === 401) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshToken$.next(null);

      const refreshToken = this.tokenService.getRefreshToken();

      // Không có refresh token → logout
      if (!refreshToken) {
        this.logout();
        return throwError(() => null);
      }

      return this.authApi.refreshToken(refreshToken).pipe(
        switchMap(res => {
          this.isRefreshing = false;

          // Update token
          this.tokenService.setTokens(
            res.token,
            res.refreshToken
          );

          this.refreshToken$.next(res.token);

          // Retry request cũ
          return next.handle(
            this.addToken(request, res.token)
          );
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.logout();
          return throwError(() => err);
        })
      );
    }

    // Chờ refresh xong
    return this.refreshToken$.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token =>
        next.handle(this.addToken(request, token!))
      )
    );
  }

  private addToken(
    req: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private logout() {
    this.tokenService.clear();
    this.router.navigate(['/auth/login']);
  }
}
