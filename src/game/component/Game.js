import React from 'react'
import ModeSelection from './ModeSelection'
import TranslatorContainer from '../translator/TranslatorContainer'
import FillgapContainer from '../fillgap/FillgapContainer'

const Game = (props) => (
    <section>
        <div className="text-center margin-btm-20">
            <h1>{props.worksheet.get("name")}</h1>

            <img src={props.worksheet.get("img")} alt="" width="200px" />
        </div>

        <ModeSelection mode={props.mode} updateMode={props.updateMode} />

        {props.mode === 0 ? 
            <TranslatorContainer words={props.worksheet.get("words")} /> 
                : 
            <FillgapContainer words={props.worksheet.get("words")} />
        }
    </section>
)

export default Game
