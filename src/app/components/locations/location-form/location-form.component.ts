import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'primeng/editor';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LocationService } from '../../../services/location.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { LocationFormService } from '../../../services/location-form.service';

@Component({
  selector: 'app-location-form',
  imports: [
    ButtonModule,
    Editor,
    AccordionModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DatePicker,
    InputTextModule,
    InputNumber,
    Fluid,
  ],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.scss',
})
export class LocationFormComponent implements OnInit, OnDestroy {
  locationForm!: FormGroup;
  categories!: Category[] | null;
  loadingCategories: boolean = true;

  constructor(
    private locationFormService: LocationFormService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.createForm();
    this.getCategories();
    const saved = this.locationFormService.get();
    console.log(saved);
    if (saved) {
      this.locationForm.patchValue(saved);
    }
  }

  ngOnDestroy(): void {
    console.log(this.locationForm);
    this.locationFormService.save(this.locationForm.value);
  }

  createForm() {
    this.locationForm = new FormGroup({
      title: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      description: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      longitude: new FormControl<number | null>(0, [
        Validators.required,
        Validators.min(-180),
        Validators.max(180),
      ]),
      latitude: new FormControl<number | null>(0, [
        Validators.required,
        Validators.min(-90),
        Validators.max(90),
      ]),
      date: new FormControl<Date | null>(null),
      selectedCategories: new FormControl<string[]>([]),
    });
  }

  getCategories() {
    this.categoryService.categories$.subscribe({
      next: (data) => {
        this.categories = data;
        this.loadingCategories = false;
      },
      error: () => {
        // console.log(this.categories);
      },
    });
    this.categoryService.getAll();
  }
  onSubmit() {
    /* this.categoryService.create(this.categoryForm?.value).subscribe({
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
    });*/
    console.log(this.locationForm?.value);
  }
}
