import { HttpCommons } from "./http-common";
const BASE_URL = process.env.REACT_APP_WMS_BASE_URL;
export class UnitService extends HttpCommons {
    constructor (accessToken: any) {
        super(accessToken);
    }
    async addUnit (payload:any) {
        try {
            const response = await this.apiClient.post(`${BASE_URL}/unit/create`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async editUnit (payload:any) {
        try {
            const response = await this.apiClient.post(`${BASE_URL}/unit/update`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getUnit (payload:any, page:any = null, unitId: any = null) {
        try {
            let url = `${BASE_URL}/unit/show${unitId ? '/'+unitId : ''}${page ? '?page='+page : ''}`;
            const response = await this.apiClient.get(url, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}