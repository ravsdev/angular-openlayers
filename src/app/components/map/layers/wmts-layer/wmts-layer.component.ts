import { AfterViewInit, Component, input, output } from '@angular/core';
import { Tile } from 'ol';
import { getWidth, getTopLeft } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { get as getProjection, ProjectionLike } from 'ol/proj';
import { WMTS } from 'ol/source';
import { Options as WMTSOptions } from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { LayerProperties } from '../../../../interfaces/layer-properties';
import { MapService } from '../../../../services/map/map.service';

@Component({
  selector: 'app-wmts-layer',
  imports: [],
  template: ``,
})
export class WmtsLayerComponent implements AfterViewInit {
  readonly layerData = input<Partial<WMTSOptions>>();
  readonly properties = input<LayerProperties>();
  readonly wmtsLayer = output<TileLayer>();

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    const data = this.layerData();

    if (!data) {
      return;
    }

    const projection = getProjection(data['projection'] as ProjectionLike);
    const projectionExtent = projection!.getExtent();
    const size = getWidth(projectionExtent) / 256;
    const resolutions = new Array(19);
    const matrixIds = new Array(19);

    for (let z = 0; z < 19; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }

    const { url, layer, matrixSet, format, style } = data;

    const wmtsLayer: TileLayer = new TileLayer({
      source: new WMTS({
        url,
        layer: layer!,
        matrixSet: matrixSet!,
        format: format!,
        projection: projection!,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds,
        }),
        style: style || 'default',
      }),
      properties: this.properties(),
    });

    this.wmtsLayer.emit(wmtsLayer);
  }
}
