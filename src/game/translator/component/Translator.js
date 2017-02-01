import Switch from 'react-toggle-switch'
import React from 'react'
import Info from '../../../general/Info'
import KeyboardContainer from '../../../keyboard/KeyboardContainer'

const Translator = (props) => (
    <div>
        <div className="row">
            <div className="col-sm-12">
                <Switch onClick={props.switchUpdate(props.switch)} on={props.switch} />
            </div>
        </div>

        <Info status={props.result} msg={props.resultMsg} />

        <form className="form-horizontal" onSubmit={props.checkResult}>
            <div className="form-group">
                <div className="hidden-xs hidden-sm">
                    <label className="col-sm-2 control-label" htmlFor="translate-french-value">French</label>
                </div>

                <div className="col-md-10 col-sm-12">
                    <input type="text" 
                    className="form-control" 
                    id="translate-french-value" 
                    value={props.word.get("fr")} 
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
                    value={props.input}
                    onChange={props.formatInput}
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

        <KeyboardContainer onChange={props.updateInput} word={props.input}/>
    </div>
)

export default Translator
