import { parseJsonWithDates } from './jsonWithDates';

export function createPersistedStorage<T>(key: string, defaultValue: T) {
  function get() {
    const valueJSON = localStorage.getItem(key);

    if (valueJSON === null) {
      return defaultValue;
    }

    return parseJsonWithDates<T>(valueJSON);
  }

  function set(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return {
    get,
    set,
  };
}
