/**
 * 初始化参数
 */
export interface CellOptions {
  mined: boolean;
  minCount?: number;
  idx: number;
}

export class Cell {
  /**
   * 是否有雷
   */
  mined: boolean;

  private _flagged: boolean = false;
  private _opened: boolean = false;
  private _safe: boolean = false;
  /**
   * 周围雷数
   * @param options
   */
  minedCount: number = 0;
  constructor(options: CellOptions) {
    this.mined = options.mined;

    this.minedCount = options.minCount || 0;
  }

  get flagged() {
    return this._flagged;
  }
  toggleFlag() {
    this._flagged = !this._flagged;
  }
  get opened() {
    return this._opened;
  }

  get safe() {
    return this._safe;
  }
  open(safe: boolean = false) {
    if (this._flagged) {
      return;
    }
    this._opened = true;
    this._safe = safe;
    return this.mined;
  }
  setMinedCount(count: number) {
    this.minedCount = count;
  }
  toJSON() {
    return {
      mined: this.mined,
      minedCount: this.minedCount,
      flagged: this.flagged,
      opened: this.opened,
      safe: this.safe,
    };
  }
}
