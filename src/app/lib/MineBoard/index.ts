import { Cell } from "../Cell";
import { MineBoardEvents } from "./MineBoardEvents";
import { MinedCellSet } from "./MinedCellSet";
import { GameStatus } from "./constants";

export type MineBoardOptions = {
  rows: number;
  cols: number;
  mines: number;
};

export class MineBoard extends MineBoardEvents {
  private _board: Cell[] = [];
  private _mines!: number;
  private _rows!: number;
  private _cols!: number;
  private _openedCells!: number;
  private _flags: number = 0;
  private _gameStatus: GameStatus = GameStatus.UN_STARTED;

  constructor(options: MineBoardOptions) {
    super();
    this.init(options);
  }

  init({ rows, cols, mines }: MineBoardOptions) {
    this._rows = rows;
    this._cols = cols;
    this._mines = mines;
    this._openedCells = 0;
    this.flags = 0;
    this.gameStatus = GameStatus.UN_STARTED;
    this._board = [];
    for (let i = 0; i < rows * cols; i++) {
      this._board.push(
        new Cell({
          idx: i,
          mined: false,
        })
      );
    }
  }

  private _initMinedCell(positions: number[]) {
    this.gameStatus = GameStatus.PLAYING;
    const minedCellSet = new MinedCellSet(
      this._rows,
      this._cols,
      this._mines,
      positions
    );
    this._board.forEach((cell, idx) => {
      cell.mined = minedCellSet.checkMined(idx);
      cell.minedCount = minedCellSet.getMineCountAround(idx);
    });
  }

  get board() {
    return this._board.map((cell) => cell.toJSON());
  }
  get gameOver() {
    return (
      this._gameStatus === GameStatus.LOSE ||
      this._gameStatus === GameStatus.WIN
    );
  }
  get gameStatus() {
    return this._gameStatus;
  }
  set gameStatus(value: GameStatus) {
    this._gameStatus = value;
    this.emitGameStatusChange(value);
  }
  get flags() {
    return this._flags;
  }
  set flags(value: number) {
    this._flags = value;
    this.emitFlaggedChange(value);
  }
  get openedCells() {
    return this._openedCells;
  }
  getCell(idx: number) {
    return this._board[idx];
  }
  openCell(idx: number): number[] {
    const openedList: number[] = [];
    if (this.gameOver) {
      return openedList;
    }
    const cell = this.getCell(idx);
    if (cell.flagged || cell.opened) {
      return openedList;
    }

    if (this._openedCells === 0) {
      this._initMinedCell([idx]);
    }
    const mined = cell.open();
    openedList.push(idx);
    if (mined) {
      this.gameStatus = GameStatus.LOSE;
      openedList.push(...this._openRest());
      return openedList;
    }
    this._openedCells++;

    if (this._openedCells === this._rows * this._cols - this._mines) {
      this.gameStatus = GameStatus.WIN;
      openedList.push(...this._flaggedRestMines());
    }
    if (cell.minedCount === 0)
      this.travelAround(idx, (cell, idx) => {
        openedList.push(...this.openCell(idx));
      });
    return openedList;
  }
  openAround(idx: number): number[] {
    const openedList: number[] = [];
    if (this.gameOver) {
      return openedList;
    }
    const cell = this.getCell(idx);
    if (!cell.opened || cell.flagged) {
      return openedList;
    }
    let flagCount = 0;

    this.travelAround(idx, (cell) => {
      if (cell.flagged) {
        flagCount++;
      }
    });

    if (flagCount === cell.minedCount) {
      this.travelAround(idx, (cell, idx) => {
        openedList.push(...this.openCell(idx));
      });
    }
    return openedList;
  }
  toggleFlag(idx: number) {
    if (this.gameOver) {
      return [];
    }
    const cell = this.getCell(idx);
    if (cell.opened) {
      return [];
    }
    cell.toggleFlag();
    if (cell.flagged) {
      this.flags++;
    } else {
      this.flags--;
    }
    return [idx];
  }

  travelAround(idx: number, callback: (cell: Cell, idx: number) => void) {
    const x = Math.floor(idx / this._cols);
    const y = idx % this._cols;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i < 0 || i >= this._rows || j < 0 || j >= this._cols) {
          continue;
        }
        const _idx = i * this._cols + j;
        callback(this.getCell(_idx), _idx);
      }
    }
  }
  private _openRest() {
    const result: number[] = [];
    this._board.forEach((cell, idx) => {
      if (!cell.opened) {
        cell.open(true);
        result.push(idx);
      }
    });
    return result;
  }
  private _flaggedRestMines() {
    const result: number[] = [];
    this._board.forEach((cell, idx) => {
      if (cell.mined && !cell.flagged) {
        cell.toggleFlag();
        result.push(idx);
      }
    });
    return result;
  }
}
