export class ServiceAccessKey {
  constructor() {
    this.accessKey = this.getAccessKey();
  }

  getAccessKey() {
    return localStorage.getItem('accessKey');
  }

  deleteAccessKey() {
    localStorage.remove('accessKey');
  }

  setAccessKey(accessKey) {
    localStorage.getItem('accessKey', accessKey);
  }
}