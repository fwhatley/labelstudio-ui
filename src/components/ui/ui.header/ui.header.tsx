import * as React from 'react';

type Props = {
};

export const UiHeader = (props: Props) => {
    const {
    } = props;

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">REAI Label Studio</a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Labeling<span className="sr-only">Labeling</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Stats</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
