import React from 'react'
import { connect } from 'react-redux'
import Fillgap from './component/Fillgap'
import { updateUserWords, getRandomizeWords, getUserCount } from './duck'

class FillgapContainer extends React.Component {    
    onSubmit(e) {
        e.preventDefault()
        console.log(e)
    }

    onClick(number) {
        alert(this.props.words.get(number).get("definition"))
    }

    onChange(e) {
        let index = e.target.dataset.index
        let value = e.target.value

        let last = this.props.userWords.set(index, value)
        
        this.props.dispatch(updateUserWords(last))
    }

    render() {
        return <Fillgap {...this.props} onChange={this.onChange.bind(this)} onClick={this.onClick.bind(this)} />
    }
}

FillgapContainer.propTypes = {
    words: React.PropTypes.object,
    userWords: React.PropTypes.object,
    count: React.PropTypes.number,
    mode: React.PropTypes.number
}

const mapStateToProps = ({fillgapReducer, appReducer, gameReducer}) => ({
    words: getRandomizeWords({appReducer, gameReducer}),
    userWords: fillgapReducer.get("userWords"),
    count: getUserCount(fillgapReducer),
    mode: gameReducer.get("mode")
})

export default connect(mapStateToProps)(FillgapContainer)
