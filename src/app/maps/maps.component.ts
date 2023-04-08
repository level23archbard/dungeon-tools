import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Defs, Shape, SVG, Svg } from '@svgdotjs/svg.js';
import { defineHex, Direction, fromCoordinates, Grid, hexToPoint, line, rectangle } from 'honeycomb-grid';

// Some Docs:
// https://svgjs.dev/docs/3.0/
// https://abbekeultjes.nl/honeycomb/
// https://www.redblobgames.com/grids/hexagons/

// eslint-disable-next-line @typescript-eslint/naming-convention
const Hex = defineHex({ dimensions: 30, origin: 'topLeft' });
const hexTemplate = new Grid(Hex, rectangle({ width: 1, height: 1 })).toArray()[0];

@Component({
  selector: 'lxs-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapRef!: ElementRef<HTMLDivElement>;

  mapWidth = 0;
  mapHeight = 0;

  private svg!: Svg;
  private svgHexBorder!: Shape;

  // private grid = new Grid(Hex, rectangle({ width: 40, height: 40 }));
  private grid = new Grid(Hex, rectangle({ width: 3, height: 3 }));

  gridColumns = 3;
  gridRows = 3;
  gridOffsetX = 0;
  gridOffsetY = 0;

  constructor() { }

  ngOnInit(): void {
    this.mapWidth = this.grid.pixelWidth;
    this.mapHeight = this.grid.pixelHeight;
  }

  ngAfterViewInit(): void {
    this.setupSvg();
    this.renderGrid();
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
      point.x -= hexTemplate.width * this.gridOffsetX;
      point.y -= 0.75 * hexTemplate.height * this.gridOffsetY;
      if (this.gridRows === 1 && (Math.abs(this.gridOffsetY) % 2) === 1) {
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
    let x = event.clientX - mapRect.left + hexTemplate.width * this.gridOffsetX;
    const y = event.clientY - mapRect.top + 0.75 * hexTemplate.height * this.gridOffsetY;
    if (this.gridRows === 1 && (Math.abs(this.gridOffsetY) % 2) === 1) {
      x += 0.5 * hexTemplate.width;
    }
    const hex = this.grid.pointToHex({ x, y }, { allowOutside: false });
    console.log(hex, 'Display:', hex?.col, hex?.row);
  }

  onAdd(direction: 'left' | 'right' | 'top' | 'bottom'): void {
    let gridKey: 'gridColumns' | 'gridRows';
    let crossKey: typeof gridKey;
    let row: number;
    let col: number;
    let toward: Direction;
    switch (direction) {
    case 'left': case 'right':
      gridKey = 'gridColumns';
      crossKey= 'gridRows';
      row = this.gridOffsetY;
      toward = Direction.S;
      if (direction === 'left') {
        this.gridOffsetX -= 1;
        col = this.gridOffsetX;
      } else {
        col = this[gridKey] + this.gridOffsetX;
      }
      break;
    case 'top': case 'bottom':
      gridKey = 'gridRows';
      crossKey = 'gridColumns';
      col = this.gridOffsetX;
      toward = Direction.E;
      if (direction === 'top') {
        this.gridOffsetY -= 1;
        row = this.gridOffsetY;
      } else {
        row = this[gridKey] + this.gridOffsetY;
      }
      break;
    }
    this.grid = new Grid(Hex, [
      fromCoordinates(...this.grid.toArray()),
      line({ start: { row, col }, direction: toward, length: this[crossKey] }),
    ]);
    this[gridKey] += 1;
    this.mapWidth = this.grid.pixelWidth;
    this.mapHeight = this.grid.pixelHeight;
    this.renderGrid();
  }

  onRemove(direction: 'left' | 'right' | 'top' | 'bottom'): void {
    let axis: 'col' | 'row';
    let value: number;
    switch (direction) {
    case 'left': case 'right':
      if (this.gridColumns <= 1) {return;}
      axis = 'col';
      this.gridColumns -= 1;
      value = direction === 'left' ? 0 : this.gridColumns;
      value += this.gridOffsetX;
      if (direction === 'left') {
        this.gridOffsetX += 1;
      }
      break;
    case 'top': case 'bottom':
      if (this.gridRows <= 1) {return;}
      axis = 'row';
      this.gridRows -= 1;
      value = direction === 'top' ? 0 : this.gridRows;
      value += this.gridOffsetY;
      if (direction === 'top') {
        this.gridOffsetY += 1;
      }
      break;
    }
    this.grid = new Grid(Hex, fromCoordinates(...this.grid.toArray().filter((h) => h[axis] !== value)));
    this.mapWidth = this.grid.pixelWidth;
    this.mapHeight = this.grid.pixelHeight;
    this.renderGrid();
  }
}
