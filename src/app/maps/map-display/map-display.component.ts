import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Defs, Shape, Svg, SVG } from '@svgdotjs/svg.js';
import { defineHex, Grid, hexToPoint, rectangle } from 'honeycomb-grid';

import { MapData, MapEntry } from '../maps.model';

// Some Docs:
// https://svgjs.dev/docs/3.0/
// https://abbekeultjes.nl/honeycomb/
// https://www.redblobgames.com/grids/hexagons/

// eslint-disable-next-line @typescript-eslint/naming-convention
const Hex = defineHex({ dimensions: 30, origin: 'topLeft' });
const hexTemplate = new Grid(Hex, rectangle({ width: 1, height: 1 })).toArray()[0];

@Component({
  selector: 'lxs-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss'],
})
export class MapDisplayComponent implements OnChanges, AfterViewInit {

  @Input() mapEntry!: MapEntry;
  @Input() mapData!: MapData;

  @ViewChild('map') mapRef!: ElementRef<HTMLDivElement>;

  private grid = new Grid(Hex);
  mapWidth = 0;
  mapHeight = 0;
  private didInit = false;
  private svg!: Svg;
  private svgHexBorder!: Shape;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mapData) {
      const change = changes.mapData;
      if (this.changeShouldRecreateGrid(change.currentValue, change.previousValue)) {
        this.updateMapGrid();
      } else if (this.changeShouldRenderGrid(change.currentValue, change.previousValue)) {
        this.renderGrid();
      }
    }
  }

  ngAfterViewInit(): void {
    this.setupSvg();
    this.renderGrid();
    this.didInit = true;
  }

  private changeShouldRecreateGrid(newData: MapData, previousData?: MapData): boolean {
    return !previousData
    || newData.gridColumns !== previousData.gridColumns
    || newData.gridRows !== previousData.gridRows
    || newData.gridOffsetX !== previousData.gridOffsetX
    || newData.gridOffsetY !== previousData.gridOffsetY;
  }

  private changeShouldRenderGrid(newData: MapData, previousData?: MapData): boolean {
    return this.didInit && (!previousData
      || newData.backgroundImage !== previousData.backgroundImage);
  }

  private updateMapGrid(): void {
    this.grid = new Grid(Hex, rectangle({
      width: this.mapData.gridColumns,
      height: this.mapData.gridRows,
      start: { col: this.mapData.gridOffsetX, row: this.mapData.gridOffsetY },
    }));
    this.mapWidth = this.grid.pixelWidth;
    this.mapHeight = this.grid.pixelHeight;
    if (this.didInit) {
      this.renderGrid();
    }
  }

  private setupSvg(): void {
    this.svg = SVG().addTo(this.mapRef.nativeElement).size('100%', '100%');

    this.svgHexBorder = this.svg.defs().polygon(hexTemplate.corners.map(({ x, y }) => `${x},${y}`).join(' '))
      .id('svgHexBorder')
      .fill('none')
      .stroke({ width: 1, color: '#333'});
  }

  private renderGrid(): void {
    this.svg.children().forEach((c) => {
      if (!(c instanceof Defs)) {
        c.remove();
      }
    });
    const outline = this.svg.rect(this.mapWidth, this.mapHeight)
      .fill('none')
      .stroke({ width: 2, color: '#333' });
    this.svg.add(outline);

    this.grid.forEach((h) => {
      const point = hexToPoint(h);
      point.x -= hexTemplate.width * this.mapData.gridOffsetX;
      point.y -= 0.75 * hexTemplate.height * this.mapData.gridOffsetY;
      if (this.mapData.gridRows === 1 && (Math.abs(this.mapData.gridOffsetY) % 2) === 1) {
        point.x -= 0.5 * hexTemplate.width;
      }

      const tile = this.svg.nested()
        .id(`map_${h.q}_${h.r}`)
        .size(hexTemplate.width, hexTemplate.height)
        .x(point.x - h.width / 2)
        .y(point.y - h.height / 2);

      tile.use(this.svgHexBorder);

      const text = this.svg.text(`${h.col},${h.row}`)
        .center(hexTemplate.width / 2, hexTemplate.height / 2)
        .font({ fill: '#555' });
      tile.add(text);
    });
  }

  onClickGrid(event: MouseEvent): void {
    const mapRect = this.mapRef.nativeElement.getBoundingClientRect();
    let x = event.clientX - mapRect.left + hexTemplate.width * this.mapData.gridOffsetX;
    const y = event.clientY - mapRect.top + 0.75 * hexTemplate.height * this.mapData.gridOffsetY;
    if (this.mapData.gridRows === 1 && (Math.abs(this.mapData.gridOffsetY) % 2) === 1) {
      x += 0.5 * hexTemplate.width;
    }
    const hex = this.grid.pointToHex({ x, y }, { allowOutside: false });
    console.log(hex, 'Display:', hex?.col, hex?.row);
  }
}
