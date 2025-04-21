import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Category } from '../../../interfaces/category';
import { CategoryService } from '../../../services/category.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
    TableModule,
    SplitButtonModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './category-list.component.html',
  providers: [ConfirmationService, MessageService],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] | null = [];
  items: MenuItem[];
  categoryNameDialogVisible: boolean = false;
  id!: number | null;
  name: string = '';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private categoryService: CategoryService
  ) {
    this.items = [
      {
        label: 'Delete',
      },
    ];
  }

  ngOnInit(): void {
    this.categoryService.categories$.subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: () => {
        // console.log(this.categories);
      },
    });
    this.categoryService.getAll();
  }

  showDialog(category: Category) {
    this.categoryNameDialogVisible = true;
    this.id = category.id;
    this.name = category.name;
  }

  confirmModify() {
    const category: Category = {
      id: this.id as number,
      name: this.name,
    };
    this.categoryService.update(category.id, category).subscribe({
      next: (data) => {
        this.name = '';
        this.id = null;
        this.categoryNameDialogVisible = false;
      },
      error: ({ error }) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Se ha producido un error ${error.message}`,
        });
      },
    });
  }

  confirmDelete(category: Category) {
    this.confirmationService.confirm({
      //target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      key: 'deleteConfirm',

      accept: () => {
        this.deleteCategory(category);
      },
    });
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `La categoría "${category.name}" ha sido eliminada.`,
        });
      },
      error: (err) => {
        console.error('Error al eliminar categoría:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'No se pudo eliminar la categoría. Inténtalo de nuevo más tarde.',
        });
      },
    });
  }
}
