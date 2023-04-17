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
  note?: string;
  backgroundImage?: string;
}

export interface MapTileData {
  col: number;
  row: number;
  note?: string;
}

export const isTileIdValid = (id: string): boolean => {
  const parts = id.split('_');
  return parts.length === 2 && Number.isInteger(Number(parts[0])) && Number.isInteger(Number(parts[1]));
};

export const tileIdToCoordinates = (id: string): { row: number; col: number } => {
  const parts = id.split('_');
  return {
    col: Number(parts[0]),
    row: Number(parts[1]),
  };
};
