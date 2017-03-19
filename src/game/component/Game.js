import React from 'react'
import ModeSelection from './ModeSelection'
import Breadcrumb from '../../app/component/Breadcrumb'
import TranslatorContainer from '../translator/TranslatorContainer'
import FillgapContainer from '../fillgap/FillgapContainer'
import { logEvent } from '../../services/analytics'

const ModeShow = (worksheet, mode) => {
    if (!worksheet.get("words") || !worksheet.get("words").size) {
        return null
    }

    if (mode === 0) return <TranslatorContainer words={worksheet.get("words")} />
    if (mode === 1) return <FillgapContainer words={worksheet.get("words")} />
}

const clickEdit = (push, worksheet) => {
    logEvent("gameClickEdit", null, {id: worksheet.get("id"), name: worksheet.get("name")})
    push("/edit/worksheet/"+worksheet.get("id"))
}

const Game = (props) => (
    <section className="page-content">
        <Breadcrumb lastItem={"Game"} push={props.router.push} />

        <div className="text-center margin-btm-20">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-6">
                            <h1>{props.worksheet.get("name")}</h1>

                            <p>{props.worksheet.get("description")}</p>

                            <button onClick={() => clickEdit(props.router.push, props.worksheet)} className="btn btn-app-secondary sized">
                                <i className="fa fa-wrench" aria-hidden="true"></i> Edit
                            </button>
                        </div>
                        <div className="col-xs-6">
                            <img src={props.worksheet.get("img")} alt="" className="img-responsive" style={{ margin: "0 auto"}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <p>Choose your game mode :</p>
                        <ModeSelection mode={props.mode} updateMode={props.updateMode} worksheet={props.worksheet} />
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12">
                {ModeShow(props.worksheet, props.mode)}
            </div>
        </div>
    </section>
)

export default Game
