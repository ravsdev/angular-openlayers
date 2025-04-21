import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import FontSymbol from 'ol-ext/style/FontSymbol';

@Injectable({
  providedIn: 'root',
})
export class OlstylesService {
  constructor() {}

  getClusterStyle(feature: Feature) {
    const size = feature.get('features').length;
    const styleCache: any = {};
    let style = styleCache[size];
    if (!style) {
      //    const color = size > 10 ? '192,0,0' : size > 5 ? '255,128,0' : '0,128,0'
      const color =
        size > 10 ? '68,34,12' : size > 5 ? '92,45,15' : '120,70,50';

      const radius = Math.max(12, Math.min(size * 0.75, 20));
      const dash = (2 * Math.PI * radius) / 6;
      const lineDash = [0, dash, dash, dash, dash, dash, dash];

      style = styleCache[size] = new Style({
        image: new CircleStyle({
          radius: radius,
          stroke: new Stroke({
            color: `rgba(${color},0.5)`,
            width: 30,
            lineDash: lineDash,
            lineCap: 'butt',
          }),
          fill: new Fill({
            color: `rgba(${color},1)`,
          }),
        }),
        text: new Text({
          text: size.toString(),
          font: 'bold 1rem "Times New Roman", serif',
          // textBaseline: 'top',
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
    }
    return style;
  }

  getPOIStyle() {
    return new Style({
      image: new FontSymbol({
        form: 'circle',
        radius: 20,
        displacement: [0, 20],
        color: '#d50032',
        stroke: new Stroke({ color: '#9c0000', width: 3 }),
        fill: new Fill({
          color: 'black',
        }),
      }),
      stroke: new Stroke({ color: '#9c0000', width: 3 }),
      fill: new Fill({
        color: 'rgba(213, 0, 50, 0.2)',
      }),
    });
  }

  getStyle(): Style {
    return new Style({
      image: new FontSymbol({
        form: 'marker',
        radius: 20,
        displacement: [0, 20],
        color: '#d50032',
        stroke: new Stroke({ color: '#9c0000', width: 3 }),
        fill: new Fill({
          color: 'rgba(213, 0, 50, 0.8)',
        }),
      }),
      stroke: new Stroke({ color: '#9c0000', width: 3 }),
      fill: new Fill({
        color: 'rgba(213, 0, 50, 0.2)',
      }),
    });
  }

  getSelectedStyle(): Style {
    return new Style({
      image: new Icon({
        src: 'assets/poi.svg',
        scale: 0.2,
        anchor: [0.5, 1],
      }),
    });
  }
}
