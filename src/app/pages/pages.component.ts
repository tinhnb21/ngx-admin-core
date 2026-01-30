import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { MenuPermissionService } from '../@core/services/menu.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(private menuPermissionService: MenuPermissionService) {
    this.menu = this.menuPermissionService.filterMenu(MENU_ITEMS);
  }
}
