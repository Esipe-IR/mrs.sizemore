import React from 'react'

const ModeSelection = () => (
    <div className="mode-selection">
        <div className="row">
            <div className="col-md-4 col-sm-12">
                <button className="btn btn-success margin-btm-5">Easy</button>
            </div>

            <div className="col-md-4 col-sm-12">
                <button className="btn btn-warning margin-btm-5">Normal</button>
            </div>

            <div className="col-md-4 col-sm-12">
                <button className="btn btn-danger margin-btm-5">Hard</button>
            </div>
        </div>
    </div>
)

export default ModeSelection
