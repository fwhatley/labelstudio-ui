import * as React from 'react';
import {useEffect} from "react";

import {UiSearchBoxWithButton} from '../../components/ui/ui.search.box.with.button/ui.search.box.with.button';
import {LabelStudioService} from "../../services/ms/label.studio.service";
import {ApiErrorModel} from "../../data.models/api/api.error.model";
import {LabelModel} from '../../data.models/api/label.model';
import {ImageModel} from '../../data.models/api/image.model';

import {INITIAL_STATE} from './image.label.state';
import './image.label.view.scss';
import {UiInput} from '../../components/ui/ui.input/ui.input';
import {UiButton} from '../../components/ui/ui.button/ui.button';

type AppProps = {
};

export const ImageLabelView = (appProps: AppProps) => {
    const {
    } = appProps;

    const [loading, setLoading] = React.useState(true);
    const [loadingError, setLoadingError] = React.useState('');
    const [loadingImage, setLoadingImage] = React.useState(true);
    const [imageModel, setImageModel] = React.useState(undefined);
    const [labels, setLabels] = React.useState([]);
    const [imageLabelState, setImageLabelState] = React.useState(INITIAL_STATE);

    useEffect(() => {
        getLabelsAndFirstImage();
    }, []);

    const getLabelsAndFirstImage = () => {
        setLoading(true);
        let allLabels: Array<LabelModel>= [];
        LabelStudioService.getLabels().then((res: any) => {
            setLabels(res);
            allLabels = res;
        }).then(() => {
            return getNextImageAsPromise();
        }).then((res) => {
            setLoading(false);
            setInitialCheckedLabels(res as ImageModel, allLabels);
        }).catch((err) => {
            setLoading(false);
            console.log(err);
        });
    }

    const setInitialCheckedLabels = (imgModel: ImageModel, allLabels: Array<LabelModel>) => {
        const options: any = [];
        const labelIdsDetectedInImage: Array<string> = imgModel.labels.map((label: LabelModel) => label.labelId);
        allLabels.forEach((label: LabelModel) => {
            const option = {
                label: label.name,
                value: labelIdsDetectedInImage.includes(label.labelId),
                name: label.name,
                id: label.name,
            }
            options.push(option);
        });
        setImageLabelState({...imageLabelState, prePopulatedLabels: options})
    }

    const getNextImageAsPromise = () => {
        setLoadingImage(true);
        return new Promise((resolve, reject) => {
            LabelStudioService.getNextImageForReview().then((res: any) => {
                setImageModel(res);
                setLoadingImage(false);
                resolve(res);
            }).catch((err: ApiErrorModel) => {
                console.log(err);
                setLoadingError('Error loading image. Try again later');
                setLoadingImage(false);
                reject(err);
            });
        });
    }

    const getNextImage = () => {
        setLoadingImage(true);
        LabelStudioService.getNextImageForReview().then((res: any) => {
            setImageModel(res);
            setLoadingImage(false);
        }).catch((err: ApiErrorModel) => {
            console.log(err);
            setLoadingError(JSON.stringify(err));
            setLoadingImage(false);
        });
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id
        updateAutoDetectedLabelsOnChange(Boolean(value), id);
    }

    const updateAutoDetectedLabelsOnChange = (value: boolean, id: string) => {
        const prePopulatedLabels = imageLabelState.prePopulatedLabels.map((opt) => {
            if (opt.id === id) {
                opt.value = value;
            }
            return opt;
        });
        setImageLabelState({...imageLabelState, prePopulatedLabels})
    }

    const onChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setImageLabelState({...imageLabelState, searchTerm: value});
    }

    const addLabel = () => {
        const foundOption: any = imageLabelState.prePopulatedLabels.find((opt) => opt.id === imageLabelState.searchTerm);
        if (foundOption || !imageLabelState.searchTerm) {
            const prePopulatedLabels = [...imageLabelState.prePopulatedLabels];
            if (foundOption) {
                imageLabelState.prePopulatedLabels.map((opt) => {
                    if (foundOption.id === opt.id) {
                        foundOption.value = true;
                    }
                })
            }
            setImageLabelState({...imageLabelState, prePopulatedLabels, searchTerm: ''});
            return;
        }

        LabelStudioService.addLabel(imageLabelState.searchTerm).then((res) => {
            const option = {
                label: imageLabelState.searchTerm,
                value: true,
                name: imageLabelState.searchTerm,
                id: imageLabelState.searchTerm,
            }
            const prePopulatedLabels = [...imageLabelState.prePopulatedLabels, option];
            setImageLabelState({...imageLabelState, prePopulatedLabels, searchTerm: ''});
        }).catch((err: any) => {
            console.log(err);
        });
    };

    const onSubmit = () => {
        
    };

    if (loading || loadingImage) {
        return null;
    }
    const allLabelsBeingAdded = imageLabelState.prePopulatedLabels.filter((opt) => opt.value);

    return (
        <div className={'container image-label-view mb-5'}>
            <h1 className={'py-3'}>Image Labeling</h1>

            <div className={'row pb-3'}>
                <div className="col-12 col-sm-6 justify-content-center">
                    <button className={'btn btn-outline-secondary mx-2'}>Previous</button>
                    <button className={'btn btn-outline-secondary mx-2'}>Next</button>
                </div>
            </div>

            <div className={'row pb-3'}>
                <div className="col-12 col-lg-10 col-xl-8">
                    <img className='w-100' src={imageModel.url} alt=""/>
                </div>
            </div>
            <div className={'row pb-3'}>
                <div className={'col-12 col-sm-6 col-md-8 col-lg-9'}>
                    <h2>Popular Labels</h2>
                    { imageLabelState.prePopulatedLabels.map((opt) =>
                        <span key={opt.name} className={'pr-3'}>
                            <label>
                                <UiInput
                                    className={'checkbox'}
                                    type="checkbox"
                                    id={opt.id}
                                    name={opt.name}
                                    checked={opt.value}
                                    onChange={onInputChange}
                                />
                                {opt.label}
                            </label>
                        </span>
                    )}
                    { imageLabelState.prePopulatedLabels.length < 1
                        &&
                        <div>No auto detected labels</div>
                    }
                </div>
                <div className={'col-12 col-sm-6 col-md-4 col-lg-3'}>
                    <h2>Add New Labels</h2>
                    <UiSearchBoxWithButton
                        buttonText={'Add'}
                        searchText={imageLabelState.searchTerm}
                        onChangeSearchTerm={onChangeSearchTerm}
                        onSubmit={addLabel}
                    />
                </div>
            </div>
            <div className={'row pb-5'}>
                <div className={'col-12'}>
                    <h2>All Labels In Image</h2>
                    <div>
                        { allLabelsBeingAdded.map((opt) =>
                            <span className="badge badge-dark mr-2" key={opt.id}>{opt.name}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={'row justify-content-center'}>
                <div className="col-6 col-md-5 col-lg-4 col-xl-3">
                    <UiButton
                        className={'btn btn-outline-primary btn-lg w-100'}
                        text={'Skip'}
                    />
                </div>

                <div className="col-6 col-md-5 col-lg-4 col-xl-3">
                    <UiButton
                        className={'btn btn-primary btn-lg w-100'}
                        text={'Submit'}
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </div>
    );
}
