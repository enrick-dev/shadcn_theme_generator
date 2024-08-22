class localStorageManager {
  static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key) {
    const value = localStorage.getItem(key);
    const finalValue = value ? JSON.parse(value) : null;
    try {
      return JSON.parse(finalValue);
    } catch (e) {
      return finalValue;
    }
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default localStorageManager