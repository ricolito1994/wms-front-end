import { HttpCommons } from "./http-common";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_WMS_BASE_URL;
export class UnitService extends HttpCommons {
    constructor (accessToken: any) {
        super(accessToken);
    }
    async addUnit (payload:any) {
        try {
            const response = await this.apiClient.post(`${this.baseUrl}/unit/create`, payload);
            return response.data;
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }
    async editUnit (payload:any) {
        try {
            const response = await this.apiClient.post(`${this.baseUrl}/unit/update`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getUnit (payload:any, page:any = null, unitId: any = null) {
        try {
            let url = `${BASE_URL}/unit/show${unitId ? '/'+unitId : ''}${page ? '?page='+page : ''}`;
            const response = await this.apiClient.get(url, {params : payload});
            return response.data;
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }

    async saveCrew (payload:any, unitId:any) {
        try {
            let url = `${BASE_URL}/employee/crew/${unitId}`;
            const response = await this.apiClient.post(url, payload);
            return response.data;
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }

    async getCrew (unitId:any) {
        try {
            let url = `${BASE_URL}/employee/crew/${unitId}`;
            const response = await this.apiClient.get(url);
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