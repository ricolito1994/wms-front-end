import { ApiService } from "./ApiService";
import { UNIT_ROUTE_TEMPLATE } from "@/constants/api";

export class UnitRouteTemplateService extends ApiService {
    unitRoute: any;

    constructor(accessToken: string|null) {
        super(accessToken);
        this.unitRoute = UNIT_ROUTE_TEMPLATE;
    }

    async index (data: any, config: any) {
        try {
            let response = await this.requestV2<any>(this.unitRoute.index(), {
                data:data
            }, config)
            return response?.data;
        } catch (e: any) {
            throw e;
        }
    }

    async store(data: any, config?: any) {
        try {
            let response = await this.requestV2<any>(this.unitRoute.post(), {
                data:data
            }, config)
            return response?.data;
        } catch (e: any) {
            throw e;
        }
    }
}