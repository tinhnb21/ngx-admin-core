/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthInterceptor } from './@core/interceptors/auth.interceptor';
import { NbAuthModule } from '@nebular/auth';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { ADMIN_API_BASE_URL, AdminApiRoleApiClient, AdminApiStatusOfLandApiClient } from '@core/api/admin-api.service.generated';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      forms: {
        login: {
          strategy: 'email',
          redirectDelay: 500,
          redirect: {
            success: '/pages',
            failure: null,
          },
        },
      },
    }),
    AuthRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: ADMIN_API_BASE_URL,
      useValue: environment.apiUrl,
    },
    AdminApiStatusOfLandApiClient,
    AdminApiRoleApiClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
