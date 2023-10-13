import { API_URL } from "../const";
import axios from 'axios';

export class StorageService {
  #apiURL = API_URL;

  constructor() {
    this.accessKey = this.getAccessKey();
  }

  async getAccessKey() {    
    try {
      if (!this.accessKey) {         
        const response = await axios.get(`${this.#apiURL}api/users/accessKey`);           
        this.accessKey = response.data.accessKey;
        
        localStorage.setItem('accessKey', this.accessKey);
        console.log(this.accessKey);
      }     

    } catch (error) {
      console.log(error);
    }
  }

  // getAccessKey() {
  //   return localStorage.getItem('accessKey');
  // }

  delAccessKey() {
    localStorage.remove('accessKey');
  }

  setAccessKey(accessKey) {
    localStorage.getItem('accessKey', accessKey);
  }
}