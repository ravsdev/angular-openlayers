import { Injectable } from '@angular/core';
import { MapService } from './map/map.service';
import { BehaviorSubject } from 'rxjs';
import { Feature } from 'ol';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private selectedFeatureSubject = new BehaviorSubject<Feature | null>(null);
  selectedFeature$ = this.selectedFeatureSubject.asObservable();

  constructor(private mapService: MapService) {
    const selectInteraction = this.mapService.getSelectInteraction();
    if (selectInteraction) {
      selectInteraction.on('select', (event) => {
        const selectedFeatures: Feature[] = event.target
          .getFeatures()
          .getArray();
        //selectedFeatures[0]?.setStyle(mapService.getSelectedStyle())
        this.selectedFeatureSubject.next(selectedFeatures[0] || null);
      });
    }
  }

  updateFeatureProperties(properties: { [key: string]: any }) {
    const feature = this.selectedFeatureSubject.getValue();
    if (feature) {
      feature.setProperties(properties);
    }
  }
}
