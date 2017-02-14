import React from 'react'
import ModeSelection from './ModeSelection'
import TranslatorContainer from '../translator/TranslatorContainer'
import FillgapContainer from '../fillgap/FillgapContainer'

const Game = (props) => (
    <section>
        <h1 className="text-center">{props.worksheet.get("name")}</h1>

        <ModeSelection mode={props.mode} updateMode={props.updateMode} />

        {props.mode === 0 ? 
            <TranslatorContainer words={props.worksheet.get("words")} /> 
                : 
            <FillgapContainer words={props.worksheet.get("words")} />
        }
    </section>
)

export default Game
