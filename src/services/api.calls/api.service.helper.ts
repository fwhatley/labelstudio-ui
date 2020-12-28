import {ApiErrorModel} from "../../data.models/api/api.error.model";

class ApiServiceHelper {

    private static instance: ApiServiceHelper;

    public constructor() {
        if (!ApiServiceHelper.instance) {
            ApiServiceHelper.instance = this;
        }
        return ApiServiceHelper.instance;
    }

    getApiErrorModelForEmptyResponse(): ApiErrorModel {
        const apiErrorModel = new ApiErrorModel();
        apiErrorModel.message = 'The API call returned no data. Please make sure the response body contains some data.';
        return apiErrorModel;
    }

    isThereAnyErrorInResponse(res: any): boolean {
        if (!res) return true;
        if (res.hasOwnProperty('code') && res.hasOwnProperty('message')) {
            return true;
        }
        return false;
    }

    addFriendlyErrorMessageToResponse(res: any = {}, messages: any = {}): void {
        res.friendlyMessage = messages[res.status || '500']
    }
}

const instance = new ApiServiceHelper();
export { instance as ApiServiceHelper};
