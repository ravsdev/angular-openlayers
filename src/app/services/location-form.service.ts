import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LocationFormService {
  private formData: FormGroup | null = null;

  save(data: FormGroup) {
    this.formData = data;
  }

  get(): FormGroup {
    return this.formData!;
  }

  clear() {
    this.formData = null;
  }
}
