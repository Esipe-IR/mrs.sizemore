import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchWorksheet } from '../../actions'

import Fillgap from '../utils/Fillgap'
import Table from '../utils/Table'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchWorksheet(this.props.params.sheet));
    }

    render() {
        const {app, api} = this.props

        return (
            <div className="box">
                <div className="box-title">
                    <h2>Worksheet: {api.worksheet}</h2>
                    <em>Theme: {api.theme}</em>
                </div>

                <div className="box-body">
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
