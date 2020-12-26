import * as React from 'react';

export const App = () => (
    <div className={'container'}>
        <h1 className={'py-3'}>REAI Label Studio</h1>

        <div className={'row pb-3'}>
            <div className="col-12 col-sm-6 justify-content-center">
                <button className={'btn btn-outline-primary mx-2'}>Previous</button>
                <button className={'btn btn-outline-primary mx-2'}>Next</button>
            </div>
        </div>

        <div className={'row pb-3'}>
            <div className="col-12">
                <img src="https://www.thespruce.com/thmb/_WJOc-34GLmc5QAzOR-3TXKumu8=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bed-and-fireplace-in-luxury-bedroom-748316169-37b1062605034b23ab6d193be9c58ef6.jpg" alt=""/>
            </div>
        </div>
        <div className={'row pb-3'}>
            <div className={'col-12 col-sm-6'}>
                <h2>Auto Detected Objects</h2>
                <div>
                    <input type="checkbox" id="scales" name="scales" checked />
                    <label htmlFor="scales">Scales</label>
                </div>
                <div>
                    <input type="checkbox" id="scales1" name="scales1" checked />
                    <label htmlFor="scales">Scales1</label>
                </div>
                <div>
                    <input type="checkbox" id="scales2" name="scales2" checked />
                    <label htmlFor="scales">Scales2</label>
                </div>
            </div>
            <div className={'col-12 col-sm-6'}>
                <h2>Add New Objects</h2>
                <input type="text"/>
                <button className={'btn btn-primary'}>Add</button>
            </div>
        </div>
        <div className={'row pb-3'}>
            <div className={'col-12 col-sm-6'}>
                <h2>All Objects Being Added</h2>
                <div>
                    <span className="badge badge-light">Light</span>
                    <span className="badge badge-light">Light</span>
                    <span className="badge badge-light">Light</span>
                    <span className="badge badge-light">Light</span>
                    <span className="badge badge-light">Light</span>
                    <span className="badge badge-light">Light</span>
                </div>
            </div>
        </div>
        <div className={'row'}>
            <div className="col-12 col-sm-6 justify-content-center">
                <button className={'btn btn-secondary mx-2'}>Skip</button>
                <button className={'btn btn-primary mx-2'}>Submit</button>
            </div>
        </div>

    </div>
);
