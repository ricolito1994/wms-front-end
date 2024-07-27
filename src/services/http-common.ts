import axios from 'axios';
import type { AxiosInstance } from 'axios';
export class HttpCommons {
  accessToken: string;
  apiClient: AxiosInstance;
  baseUrl: String | any;
  constructor(accessToken:string) {
    this.accessToken = accessToken;
    this.apiClient = this.accessToken === '' ? this.getLoginClient() : this.getApiClient();
    this.baseUrl = process.env.REACT_APP_WMS_BASE_URL
  }

  protected getLoginClient () : AxiosInstance {
    return axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  protected getApiClient () : AxiosInstance {
    return axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
        Accept: 'application/json',
      },
    });
  }
}
