import { HttpCommons } from "./http-common";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_WMS_BASE_URL;
class UserService extends HttpCommons {
    humanResource : string = "employee";
    auth: string = "auth";
    constructor (accessToken:any) {
        super(accessToken)
    }
    async myself () {   
        try {
            const response = await this.apiClient.get(`${this.baseUrl}/${this.auth}/me`);
            return response.data;
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }

    async addUser (payload: any) {
        try {
            const response = await this.apiClient.post(`${this.baseUrl}/${this.humanResource}/create`, payload);
            return response.data;
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }

    async updateUser (userId:number, payload: any) {
        try {
            const response = await this.apiClient.post(`${this.baseUrl}/${this.humanResource}/${userId}/update`, payload);
            return response.data;
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }

    async getUser (
        payload: any | object | null = null,
        page : any | number | null = null,
        userId : any | null = null, 
    ) {
        try {
            let endpoint = userId ? `${userId}` : `show`;
            let pageUrl = page ? `?page=${page}` : ``;
            let url = `${this.baseUrl}/${this.humanResource}/${endpoint}${pageUrl}`;
            if (this.abortControllerSignal) {
                const response = await this.apiClient.get(url, {
                    params: payload ? payload : {},
                    signal : this.abortControllerSignal
                });
                return response.data;
            }

            const response = await this.apiClient.get(url, payload ? {
                params: payload
            } : {});
            return response.data;
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }
}
export default UserService;