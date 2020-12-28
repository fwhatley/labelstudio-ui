export class ApiErrorModel {
    public code: string;
    public message: string;
    public method: string;
    public attributes: any[] | any;
    public vendor: string;
    public status: number;

    public constructor(values: any = {}) {
        this.code = values.code || '';
        this.message = values.message || '';
        this.method = values.method || '';
        this.attributes = values.attributes || [];
        this.vendor = values.vendor || '';
        this.status = values.status || 0;
    }
}
