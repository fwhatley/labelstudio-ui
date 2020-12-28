export class ApiDataModel {
    public apiType: string;
    public apiName: string;
    public apiKey: string;
    public method: string;
    public path: string;

    public constructor(values: any = {}) {
        this.apiType = values.apiType || '';
        this.apiName = values.apiName || '';
        this.apiKey = values.apiKey || '';
        this.method = values.method || '';
        this.path = values.path || '';
    }
}
