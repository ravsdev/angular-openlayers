import { Component } from '@angular/core';
import { LocationFormComponent } from '../../components/locations/location-form/location-form.component';
import { SplitterModule } from 'primeng/splitter';
import { FeatureFormComponent } from '../../components/locations/feature-form/feature-form.component';
import { MapComponent } from '../../components/map/map.component';
import { EditbarComponent } from '../../components/map/editbar/editbar.component';
import { LayerSwitcherComponent } from '../../components/map/layer-switcher/layer-switcher.component';
import { LayersComponent } from '../../components/map/layers/layers.component';

@Component({
  selector: 'app-location-edit-layout',
  imports: [
    LocationFormComponent,
    FeatureFormComponent,
    SplitterModule,
    MapComponent,
    EditbarComponent,
    LayerSwitcherComponent,
    LayersComponent,
  ],
  templateUrl: './location-edit-layout.component.html',
  styleUrl: './location-edit-layout.component.scss',
})
export class LocationEditLayoutComponent {}
