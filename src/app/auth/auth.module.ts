import { NgModule } from '@angular/core';
import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
} from '@nebular/auth';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule } from '@nebular/theme';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'custom',
          baseEndpoint: environment.apiUrl,
          login: {
            endpoint: '/api/admin/auth',
            method: 'post',
          },
          token: {
            class: NbAuthJWTToken,
            key: 'access_token',
          },
        }),
      ],
    }),
  ],
})
export class AuthModule { }
