import React from 'react'
import Form from './Form'

const Fillgap = (props) => (
    <article className="box">
        <div className="box-title text-center">
            <h2>Fillgap</h2>

            <h3>Score: {props.score}/{props.words.size}</h3>
            
            <button className="btn btn-default" onClick={props.onClickRefresh}>
                <i className="fa fa-refresh" aria-hidden="true"></i> Refresh
            </button>
        </div>

        <div className="box-body">
            <div className="row">
                <div className="col-sm-12">
                    <Form {...props} />
                </div>
            </div>
        </div>
    </article>
)

export default Fillgap
