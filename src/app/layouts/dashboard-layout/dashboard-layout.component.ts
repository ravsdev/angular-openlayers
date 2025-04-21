import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { MenubarModule } from 'primeng/menubar';
import { DashboardMenuComponent } from '../../components/dashboard/dashboard-menu/dashboard-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    SplitterModule,
    MenubarModule,
    DashboardMenuComponent,
    RouterOutlet,
  ],
  template: `
    <div class="h-screen flex flex-column">
      <app-dashboard-menu class="m-2" />
      <div class="ml-2 mr-2">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardLayoutComponent {}
