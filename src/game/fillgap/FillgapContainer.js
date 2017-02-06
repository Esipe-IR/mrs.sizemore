import React from 'react'
import { connect } from 'react-redux'

import Fillgap from './component/Fillgap'
import { updateUserWords, getRandomizeWords } from './duck'

class FillgapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
   }
    
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

        if (last.get(index) === "") {
            last = last.delete(index)
        }
        
        this.props.dispatch(updateUserWords(last))
    }

    render() {
        return <Fillgap {...this.props} onChange={this.onChange} onClick={this.onClick} />
    }
}

FillgapContainer.propTypes = {
    words: React.PropTypes.object,
    userWords: React.PropTypes.object,
    mode: React.PropTypes.number
}

const mapStateToProps = ({fillgapReducer, appReducer, gameReducer}) => ({
    words: getRandomizeWords(appReducer),
    userWords: fillgapReducer.get("userWords"),
    mode: gameReducer.get("mode")
})

export default connect(mapStateToProps)(FillgapContainer)
