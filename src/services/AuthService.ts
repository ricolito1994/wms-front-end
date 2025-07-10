import { HttpCommons } from "./http-common";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_WMS_BASE_URL;
class AuthService extends HttpCommons {
    constructor (accessToken: any) {
        super(accessToken);
    }
    async login (payload:any) {
        try {
            const response = await this.apiClient.post(`${BASE_URL}/auth/login`, payload);
            return response.data;
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }
    async logout () {
        try {
            const response = await this.apiClient.post(`${BASE_URL}/auth/logout`);
            return response.data;
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }

    async refreshToken () {
        try {
            const response = await this.apiClient.post(`${BASE_URL}/auth/refresh`);
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
export default AuthService;