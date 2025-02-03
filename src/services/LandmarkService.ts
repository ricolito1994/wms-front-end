import { HttpCommons } from "./http-common";

class LandmarkService extends HttpCommons {
    constructor (accessToken: any) {
        super(accessToken);
    }

    async create (type: string, payload: any) {
        try {
            if (this.abortControllerSignal) {
                const response = await this.apiClient.post(`${this.baseUrl}/landmark/${type}`, 
                    payload,
                    {'signal' : this.abortControllerSignal}
                );
                return response.data;
            }
            const response = await this.apiClient.post(`${this.baseUrl}/landmark/${type}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async update (type: string, landmarkId: any,  payload: any) {
        try {
            if (this.abortControllerSignal) {
                const response = await this.apiClient.patch(`${this.baseUrl}/landmark/${landmarkId}/${type}`,
                    payload,
                    {'signal' : this.abortControllerSignal}
                );
                return response.data;
            }
            const response = await this.apiClient.patch(`${this.baseUrl}/landmark/${landmarkId}/${type}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async show (type: string, payload: any, page: any|null = null) {
        try {
            let pageParam = page ? '?page='+page : '';
            if (this.abortControllerSignal) {
                const response = await this.apiClient.get(`${this.baseUrl}/landmark/${type}${pageParam}`, {
                    params : payload,
                    signal : this.abortControllerSignal
                });
                return response.data;
            }
            const response = await this.apiClient.get(`${this.baseUrl}/landmark/${type}${pageParam}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async get (type: string, landmarkId: any) {
        try {
            const response = await this.apiClient.get(`${this.baseUrl}/landmark/${landmarkId}/${type}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete (type: string, landmarkId: any) {
        try {
            const response = await this.apiClient.delete(`${this.baseUrl}/landmark/${landmarkId}/${type}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default LandmarkService;