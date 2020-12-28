import * as React from 'react';

type Props = {
    type?: 'submit'|'reset'|'button';
    text?: string;
    id?: string;
    className?: string;
    onClick?: () => void;
};

export const UiButton = (props: Props) => {
    const {
        type = 'submit',
        text = '',
        id = '',
        className = 'btn btn-outline-secondary',
        onClick = () => {},
    } = props;

    return (
        <button
            type={type}
            className={className}
            id={id}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
