import React from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import Fillgap from './component/Fillgap'
import { updateUserWords, updateRefresh, updateScore, getRandomizeWords, getUserCount } from './duck'

class FillgapContainer extends React.Component {
    onSubmit(e) {
        e.preventDefault()
        let score = 0
        let userWords = this.props.userWords

        this.props.words.forEach((w, i) => {
            let uw = this.props.userWords.get(i)

            if (!uw) {
                uw = Map({value: "", status: false})
            }

            if (w.get("en") === uw.get("value")) {
                score++
                uw = uw.set("status", true)
            } else {
                uw = uw.set("status", false)
            }

            userWords = userWords.set(i, uw)
        })

        this.props.dispatch(updateUserWords(userWords))
        this.props.dispatch(updateScore(score))
    }

    onClick(number) {
        alert(this.props.words.get(number).get("definition"))
    }

    onChange(e) {
        let index = e.target.dataset.index
        let value = e.target.value

        let last = this.props.userWords.set(index, Map({value: value, status: null}))
        
        this.props.dispatch(updateUserWords(last))
    }

    onClickRefresh() {
        this.props.dispatch(updateRefresh(this.props.refresh + 1))
        this.props.dispatch(updateUserWords(List().setSize(20)))
        this.props.dispatch(updateScore(0))
    }

    render() {
        return <Fillgap {...this.props} 
                onChange={this.onChange.bind(this)} 
                onClick={this.onClick.bind(this)} 
                onSubmit={this.onSubmit.bind(this)}
                onClickRefresh={this.onClickRefresh.bind(this)} />
    }
}

FillgapContainer.propTypes = {
    words: React.PropTypes.object,
    userWords: React.PropTypes.object,
    count: React.PropTypes.number,
    mode: React.PropTypes.number,
    score: React.PropTypes.number,
    refresh: React.PropTypes.number
}

const mapStateToProps = ({fillgapReducer, appReducer, gameReducer}) => ({
    words: getRandomizeWords({appReducer, gameReducer, fillgapReducer}),
    userWords: fillgapReducer.get("userWords"),
    count: getUserCount(fillgapReducer),
    mode: gameReducer.get("mode"),
    difficulty: fillgapReducer.get("difficulty"),
    score: fillgapReducer.get("score"),
    refresh: fillgapReducer.get("refresh")
})

export default connect(mapStateToProps)(FillgapContainer)
