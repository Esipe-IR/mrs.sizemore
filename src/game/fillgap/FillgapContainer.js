import React from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { addNotification as notify } from 'reapop'
import Fillgap from './component/Fillgap'
import { updateUserWords, updateDifficulty, updateScore, getUserCount } from './duck'
import { getRandom } from '../../services/obj'
import { logEvent } from '../../services/analytics'

class FillgapContainer extends React.Component {
    componentDidMount() {
        this.randomWords()
    }

    randomWords() {
        let list = List()
        let size = Math.min(this.props.words.size, 20);

        while (size) {
            let random1 = getRandom(this.props.words.size)
            let word = this.props.words.get(random1)

            if (!word.get("sentences") || !word.get("sentences").size) {
                size--
                continue
            }

            let random2 = getRandom(word.get("sentences").size)
            
            let w = Map({
                id: word.get("id"),
                en: word.get("en"), 
                sentence: word.get("sentences").get(random2),
                definition: word.get("definition"),
                value: "",
                status: null
            })
            
            list = list.push(w)
            size--
        }

        this.props.updateUserWords(list)
    }

    onSubmit(e) {
        e.preventDefault()

        let score     = 0,
            userWords = this.props.userWords,
            status    = "success"

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

        let msg = "Oh my god ! Probably ready for the exam " + score + "/" + this.props.userWords.size

        if (score < (this.props.userWords.size / 2)) {
            status = "error"
            msg    = "You only have " + score + "/" + this.props.userWords.size + " ! Please study !"
        } else if (score < (this.props.userWords.size / 1.3)) {
            status = "warning"
            msg    = "Well ... " + score + "/" + this.props.userWords.size + " is good but you can do better"
        }

        let options = {
            title: "Result",
            message: msg,
            status: status,
            closeButton: true,
            buttons: [{
                name: 'Retry',
                primary: true,
                onClick: () => {
                    this.onClickRefresh()
                }
            }],
            dismissible: true,
            dismissAfter: 0
        }

        logEvent("fillgapSubmit", score, {status: status})
        this.props.updateUserWords(userWords)
        this.props.updateScore(score)
        this.props.updateNotify(options)
    }

    onClickHelp(number) {
        let options = {
            title: "Definition",
            message: this.props.userWords.get(number).get("definition"),
            status: 'info',
            closeButton: true,
            dismissible: true,
            dismissAfter: 0
        }

        this.props.updateNotify(options)
        logEvent("fillgapAskHelp", number, {en: this.props.userWords.get(number).get("en")})
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
        logEvent("fillgapRefresh")
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
    difficulty: React.PropTypes.number,
    score: React.PropTypes.number,
}

const mapStateToProps = ({ firebase, fillgap }) => ({
    words: firebase.get("worksheet").get("words"),
    userWords: fillgap.get("userWords"),
    count: getUserCount(fillgap),
    difficulty: fillgap.get("difficulty"),
    score: fillgap.get("score"),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateUserWords: (userWords) => dispatch(updateUserWords(userWords)),
    updateDifficulty: (difficulty) => dispatch(updateDifficulty(difficulty)),
    updateScore: (score) => dispatch(updateScore(score)),
    updateNotify: (options) => dispatch(notify(options))
})

export default connect(mapStateToProps, mapDispatchToProps)(FillgapContainer)
