import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LocationEditLayoutComponent } from './layouts/location-edit-layout/location-edit-layout.component';
import { CategoriesComponent } from './components/categories/categories.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      {
        path: 'locations',
        component: LocationEditLayoutComponent,
      },
    ],
  },
];
