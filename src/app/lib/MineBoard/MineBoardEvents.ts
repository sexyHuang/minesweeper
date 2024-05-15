import { EventBus } from '../EventBus';
import { GameStatus } from './constants';

export enum MineBoardEventName {
  FLAGGED_CHANGE = 'flaggedChange',
  GAME_STATUS_CHANGE = 'gameStatusChange'
}

export class MineBoardEvents extends EventBus {
  constructor() {
    super();
  }
  public onFlaggedChange(listener: (flags: number) => void) {
    this.on(MineBoardEventName.FLAGGED_CHANGE, listener);
    return () => {
      this.off(MineBoardEventName.FLAGGED_CHANGE, listener);
    };
  }
  protected emitFlaggedChange(flags: number) {
    this.emit(MineBoardEventName.FLAGGED_CHANGE, flags);
  }

  public onGameStatusChange(listener: (status: GameStatus) => void) {
    this.on(MineBoardEventName.GAME_STATUS_CHANGE, listener);
    return () => {
      this.off(MineBoardEventName.GAME_STATUS_CHANGE, listener);
    };
  }
  protected emitGameStatusChange(status: GameStatus) {
    this.emit(MineBoardEventName.GAME_STATUS_CHANGE, status);
  }
}
