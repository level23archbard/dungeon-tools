export interface MapEntry {
  id: string;
  name: string;
}

export interface MapData {
  gridColumns: number;
  gridRows: number;
  gridOffsetX: number;
  gridOffsetY: number;
  tiles: Record<string, MapTileData>;
}

export interface MapTileData {

}

export type MapDirection = 'top' | 'right' | 'bottom' | 'left';
