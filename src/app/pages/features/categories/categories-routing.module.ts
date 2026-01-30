import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AuthGuard } from '../../../@core/guards/auth.guard';
import { StatusComponent } from './status/status.component';

const routes: Routes = [{
  path: '',
  component: CategoriesComponent,
  canActivate: [AuthGuard],
  data: {
    requiredPolicy: 'Permissions.Users.View',
  },
  children: [
    {
      path: '',
      component: StatusComponent,
    },
    {
      path: 'status',
      component: StatusComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule { }

export const routedComponents = [
  CategoriesComponent
];
