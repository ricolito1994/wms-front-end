import { HttpCommons } from "./http-common";
const BASE_URL = process.env.REACT_APP_WMS_BASE_URL;
class UserService extends HttpCommons {
    constructor (accessToken:any) {
        super(accessToken)
    }
    async myself () {
        try {
            const response = await this.apiClient.get(`${BASE_URL}/auth/me`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default UserService;