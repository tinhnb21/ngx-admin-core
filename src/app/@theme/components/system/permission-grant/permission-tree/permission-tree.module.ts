import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCheckboxModule } from '@nebular/theme';
import { PermissionTreeComponent } from './permission-tree.component';

@NgModule({
  declarations: [PermissionTreeComponent],
  imports: [
    CommonModule,
    NbCheckboxModule,
  ],
  exports: [
    PermissionTreeComponent,
  ],
})
export class PermissionTreeModule { }
