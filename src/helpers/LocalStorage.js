const LocalStorage = {
  set(name, value) {
    if (!value) {
      return;
    }

    localStorage[name] = JSON.stringify(value);
  },

  get(name) {
    let item = localStorage[name];

    if (!item) {
      return;
    }

    return JSON.parse(item);
  }
}

export default LocalStorage;

