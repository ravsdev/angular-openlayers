import { AfterViewInit, Component } from '@angular/core';
import EditBar from 'ol-ext/control/EditBar';
import Toggle from 'ol-ext/control/Toggle';
import FontSymbol from 'ol-ext/style/FontSymbol';
import { Draw } from 'ol/interaction';
import VectorSource from 'ol/source/Vector';
import { Style, Stroke, Fill } from 'ol/style';
import { MapService } from '../../../services/map/map.service';
import { OlstylesService } from '../../../services/map/olstyles.service';
import { Point } from 'ol/geom';

@Component({
  selector: 'map-editbar',
  imports: [],
  template: '',
})
export class EditbarComponent implements AfterViewInit {
  constructor(
    private mapService: MapService,
    private olStylesService: OlstylesService
  ) {}

  ngAfterViewInit(): void {
    this.mapService.map$.subscribe((map) => {
      if (map) {
        const editBar = this.createEditBar(
          this.mapService.getFeatureLayer().getSource() as VectorSource
        );

        map.addControl(editBar);
      }
    });
  }

  createEditBar(source: VectorSource): EditBar {
    const editbar: EditBar = new EditBar({
      className: 'edit-bar',
      interactions: {
        Select: this.mapService.getSelectInteraction(),
        DrawLine: 'Línea',
        DrawPoint: 'Punto',
        Split: false,
        DrawRegular: false,
        Info: false,
      },
      source,
    });
    const interaction = new Draw({
      type: 'Point',
      source,
    });
    const toggle = new Toggle({
      html: '<i class="pi pi-bullseye" ></i>',
      className: 'edit',
      title: 'Point',
      interaction: interaction,
      onToggle: function (active) {
        console.log(active);
        //$("#info").text("Edition is " + (active ? "activated" : "deactivated"));
      },
    });
    editbar.addControl(toggle);
    interaction.on('drawend', (e) => {
      const feature = source
        .getFeatures()
        .find((feature) => feature.get('POI'));
      if (feature) source.removeFeature(feature);
      e.feature.set('POI', true);
      e.feature.setStyle(this.olStylesService.getPOIStyle());
      e.feature.set('name', 'marker');
      //console.log(e.feature.getGeometry() as Point.getCoordinates());
      const coordinates = (e.feature.getGeometry() as Point).getCoordinates();
      console.log(coordinates);
    });

    return editbar;
  }
}
