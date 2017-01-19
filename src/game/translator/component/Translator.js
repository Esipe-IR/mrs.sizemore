import React from 'react'
import Result from './Result'

const Translator = ({result, word, handleResult}) => (
    <div>
        <Result result={result} />

        <form className="form-horizontal" onSubmit={handleResult}>
            <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor="translate-french-value">French</label>

                <div className="col-md-10 col-sm-12">
                    <input type="text" 
                    className="form-control" 
                    id="translate-french-value" 
                    value={word.fr} 
                    disabled />
                </div>
            </div>

            <div className="form-group">
                <div className="hidden-xs hidden-sm">
                    <label className="col-sm-2 control-label" htmlFor="translate-english-value">English</label>
                </div>

                <div className="col-md-10 col-sm-12">
                    <input type="text" 
                    className="form-control" 
                    name="translate-english-value" 
                    id="translate-english-value" 
                    placeholder="English" />
                </div>
            </div>

            <div className="form-group">
                <div className="col-md-offset-2 col-md-10 col-sm-12 text-center">
                    <input className="btn btn-success" type="submit" value="Validate" />
                </div>
            </div>
        </form>
    </div>
)

export default Translator
