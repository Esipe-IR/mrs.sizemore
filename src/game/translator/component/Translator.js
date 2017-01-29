import Switch from 'react-toggle-switch'
import React from 'react'
import Result from './Result'
import { inputChange } from '../duck'
import KeyboardContainer from '../../../keyboard/KeyboardContainer'

const Translator = ({result, word, sw, userWord, fn}) => (
    <div>
        <div className="row">
            <div className="col-sm-12">
                <Switch onClick={fn.switch} on={sw} />
            </div>
        </div>

        <Result result={result} />

        <form className="form-horizontal" onSubmit={fn.handleResult}>
            <div className="form-group">
                <div className="hidden-xs hidden-sm">
                    <label className="col-sm-2 control-label" htmlFor="translate-french-value">French</label>
                </div>

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
                    value={userWord}
                    onChange={fn.onChange}
                    placeholder="English"
                    autoComplete="off" />
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-12 text-center">
                    <input className="btn btn-app" type="submit" value="Submit" />
                </div>
            </div>
        </form>

        <KeyboardContainer onChange={inputChange} word={userWord}/>
    </div>
)

export default Translator
