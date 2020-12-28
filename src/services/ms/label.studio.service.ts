import {ApiErrorModel} from "../../data.models/api/api.error.model";
import {ApiCallService} from "../api.calls/api.call.service";
import {ApiServiceHelper} from "../api.calls/api.service.helper";
import {ImageModel} from '../../data.models/api/image.model';
import {LabelModel} from '../../data.models/api/label.model';

class LabelStudioService {
    private static instance: LabelStudioService;

    public constructor() {
        if (!LabelStudioService.instance) {
            LabelStudioService.instance = this;
        }
        return LabelStudioService.instance;
    }

    private getNextImageForReviewErrorMessages = {
        '400': 'Something went wrong while getting the next image for review. Please ensure you\'ve provided the correct information and try again.',
        '401': 'The current user has insufficient permissions to get the next image for review. Please make sure your permissions are set correctly',
        '404': 'Sorry. We couldn\'t find the next image for review. Please try again.',
        '500': 'Uh oh! Something went wrong while getting the next image for review. Please try again later.',
    };
    public getNextImageForReview(includeSkipped: boolean = false): Promise<ImageModel|ApiErrorModel> {
        return new Promise((resolve, reject) => {
            ApiCallService.callService('getNextImageForReview')
                .then((res: any) => {
                    if (ApiServiceHelper.isThereAnyErrorInResponse(res)) {
                        ApiServiceHelper.addFriendlyErrorMessageToResponse(res, this.getNextImageForReviewErrorMessages)
                        reject(new ApiErrorModel(res));
                    } else {
                        resolve(new ImageModel(res));
                    }
                })
                .catch((err: any) => {
                    ApiServiceHelper.addFriendlyErrorMessageToResponse(err, this.getNextImageForReviewErrorMessages)
                    reject(new ApiErrorModel(err.error));
                });
        });
    }

    private getLabelsErrorMessages = {
        '400': 'Something went wrong while getting the labels. Please ensure you\'ve provided the correct information and try again.',
        '401': 'The current user has insufficient permissions to get the labels. Please make sure your permissions are set correctly',
        '404': 'Sorry. We couldn\'t find the labels. Please try again.',
        '500': 'Uh oh! Something went wrong while getting the labels. Please try again later.',
    };
    public getLabels(): Promise<LabelModel|ApiErrorModel> {
        return new Promise((resolve, reject) => {
            ApiCallService.callService('getLabels')
                .then((res: any) => {
                    if (ApiServiceHelper.isThereAnyErrorInResponse(res)) {
                        ApiServiceHelper.addFriendlyErrorMessageToResponse(res, this.getLabelsErrorMessages)
                        reject(new ApiErrorModel(res));
                    } else {
                        resolve((res || []).map((item: any) => new LabelModel(item)));
                    }
                })
                .catch((err: any) => {
                    ApiServiceHelper.addFriendlyErrorMessageToResponse(err, this.getLabelsErrorMessages)
                    reject(new ApiErrorModel(err.error));
                });
        });
    }

    public addLabel(labelName: string): Promise<LabelModel|ApiErrorModel> {
        return new Promise((resolve, reject) => {
            ApiCallService.callService('addLabel', {name: labelName, userEntered: true})
                .then((res: any) => {
                    if (ApiServiceHelper.isThereAnyErrorInResponse(res)) {
                        ApiServiceHelper.addFriendlyErrorMessageToResponse(res, this.getLabelsErrorMessages)
                        reject(new ApiErrorModel(res));
                    } else {
                        resolve(new LabelModel(res));
                    }
                })
                .catch((err: any) => {
                    ApiServiceHelper.addFriendlyErrorMessageToResponse(err, this.getLabelsErrorMessages)
                    reject(new ApiErrorModel(err.error));
                });
        });
    }
}

const instance = new LabelStudioService();
export { instance as LabelStudioService};
