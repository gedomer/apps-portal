import axios from 'axios';

axios.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    window.location = '/login'
  }
  return Promise.reject(error);
});

class HTTP {
  API_URL;
  TOKEN;

  constructor() {
    this.API_URL = "http://localhost:8000/api";
    this.TOKEN = null;
  }

  setToken(token) {
    this.TOKEN = token;
  }

  Login(username, password) {
    return this.request('POST', '/login/', { username, password });
  }

  Convert(file) {
    return this.request('POST', '/convert/', { file });
  }

  GetAppsList(){
    return this.request('GET', '/app-list/');
  }

  GetAppDetail(appId) {
    return this.request('GET', `/app-list/${appId}/`);
  }

  request(method, endpoint, data) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.TOKEN !== null) {
      headers['Authorization'] = `Token ${this.TOKEN}`;
    }

    const config = {
      method: method,
      headers,
      timeout: 60000,
    };

    if (method === 'GET') {
      config.params = data;
    } else {
      config.data = data;
    }

    return axios(this.API_URL + endpoint, config);
  }
}

export default new HTTP();
