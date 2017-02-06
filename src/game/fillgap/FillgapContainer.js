import React from 'react'
import { connect } from 'react-redux'

import Fillgap from './component/Fillgap'
import { help, updateUserWords, getFullCount, randomizeWords } from './duck'

class FillgapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    
    onClickSubmit(e) {
        e.preventDefault()
        console.log(e)
    }

    onClickHelp(number) {
        alert(this.props.definitions[number])
        this.props.dispatch(help(number))
    }

    random(elem) {
        if (!elem) {
            return
        }

        let min = Math.ceil(0)
        let max = Math.floor(elem.size - 1)
        
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    onChange(e) {
        let index = e.target.dataset.index
        let value = e.target.value

        let last = this.props.userWords.set(index, value)
        
        this.props.dispatch(updateUserWords(last))
    }

    render() {
        return <Fillgap {...this.props} onChange={this.onChange} random={this.random} />
    }
}

FillgapContainer.propTypes = {
    words: React.PropTypes.object,
    fullCount: React.PropTypes.number,
    userWords: React.PropTypes.object
}

const mapStateToProps = ({fillgapReducer, appReducer}) => ({
    words: randomizeWords(appReducer.get("worksheet").get("words")),
    userWords: fillgapReducer.get("userWords"),
    fullCount: getFullCount(appReducer.get("worksheet").get("words"))
})

export default connect(mapStateToProps)(FillgapContainer)
