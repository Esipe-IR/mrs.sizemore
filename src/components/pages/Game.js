import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchWorksheet } from '../../actions'

import Translate from '../utils/Translate'
import Fillgap from '../utils/Fillgap'
import Table from '../utils/Table'

class Game extends React.Component {
    constructor(props) {
        super(props)
        //this.props.dispatch(fetchWorksheet(this.props.params.sheet));
    }

    changeMode(mode) {
        //Got to dispatch
    }

    render() {
        const {app, api} = this.props

        return (
            <div className="box">
                <div className="box-title">
                    <h2>Worksheet: {api.worksheet}</h2>
                    <em>Theme: {api.theme}</em>

                    <hr />

                    <div className="mode-selection">
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <button className="btn btn-success margin-btm-5">Easy</button>
                            </div>

                            <div className="col-md-4 col-sm-12">
                                <button className="btn btn-warning margin-btm-5">Normal</button>
                            </div>

                            <div className="col-md-4 col-sm-12">
                                <button className="btn btn-danger margin-btm-5">Hard</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box-body" data-mode="easy" style={(app.mode === "easy") ? {display: "block"}: {display: "none"}}>
                    <Translate />
                </div>

                <div className="box-body" data-mode="normal" style={(app.mode === "normal") ? {display: "block"}: {display: "none"}}>
                </div>

                <div className="box-body" data-mode="hard" style={(app.mode === "hard") ? {display: "block"}: {display: "none"}}>
                    <p>Count: {app.wordcount}/{api.words.length}</p>
                    <Fillgap examples={api.examples} definitions={api.definitions} />
                </div>

                <div className="box-footer">
                    <Table definitions={api.words} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { apiReducer, appReducer } = state

    return {
        app: appReducer,
        api: apiReducer
    }
}

Game.propTypes = {
    app: PropTypes.object,
    api: PropTypes.object,
}

export default connect(mapStateToProps)(Game)
