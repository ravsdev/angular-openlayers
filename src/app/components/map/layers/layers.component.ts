import { AfterViewInit, Component } from '@angular/core';
import { Group } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import { TileArcGISRest, XYZ, OSM, WMTS, ImageTile } from 'ol/source';
import { MapService } from '../../../services/map/map.service';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { get as getProjection, ProjectionLike } from 'ol/proj';
import { getWidth, getTopLeft } from 'ol/extent';
import { WmtsLayerComponent } from './wmts-layer/wmts-layer.component';
import { Options as WMTSOptions } from 'ol/source/WMTS';
@Component({
  selector: 'map-layers',
  standalone: true,
  imports: [WmtsLayerComponent],
  template: `<app-wmts-layer
    [layerData]="ignBase"
    [properties]="{ name: 'Base', baseLayer: true }"
    (wmtsLayer)="addLayer($event)"
  />`,
})
export class LayersComponent implements AfterViewInit {
  readonly ignBase: Partial<WMTSOptions> = {
    url: 'https://www.ign.es/wmts/ign-base',
    matrixSet: 'GoogleMapsCompatible',
    format: 'image/png',
    layer: 'IGNBaseTodo-nofondo',
    projection: 'EPSG:3857',
  };
  private baseMapServiceUrl =
    'https://www10.ava.es/arcgisva/rest/services/CallejeroVA/base/MapServer';

  private cartoDBUrl =
    'https://d.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

  private agapitoMapServiceUrl =
    'https://www10.ava.es/arcgisva/rest/services/CallejeroVA/1901_Agapito/MapServer';

  private baseLayers: Group;
  private historic: TileLayer;

  constructor(private mapService: MapService) {
    const baseCarto = this.createBaseCartoLayer();
    const baseOSM = this.createBaseOSM();
    this.historic = this.createHistoricLayer();

    this.baseLayers = new Group({
      layers: [
        baseCarto,
        baseOSM,
        new TileLayer({
          source: new TileArcGISRest({
            url: this.baseMapServiceUrl,
          }),
          visible: false,
          properties: { name: 'Callejero', baseLayer: true },
        }),
      ],
      properties: { name: 'Base', openInLayerSwitcher: true },
    });
  }

  ngAfterViewInit(): void {
    this.mapService.map$.subscribe((map) => {
      if (map) {
        map.addLayer(this.baseLayers);
        map.addLayer(this.historic);
      }
    });
  }

  addLayer(wmtsLayer: TileLayer) {
    this.baseLayers.getLayers().push(wmtsLayer);
  }

  createBaseCartoLayer(): TileLayer {
    return new TileLayer({
      source: new XYZ({
        url: this.cartoDBUrl,
      }),
      visible: false,
      properties: { name: 'Voyager', baseLayer: true },
    });
  }

  createBaseOSM(): TileLayer {
    return new TileLayer({
      source: new OSM(),
      visible: false,
      properties: { name: 'OSM', baseLayer: true },
    });
  }

  createHistoricLayer(): TileLayer {
    return new TileLayer({
      source: new TileArcGISRest({
        url: this.agapitoMapServiceUrl,
      }),
      visible: false,
      properties: { name: 'Histórico' },
    });
  }
}
