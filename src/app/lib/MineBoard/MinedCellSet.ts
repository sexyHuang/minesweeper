export class MinedCellSet {
  private _minedCellSet!: Set<number>;

  private _cols!: number;
  private _rows!: number;
  constructor(
    rows: number,
    cols: number,
    mines: number,
    disablePositions: number[] = []
  ) {
    this._initMinedCellSet(rows, cols, mines, disablePositions);
  }
  private _initMinedCellSet(
    rows: number,
    cols: number,
    mines: number,
    disablePositions: number[] = []
  ) {
    const cellIdxSet = new Set<number>(disablePositions);
    const cellCount = rows * cols;
    this._cols = cols;
    this._rows = rows;

    for (let i = 0; i < mines; i++) {
      let idx = Math.floor(Math.random() * cellCount);
      while (cellIdxSet.has(idx)) {
        idx = Math.floor(Math.random() * cellCount);
      }
      cellIdxSet.add(idx);
    }
    disablePositions.forEach(idx => {
      cellIdxSet.delete(idx);
    });
    this._minedCellSet = cellIdxSet;
  }
  checkMined(idx: number) {
    return this._minedCellSet.has(idx);
  }
  getMineCountAround(idx: number) {
    let count = 0;
    const x = Math.floor(idx / this._cols);
    const y = idx % this._cols;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const _x = x + i;
        const _y = y + j;
        if (_x >= 0 && _x < this._rows && _y >= 0 && _y < this._cols) {
          if (this._minedCellSet.has(_x * this._cols + _y)) {
            count++;
          }
        }
      }
    }
    return count;
  }
}
