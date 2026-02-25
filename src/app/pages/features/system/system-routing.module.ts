import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';
import { AuthGuard } from '../../../@core/guards/auth.guard';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{
  path: '',
  component: SystemComponent,
  canActivate: [AuthGuard],
  data: {
    requiredPolicy: 'Permissions.Users.View',
  },
  children: [
    {
      path: '',
      component: RoleComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'roles',
      component: RoleComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule { }

export const routedComponents = [
  SystemComponent
];
