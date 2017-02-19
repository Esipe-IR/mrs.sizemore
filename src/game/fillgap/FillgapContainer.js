import React from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { addNotification as notify } from 'reapop'
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

        let similar = 0
        this.props.userWords.forEach((i, index) => {
            if (i.get("id") === list.get(index).get("id")) similar++
        })
        if (similar >= (list.size)) return this.randomWords()

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
            msg    = "Well ... " + score + "/" + this.props.userWords.size + " is good but can do better"
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
    difficulty: React.PropTypes.number,
    score: React.PropTypes.number,
}

const mapStateToProps = ({fillgapReducer, appReducer, gameReducer}) => ({
    words: appReducer.get("worksheet").get("words"),
    userWords: fillgapReducer.get("userWords"),
    count: getUserCount(fillgapReducer),
    difficulty: fillgapReducer.get("difficulty"),
    score: fillgapReducer.get("score"),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateUserWords: (userWords) => dispatch(updateUserWords(userWords)),
    updateDifficulty: (difficulty) => dispatch(updateDifficulty(difficulty)),
    updateScore: (score) => dispatch(updateScore(score)),
    updateNotify: (options) => dispatch(notify(options))
})

export default connect(mapStateToProps, mapDispatchToProps)(FillgapContainer)
