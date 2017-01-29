import React from 'react'
import Resume from './Resume'

const Game = ({worksheet, answer, fn}) => (
    <div>
        <div className="box">
            <div className="box-title">
                <h2>{worksheet.name.toUpperCase()}</h2>

                <hr/>

                <div className="mode-selection">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="mode">
                                <button onClick={fn.changeMode} data-mode="0" className="btn btn-outline-success">
                                    <i className="fa fa-thermometer-empty" aria-hidden="true"></i> Easy
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mode">
                                <button onClick={fn.changeMode} data-mode="1" className="btn btn-outline-warning">
                                    <i className="fa fa-thermometer-half" aria-hidden="true"></i> Medium
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mode">
                                <button onClick={fn.changeMode} data-mode="2" className="btn btn-outline-danger">
                                    <i className="fa fa-thermometer-full" aria-hidden="true"></i> Hard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="box-body">
                {fn.getMode()}
            </div>

            <div className="box-footer">
                <Resume result={answer} />
            </div>
        </div>
    </div>
)

export default Game
