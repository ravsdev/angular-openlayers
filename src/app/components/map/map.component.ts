import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, View } from 'ol';
import { Group } from 'ol/layer';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    const map = new Map({
      target: this.mapContainer.nativeElement,
      view: new View({
        center: [-526368.4805962183, 5109003.898885348],
        zoom: 17,
        minZoom: 10,
        extent: [
          -547614.1414098484, 5087116.366702362, -512631.5984668575,
          5133946.021943647,
        ],
      }),
    });
    this.mapService.setMap(map);
    /*

    if (this.features) {
      this.mapService.getFeatures().subscribe((data) => {
        const featuresSource = new GeoJSON().readFeatures(data, {
          featureProjection: 'EPSG:3857',
          dataProjection: 'EPSG:4326',
        });
        console.log(data);
        const clusterSource = new Cluster({
          distance: 50,
          minDistance: 11,
          source: new VectorSource({
            features: featuresSource.filter(
              (f) => f.getGeometry()!.getType() === 'Point'
            ),
          }),
        });
        clusterLayer = this.mapService.createClusterLayer(clusterSource);
        this.map.addLayer(clusterLayer);
        const selectCluster = new SelectCluster({});
        this.map.addInteraction(selectCluster);
        //featureLayer.getSource()?.addFeatures(featuresSource);
      });
    }

    const layerSwitcher = this.mapService.createLayerSwitcher();
    layerSwitcher.setHeader('Capas');
    this.map.addControl(layerSwitcher);*/
  }
}
