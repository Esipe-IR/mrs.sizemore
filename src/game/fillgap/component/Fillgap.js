import React from 'react'
import ListExamples from './ListExamples'

const Fillgap = (props) => (
    <div className="text">
        <p>Count: {props.count}/{props.words.size}</p>

        <div className="text-center margin-btm-20">
            <h4>Score: {props.score}</h4>
            <button className="btn btn-default" onClick={props.onClickRefresh}>
                <i className="fa fa-refresh" aria-hidden="true"></i> Refresh
            </button>
        </div>

        <form onSubmit={props.onSubmit}>
            <ListExamples {...props} />

            <input className="btn btn-app" type="submit" value="Submit" />
        </form>
    </div>
)

export default Fillgap
