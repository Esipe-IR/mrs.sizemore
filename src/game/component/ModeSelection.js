import React from 'react'

const ModeSelection = (props) => (
    <div className="mode-selection">
        <div className="row">
            <div className="col-sm-12">
                <select className="form-control" value={props.mode} onChange={props.updateMode}>
                    <option value={0}>Translator</option>
                    <option value={1}>Fillgap</option>
                </select>
            </div>
        </div>
    </div>
)

export default ModeSelection
