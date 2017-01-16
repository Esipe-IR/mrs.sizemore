import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchQuizz } from '../../actions'

import Text from '../utils/Text'
import Help from '../utils/Help'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(fetchQuizz(this.props.params.sheet));
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
                    <Text examples={api.examples} definitions={api.definitions} />
                </div>

                <div className="box-footer">
                    <Help definitions={api.words} />
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
