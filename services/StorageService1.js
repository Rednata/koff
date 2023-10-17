export class StorageService {
  constructor(key) {
    this.key = key;
  }

  get() {
    return localStorage.getItem(key);
  }

  // deleteAccessKey() {
  //   localStorage.remove('accessKey');
  // }

  set(value) {
    localStorage.setItem(this.key, value);
  }
}