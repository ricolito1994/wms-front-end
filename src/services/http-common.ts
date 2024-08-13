import axios from 'axios';
import type { AxiosInstance } from 'axios';
export class HttpCommons {

  accessToken: string;
  apiClient: AxiosInstance;
  baseUrl: String | any;
  abortControllerSignal: any|null;

  constructor (accessToken:string) {
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

  public setAbortControllerSignal (signal:any|null) {
    if (!signal) throw "what? where is your signal?"
    this.abortControllerSignal = signal;
  }

}
