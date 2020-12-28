import {LabelModel} from './label.model';

export class ImageModel {
    private imageId: string;
    private url: string;
    private reviewed: boolean;
    private skipped: boolean;
    public labels: Array<LabelModel>;

    public constructor(values: any = {}) {
        this.imageId = values.imageId || '';
        this.url = values.url || '';
        this.reviewed = values.reviewed || false;
        this.skipped = values.skipped || false;
        this.labels = (values.labels || []).map((item: any) => new LabelModel(item))
    }
}
