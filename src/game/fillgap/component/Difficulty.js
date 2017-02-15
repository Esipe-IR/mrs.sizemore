import React from 'react'

const Difficulty = (props) => (
    <div className="mode-selection">
        <div className="row">
            <div className="col-sm-6">
                <div className="mode">
                    <button 
                        onClick={() => props.updateDifficulty(0)} 
                        data-mode="0" 
                        className={"btn btn-outline-success " + (props.difficulty === 0 ? "fill" : "")}>
                        <i className="fa fa-thermometer-empty" aria-hidden="true"></i> Easy
                    </button>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="mode">
                    <button 
                        onClick={() => props.updateDifficulty(1)}
                        data-mode="2" 
                        className={"btn btn-outline-danger " + (props.difficulty === 1 ? "fill" : "")}
                    >
                        <i className="fa fa-thermometer-full" aria-hidden="true"></i> Hard
                    </button>
                </div>
            </div>
        </div>
    </div>
)

export default Difficulty
