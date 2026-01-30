import { NgModule } from '@angular/core';
import { NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ThemeModule } from '@theme/theme.module';
import { CategoriesComponent } from './categories.component';
import { StatusComponent } from './status/status.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    CategoriesRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    CategoriesComponent,
    StatusComponent
  ],
})
export class CategoriesModule { }
