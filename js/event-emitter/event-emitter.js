class EventEmitter {
  events = {};

  constructor() {}

  on(eventName, handler) {
    this.events[eventName]
      ? this.events[eventName].push(handler)
      : (this.events[eventName] = [handler]);
  }

  off(eventName, handler) {
    if (!handler) {
      this.events[eventName] = [];
    } else {
      this.events[eventName] = this.events[eventName].filter(
        (it) => it !== handler,
      );
    }
  }

  emit(eventName, ...payload) {
    const handlers = this.events[eventName];
    if (!handlers) throw new Error("handler not found");

    handlers.forEach((it) => it(...payload));
  }
}

module.exports = {
  EventEmitter,
};
