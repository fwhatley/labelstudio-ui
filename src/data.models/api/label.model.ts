export class LabelModel {
    public labelId: string;
    public name: string;
    public userEntered: boolean;

    public constructor(values: any = {}) {
        this.labelId = values.labelId || '';
        this.name = values.name || '';
        this.userEntered = values.user_entered || false;
    }
}
