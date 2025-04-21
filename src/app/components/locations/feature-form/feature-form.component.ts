import { Component, OnInit } from '@angular/core';
import { Feature } from 'ol';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeatureService } from '../../../services/feature.service';
import { Type } from 'ol/geom/Geometry';
import { TextareaModule } from 'primeng/textarea';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
    selector: 'app-feature-form',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextareaModule,
        InputSwitchModule,
    ],
    templateUrl: './feature-form.component.html',
    styleUrl: './feature-form.component.scss'
})
export class FeatureFormComponent implements OnInit {
  featureForm: FormGroup;
  feature!: Feature | null;
  featureProperties: boolean | null = null;
  // type: Type | undefined

  constructor(private fb: FormBuilder, private featureService: FeatureService) {
    this.featureForm = this.fb.group({
      POI: [false],
      crop: [false],
      description: null,
    });
  }

  ngOnInit(): void {
    this.featureService.selectedFeature$.subscribe((feature) => {
      if (feature) {
        this.feature = feature;
        //this.type = feature.getGeometry()?.getType()
        this.featureForm.patchValue(feature.getProperties());
        this.featureProperties = feature.getProperties()['POI'];
      } else {
        this.feature = null;
        this.featureForm.reset();
      }
      this.featureForm.valueChanges.subscribe((updatedProperties) => {
        console.log(updatedProperties);
        this.featureService.updateFeatureProperties(updatedProperties);
      });
    });
  }
}
