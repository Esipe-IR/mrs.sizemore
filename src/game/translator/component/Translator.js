import React from 'react'
import Form from './Form'

const Translator = (props) => (
    <article className="box">
        <div className="box-title text-center">
            <h2>Translator</h2>
        </div>

        <div className="box-body">
            <div className="row">
                <div className="col-sm-12">
                    <div className="score-box">
                        Score: {props.score}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <Form {...props} />
                </div>
            </div>
        </div>
    </article>
)

export default Translator
