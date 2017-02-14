import React from 'react'
import ModeSelection from './ModeSelection'
import TranslatorContainer from '../translator/TranslatorContainer'
import FillgapContainer from '../fillgap/FillgapContainer'

const Game = (props) => (
    <div className="box">
        <div className="box-title">
            <h2>{props.worksheet.get("name").toUpperCase()}</h2>

            <hr/>

            <ModeSelection mode={props.mode} updateMode={props.updateMode} />
        </div>

        <div className="box-body">
            {props.mode === 0 ? 
                <TranslatorContainer words={props.worksheet.get("words")} /> 
                    : 
                <FillgapContainer words={props.worksheet.get("words")} />
            }
        </div>

        <div className="box-footer">
        </div>
    </div>
)

export default Game
