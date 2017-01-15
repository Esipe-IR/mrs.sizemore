import React from 'react'
import { connect } from 'react-redux'
import { help } from '../actions'

class Text extends React.Component {
    onClickSubmit(e) {
        e.preventDefault()
        console.log(e)
    }

    onClickHelp(number) {
        alert(this.props.definitions[number])
        this.props.dispatch(help(number))
    }

    createSentence(s, i) {
        let rest = s.slice(1, s.length)
        let self = this

        return (
            <p key={i}>
                {s[0]}
                <input type="text"/>
                {rest}

                <i 
                    className="fa fa-info-circle" 
                    aria-hidden="true"
                    onClick={() => (self.onClickHelp(i))}
                >
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
                <form onSubmit={this.onClickSubmit}>
                    {this.createSentences(this.props.examples)}

                    <input 
                        className="submit" 
                        type="submit" 
                        value="Valider"
                    />
                </form>
            </div>
        )
    }
}

export default connect()(Text)
