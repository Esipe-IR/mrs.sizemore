import React from 'react'
import { connect } from 'react-redux'
import { translateAnswer } from '../../actions'

import Result from './Result'

class Translate extends React.Component {
    constructor(props) {
        super(props)
        this.handleResult = this.handleResult.bind(this)
    }

    handleResult(e) {
        e.preventDefault()

        let input = e.target[1].value
        let userVal = input.toLowerCase().trim()
        
        if (userVal === this.props.word.en) {
            return this.props.dispatch(translateAnswer(true));
        }

        this.props.dispatch(translateAnswer(false, "Wrong", this.props.word))
    }

    render() {
        return (
            <div>
                <Result status={this.props.status} info={this.props.msg} />

                <form className="form-horizontal" onSubmit={this.handleResult}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="translate-french-value">French</label>

                        <div className="col-md-10 col-sm-12">
                            <input type="text" 
                            className="form-control" 
                            id="translate-french-value" 
                            value={this.props.word.fr} 
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
    }
}

const mapStateToProps = (state) => {
    const { appReducer } = state

    return {
        status: appReducer.translate.status,
        msg: appReducer.translate.msg,
        success: appReducer.success,
        error: appReducer.error,
        word: {
            fr: "test",
            en: "test"
        }
    }
}

export default connect(mapStateToProps)(Translate)
