import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard-menu',
  imports: [MenubarModule],
  template: `<p-menubar [model]="items"></p-menubar> `,
})
export class DashboardMenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Lugares',
        icon: 'pi pi-map-marker',
        routerLink: 'locations',
      },
      {
        label: 'Categorías',
        icon: 'pi pi-tags',
        routerLink: 'categories',
      },
    ];
  }
}
