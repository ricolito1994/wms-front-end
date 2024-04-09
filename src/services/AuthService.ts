import axios from "axios";
import { apiClient, loginClient } from "./http-common";
const BASE_URL = process.env.REACT_APP_WMS_BASE_URL;
class AuthService {
    async login (payload:any) {
        try {
            const response = await loginClient.post(`${BASE_URL}/auth/login`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async logout () {
        try {
            const response = await apiClient.post(`${BASE_URL}/auth/logout`);
            return response.data;
        } catch (error) {
            throw error;
        } 
    }

}
export default AuthService;