import { HttpCommons } from "./http-common";
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
        } catch (error) {
            throw error;
        }
    }

    async addUser (payload: any) {
        try {
            const response = await this.apiClient.post(`${this.baseUrl}/${this.humanResource}/create`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUser (userId:number, payload: any) {
        try {
            const response = await this.apiClient.post(`${this.baseUrl}/${this.humanResource}/${userId}/update`, payload);
            return response.data;
        } catch (error) {
            throw error;
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
        } catch (error) {
            throw error;
        }
    }
}
export default UserService;