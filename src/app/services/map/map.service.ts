import { Injectable } from '@angular/core';
import { Feature, Map, View } from 'ol';
import { Select } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import { Cluster } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import { BehaviorSubject } from 'rxjs';
import { OlstylesService } from './olstyles.service';
import { Geometry } from 'ol/geom';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  //private map!: Map;

  private mapSubject = new BehaviorSubject<Map | null>(null);
  map$ = this.mapSubject.asObservable();
  private selectInteraction: Select;
  private featureLayer: VectorLayer;

  constructor(private olStylesService: OlstylesService) {
    this.featureLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 100,
      properties: {
        name: 'features',
      },
      style: this.olStylesService.getStyle(),
    });
    this.selectInteraction = new Select();
    this.selectInteraction.set('title', 'Selección');
  }

  setMap(map: Map): void {
    map.addLayer(this.featureLayer);
    this.mapSubject.next(map);
  }

  getMap(): Map | null {
    return this.mapSubject.value;
  }

  getSelectInteraction(): Select {
    return this.selectInteraction;
  }

  getFeatureLayer(): VectorLayer {
    return this.featureLayer;
  }

  getLayerByName(name: string): any {
    const map = this.getMap();
    if (!map) return null;

    const layers = map.getLayers().getArray();
    return layers.find((layer) => layer.get('name') === name);
  }

  createClusterLayer(
    clusterSource: Cluster<Feature<Geometry>>
  ): AnimatedCluster {
    return new AnimatedCluster({
      source: clusterSource,
      style: this.olStylesService.getClusterStyle,
      properties: {
        name: 'Cluster',
      },
    } as any);
  }
}
