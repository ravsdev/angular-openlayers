import { AfterViewInit, Component } from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';

@Component({
  selector: 'map-layer-switcher',
  standalone: true,
  template: '',
})
export class LayerSwitcherComponent implements AfterViewInit {
  constructor(private mapService: MapService) {}
  ngAfterViewInit(): void {
    this.mapService.map$.subscribe((map) => {
      if (map) {
        const layerSwitcher = new LayerSwitcher({
          reordering: false,
        });
        layerSwitcher.setHeader('Capas');
        map.addControl(layerSwitcher);
      }
    });
  }
  // Logic to be executed
}
