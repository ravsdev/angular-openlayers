import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-category-form',
  imports: [
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './category-form.component.html',
  providers: [MessageService],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl<string | null>(null),
    });
  }

  onSubmit() {
    this.categoryService.create(this.categoryForm?.value).subscribe({
      next: (data) => {
        this.categoryForm.reset();
      },
      error: ({ error }) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Se ha producido un error ${error.message}`,
        });
        console.log(error.message);
      },
    });
    console.log(this.categoryForm?.value);
  }
}
