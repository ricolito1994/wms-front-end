import { ApiService } from "./ApiService";
import { WASTE_MANAGEMENT } from "constants/api";

export class WasteManagementService extends ApiService 
{
    wms: any;

    constructor (accessToken: string|null) {
        super (accessToken)
        this.wms = WASTE_MANAGEMENT;
    }

    async getWMS () {
        try {
            let response = await this.requestV2<any>(this.wms.get(), {});
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async storeWMS (data: any, config?: any) {
        try {
            let response = await this.requestV2<any>(this.wms.post(), {
                data: data
            }, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }
}