import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Keyboard from './component/Keyboard'

class KeyboardContainer extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.onDel = this.onDel.bind(this)
        this.onClear = this.onClear.bind(this)
        this.getHeight = this.getHeight.bind(this)
        this.isDisplay = this.isDisplay.bind(this)
    }

    onClick(e) {
        let letter = e.target.innerHTML
        let word = this.props.word + letter
        word = word.toLowerCase()

        this.props.dispatch(this.props.onChange(word))
    }

    onDel() {
        let word = this.props.word.substring(0, this.props.word.length - 1)

        this.props.dispatch(this.props.onChange(word))
    }

    onClear() {
        this.props.dispatch(this.props.onChange(""))
    }

    getHeight() {
        if (this.props.status) {
            return {height: "40%"}
        }

        return {height: "0"}
    }

    isDisplay() {
        if (this.props.status) {
            return {display: "block"}
        }

        return {display: "none"}
    }

    render() {
        return (
            <Keyboard onClick={this.onClick} onDel={this.onDel} onClear={this.onClear}
                height={this.getHeight()}
                display={this.isDisplay()}
            />
        )
    }
}

KeyboardContainer.propTypes = {
    status: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    word: PropTypes.string.isRequired
}

const mapStateToProps = ({ keyboardReducer }) => ({
    status: keyboardReducer.get("status")
})

export default connect(mapStateToProps)(KeyboardContainer)
