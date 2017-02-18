import React from 'react'
import ModeSelection from './ModeSelection'
import Breadcrumb from '../../app/component/Breadcrumb'
import TranslatorContainer from '../translator/TranslatorContainer'
import FillgapContainer from '../fillgap/FillgapContainer'

const Game = (props) => (
    <section>
        <Breadcrumb lastItem={"Game"} />

        <div className="text-center margin-btm-20">
            <h1>{props.worksheet.get("name")} <a className="btn btn-app-secondary sized" href={"/edit/worksheet/"+props.worksheet.get("id")}><i className="fa fa-wrench" aria-hidden="true"></i></a></h1>

            <img src={props.worksheet.get("img")} alt="" width="200px" />
        </div>

        <div className="row">
            <div className="col-sm-12">
                <p>Choose your game mode :</p>
                <ModeSelection mode={props.mode} updateMode={props.updateMode} />
            </div>
        </div>

        {props.mode === 0 ? 
            <TranslatorContainer words={props.worksheet.get("words")} /> 
                : 
            <FillgapContainer words={props.worksheet.get("words")} />
        }
    </section>
)

export default Game
