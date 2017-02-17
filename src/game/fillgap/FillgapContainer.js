import React from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import Fillgap from './component/Fillgap'
import { updateUserWords, updateDifficulty, updateScore, getUserCount } from './duck'
import { getRandom } from '../../services/obj' 

class FillgapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.randomWords()
    }

    randomWords() {
        let list = List()
        let size = this.props.words.size
        let exclude = []

        while (size) {
            let random1 = getRandom(this.props.words.size, exclude)

            if (!this.props.words.get(random1).get("sentences") || 
                !this.props.words.get(random1).get("sentences").size) {
                exclude.push(random1)
                size--
                continue
            }

            let random2 = getRandom(this.props.words.get(random1).get("sentences").size)
            
            let w = Map({
                id: this.props.words.get(random1).get("id"),
                en: this.props.words.get(random1).get("en"), 
                sentence: this.props.words.get(random1).get("sentences").get(random2),
                definition: this.props.words.get(random1).get("definition"),
                value: "",
                status: null
            })
            
            list = list.push(w)
            exclude.push(random1)
            size--
        }

        this.props.updateUserWords(list)
    }

    onSubmit(e) {
        e.preventDefault()
        let score = 0
        let userWords = this.props.userWords

        userWords.forEach((w, i) => { 
            let uw = w
            
            if (w.get("en") === w.get("value")) {
                score++
                uw = uw.set("status", true)
            } else {
                uw = uw.set("status", false)
            }

            userWords = userWords.set(i, uw)
        })

        this.props.updateUserWords(userWords)
        this.props.updateScore(score)
    }

    onClickHelp(number) {
        alert(this.props.userWords.get(number).get("definition"))
    }

    onChange(e) {
        let index = e.target.dataset.index
        let value = e.target.value

        let userWord = this.props.userWords.get(index).withMutations(ctx => { 
            ctx.set("value", value).set("status", null)
        })
        let userWords = this.props.userWords.set(index, userWord)
        
        this.props.updateUserWords(userWords)
    }

    onClickRefresh() {
        this.randomWords()
        this.props.updateScore(0)
    }

    render() {
        return <Fillgap {...this.props} 
                onChange={this.onChange.bind(this)} 
                onClickHelp={this.onClickHelp.bind(this)} 
                onSubmit={this.onSubmit.bind(this)}
                onClickRefresh={this.onClickRefresh.bind(this)} />
    }
}

FillgapContainer.propTypes = {
    words: React.PropTypes.object,
    userWords: React.PropTypes.object,
    count: React.PropTypes.number,
    mode: React.PropTypes.number,
    difficulty: React.PropTypes.number,
    score: React.PropTypes.number,
}

const mapStateToProps = ({fillgapReducer, appReducer, gameReducer}) => ({
    words: appReducer.get("worksheet").get("words"),
    userWords: fillgapReducer.get("userWords"),
    count: getUserCount(fillgapReducer),
    mode: gameReducer.get("mode"),
    difficulty: fillgapReducer.get("difficulty"),
    score: fillgapReducer.get("score"),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateUserWords: (userWords) => dispatch(updateUserWords(userWords)),
    updateDifficulty: (difficulty) => dispatch(updateDifficulty(difficulty)),
    updateScore: (score) => dispatch(updateScore(score)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FillgapContainer)
