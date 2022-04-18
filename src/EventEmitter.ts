class EventEmitter {
  events: any;

  constructor() {
    this.events = {};
  }
  on(eventName: string, listener: () => void) {
    if (typeof this.events[eventName] !== 'object') {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
    return () => this.removeListener(eventName, listener);
  }
  removeListener(eventName: string, listener: () => void) {
    if (typeof this.events[eventName] === 'object') {
      const idx = this.events[eventName].indexOf(listener);
      if (idx > -1) {
        this.events[eventName].splice(idx, 1);
      }
    }
  }
  emit(eventName: string, ...args: any) {
    if (typeof this.events[eventName] === 'object') {
      this.events[eventName].forEach((listener: () => void) => listener.apply(this, args));
    }
  }
  once(eventName: string, listener: () => void) {
    const remove = this.on(eventName, (...args: any) => {
      remove();
      listener.apply(this, args);
    });
  }
}

export default EventEmitter;
