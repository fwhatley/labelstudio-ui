import {ApiDataModel} from "../../data.models/api/api.data.model";

const BASE_URL = 'http://localhost:8000/restservices/reai/v1';
const CONTEXT_PATH = 'api';
const VERSION = 'v1';

class ApiDataService {
    private static instance: ApiDataService;

    public constructor() {
        if (!ApiDataService.instance) {
            ApiDataService.instance = this;
        }
        return ApiDataService.instance;
    }

    public getApiDataByKey(apiKey: string): ApiDataModel|Boolean {
        const dataModel = this.getApiData()[apiKey];
        if (dataModel) {
            dataModel.apiKey = apiKey;
        }
        return dataModel || false;
    }

    get version() {
        return VERSION;
    }

    get contextPath() {
        return CONTEXT_PATH;
    }

    get getFullBaseUrl() {
        return BASE_URL;
        // return `${BASE_URL}/${CONTEXT_PATH}/${VERSION}`;
    }

    private getApiData(): any {
        return {
            getNextImageForReview: new ApiDataModel({
                apiType: 'mS',
                apiName: 'labelStudioService',
                method: 'GET',
                path: `${this.getFullBaseUrl}/labelStudioService/images/next`,
            }),
            getLabels: new ApiDataModel({
                apiType: 'mS',
                apiName: 'labelStudioService',
                method: 'GET',
                path: `${this.getFullBaseUrl}/labelStudioService/labels`,
            }),
            addLabel: new ApiDataModel({
                apiType: 'mS',
                apiName: 'labelStudioService',
                method: 'POST',
                path: `${this.getFullBaseUrl}/labelStudioService/labels`,
            }),
            updateImageLabels: new ApiDataModel({
                apiType: 'mS',
                apiName: 'labelStudioService',
                method: 'GET',
                path: `${this.getFullBaseUrl}/labelStudioService/images/next`,
            }),

        };
    }
}

const instance = new ApiDataService();

// since there are no changing values in this class, let's lock it down
Object.freeze(instance);

export { instance as ApiDataService};
