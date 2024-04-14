import { HttpCommons } from "./http-common";
const BASE_URL = process.env.REACT_APP_WMS_BASE_URL;
class AuthService extends HttpCommons {
    constructor (accessToken: any) {
        super(accessToken);
    }
    async login (payload:any) {
        try {
            const response = await this.apiClient.post(`${BASE_URL}/auth/login`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async logout () {
        try {
            const response = await this.apiClient.post(`${BASE_URL}/auth/logout`);
            return response.data;
        } catch (error) {
            throw error;
        } 
    }

    async refreshToken () {
        try {
            const response = await this.apiClient.post(`${BASE_URL}/auth/refresh`);
            return response.data;
        } catch (error) {
            throw error;
        } 
    }
}
export default AuthService;