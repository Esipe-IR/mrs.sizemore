import React from 'react'
import { connect } from 'react-redux'

import { help, wordCountAdd, wordCountLess } from './duck'

class FillgapContainer extends React.Component {
    onClickSubmit(e) {
        e.preventDefault()
        console.log(e)
    }

    onClickHelp(number) {
        alert(this.props.definitions[number])
        this.props.dispatch(help(number))
    }

    onChange(e) {
        var input = e.currentTarget
        
        if (input.value === "") {
            input.dataset.count = 0
            return this.props.dispatch(wordCountLess())
        }

        if (input.dataset.count !== "1") {
            input.dataset.count = 1
            return this.props.dispatch(wordCountAdd())
        }
    }

    createSentence(s, i) {
        let rest = s.slice(1, s.length)
        let self = this

        return (
            <p key={i}>
                {s[0]}
                
                <input
                    type="text"
                    data-count="0"
                    onChange={(e) => self.onChange(e)}/>
                {rest}

                <i 
                    className="fa fa-info-circle" 
                    aria-hidden="true"
                    onClick={() => (self.onClickHelp(i))}>
                </i>
            </p>
        )
    }

    createSentences(items) {
        if (!items) {
            return
        }

        let self = this

        return items.map((s, i) => {
            return self.createSentence(s, i)
        })
    }

    render() {
        return (
            <div className="text">
                {<p>Count: {this.props.wordcount}/{this.props.wordlength}</p>}

                <form onSubmit={this.onClickSubmit}>
                    {this.createSentences(this.props.examples)}

                    <input 
                        className="btn btn-success" 
                        type="submit" 
                        value="Valider"
                    />
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { fillgapReducer } = state

    return {
        wordcount: fillgapReducer.wordcount,
        wordlength: 5
    }
}

export default connect(mapStateToProps)(FillgapContainer)