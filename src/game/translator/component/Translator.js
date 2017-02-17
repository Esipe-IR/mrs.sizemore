import React from 'react'
import Form from './Form'
import Info from '../../../app/component/Info'

const Translator = (props) => (
    <article className="box">
        <div className="box-title text-center">
            <h2>Translator</h2>

            <button className="btn btn-default" onClick={props.onClickRefresh}>
                <i className="fa fa-refresh" aria-hidden="true"></i> Refresh
            </button>
        </div>

        <div className="box-body">
            <Info status={props.result} msg={props.resultMsg} extra={props.resultExtra} />

            <div className="row">
                <div className="col-sm-12">
                    <Form {...props} />
                </div>
            </div>
        </div>
    </article>
)

export default Translator
