import React from 'react'
import ModeSelection from './ModeSelection'
import Breadcrumb from '../../app/component/Breadcrumb'
import TranslatorContainer from '../translator/TranslatorContainer'
import FillgapContainer from '../fillgap/FillgapContainer'

const Game = (props) => (
    <section className="page-content">
        <Breadcrumb lastItem={"Game"} push={props.router.push} />

        <div className="text-center margin-btm-20">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1>{props.worksheet.get("name")}</h1>

                            <p>{props.worksheet.get("description")}</p>

                            <button onClick={() => props.router.push("/edit/worksheet/"+props.worksheet.get("id"))} className="btn btn-app-secondary sized">
                                <i className="fa fa-wrench" aria-hidden="true"></i> Edit
                            </button>
                        </div>
                        <div className="col-sm-6">
                            <img src={props.worksheet.get("img")} alt="" className="img-responsive" style={{ margin: "0 auto"}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12">
                <p>Choose your game mode :</p>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <ModeSelection mode={props.mode} updateMode={props.updateMode} worksheet={props.worksheet} />
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12">
                {props.mode === 1 ? 
                    <TranslatorContainer words={props.worksheet.get("words")} /> 
                    :
                    <FillgapContainer words={props.worksheet.get("words")} />
                }
            </div>
        </div>
    </section>
)

export default Game
