import * as React from 'react';

import {UiButton} from '../ui.button/ui.button';
import {UiInput} from '../ui.input/ui.input';

type Props = {
    buttonText: string;
    searchText: string;
    onChangeSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
};

export const UiSearchBoxWithButton = (props: Props) => {
    const {
        buttonText = '',
        searchText = '',
        onChangeSearchTerm = () => {},
        onSubmit = () => {},
    } = props;

    const onSubmitForm = (e: any) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <form onSubmit={onSubmitForm}>
            <div className={'input-group mb-3 image-label-view'}>
                <UiInput
                    type={'text'}
                    value={searchText}
                    className={'form-control'}
                    placeholder={'label name'}
                    onChange={onChangeSearchTerm}
                />
                <div className="input-group-append">
                    <UiButton
                        type={'submit'}
                        text={buttonText}
                    />
                </div>
            </div>
        </form>
    );
}
