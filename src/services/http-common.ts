import axios from 'axios';
import type { AxiosInstance } from 'axios';
export class HttpCommons {
  accessToken: string;
  apiClient: AxiosInstance;
  constructor(accessToken:string) {
    this.accessToken = accessToken;
    if (this.accessToken === '') this.apiClient = this.getLoginClient();
    else this.apiClient = this.getApiClient();
  }

  protected getLoginClient () : AxiosInstance {
    return axios.create({
      baseURL: process.env.REACT_APP_WMS_BASE_URL,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  protected getApiClient () : AxiosInstance {
    return axios.create({
      baseURL: process.env.REACT_APP_WMS_BASE_URL,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
        Accept: 'application/json',
      },
    });
  }
}
