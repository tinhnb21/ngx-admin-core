import { NgModule } from '@angular/core';
import { NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SystemRoutingModule } from './system-routing.module';
import { ThemeModule } from '@theme/theme.module';
import { SystemComponent } from './system.component';
import { RoleComponent } from './role/role.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    SystemRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    SystemComponent,
    RoleComponent
  ],
})
export class SystemModule { }
