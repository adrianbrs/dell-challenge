export class EventEmitter {
  /** @type {Map<string, Set<(...args: any[]) => any>>} */
  #listeners = new Map();

  /**
   *
   * @param {string} event
   * @param {(...args: any[]) => any} listener
   */
  on(event, listener) {
    const listeners = this.#listeners.get(event) || new Set();
    listeners.add(listener);
    this.#listeners.set(event, listeners);
    return this;
  }

  /**
   *
   * @param {string} [event]
   * @param {(...args: any[]) => any} [listener]
   */
  off(event, listener) {
    if (!event) {
      this.#listeners.clear();
      return this;
    }

    const listeners = this.#listeners.get(event);
    if (!listeners) {
      return this;
    }

    if (listener) {
      listeners.delete(listener);
    } else {
      listeners.clear();
      this.#listeners.delete(event);
    }

    return this;
  }

  /**
   *
   * @param {string} event
   * @param  {...any} args
   */
  emit(event, ...args) {
    const listeners = this.#listeners.get(event);
    if (!listeners) {
      return this;
    }
    listeners.forEach((listener) => listener(...args));
    return this;
  }
}
