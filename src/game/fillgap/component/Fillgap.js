import React from 'react'
import Form from './Form'
import Difficulty from './Difficulty'

const Fillgap = (props) => (
    <article className="box">
        <div className="box-title text-center">
            <h2>Fillgap</h2>
            
            <div className="row">
                <div className="col-sm-12">
                    <button className="btn btn-default margin-btm-20" onClick={props.onClickRefresh}>
                        <i className="fa fa-refresh" aria-hidden="true"></i> Refresh
                    </button>
                </div>
            </div>

            <Difficulty {...props} />
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
