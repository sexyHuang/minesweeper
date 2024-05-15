export class EventBus {
  private _listeners: Record<string, Function[]> = {};

  on(event: string, listener: Function) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(listener);
  }

  off(event: string, listener: Function) {
    if (!this._listeners[event]) {
      return;
    }
    this._listeners[event] = this._listeners[event].filter(
      (l) => l !== listener
    );
  }

  emit(event: string, ...args: any[]) {
    if (!this._listeners[event]) {
      return;
    }
    this._listeners[event].forEach((l) => l(...args));
  }
  once(event: string, listener: Function) {
    const fn = (...args: any[]) => {
      listener(...args);
      this.off(event, fn);
    };
    this.on(event, fn);
  }
}
