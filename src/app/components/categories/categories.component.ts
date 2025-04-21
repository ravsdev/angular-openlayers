import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  imports: [
    CategoryListComponent,
    CardModule,
    CategoryFormComponent,
    DividerModule,
    PanelModule,
  ],
  template: `
    <div class="flex justify-content-center align-items-center w-full">
      <p-panel header="Categorías" class="w-9">
        <app-category-form />
        <p-divider />
        <app-category-list />
      </p-panel>
    </div>
  `,
  styles: [],
})
export class CategoriesComponent {
  constructor(private categoryService: CategoryService) {}
}
