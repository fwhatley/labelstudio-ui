import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    type?: string;
    id?: string;
    value?: string;
    checked?: boolean;
    name?: string;
    className?: string;
    placeholder?: string;
    ariaLabel?: string;
    ariaDescribeBy?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UiInput = (props: Props) => {
    let {
        type = '',
        id = '',
        value = '',
        checked = false,
        name = '',
        className = 'form-control',
        placeholder = '',
        ariaLabel = '',
        ariaDescribeBy = '',
        onChange = () => {},
    } = props;

    if (!id) {
        id = uuidv4();
    }

    return (
        <input
            type={type}
            id={id}
            value={value}
            checked={checked}
            name={name}
            className={className}
            placeholder={placeholder}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribeBy}
            onChange={onChange}
        />
    );
}
