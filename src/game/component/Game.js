import React from 'react'
import ModeSelection from './ModeSelection'
import Breadcrumb from '../../app/component/Breadcrumb'

const Game = (props) => (
    <section className="page-content">
        <Breadcrumb lastItem={"Game"} push={props.router.push} />

        <div className="panel panel-default">
            <div className="panel-heading">Game</div>

            <div className="panel-body">
                <div className="text-center margin-btm-20">
                    <h1>
                        {props.worksheet.get("name")}
                        
                        <button onClick={() => props.router.push("/edit/worksheet/"+props.worksheet.get("id"))} className="btn btn-app-secondary sized">
                            <i className="fa fa-wrench" aria-hidden="true"></i>
                        </button>
                    </h1>

                    <img src={props.worksheet.get("img")} alt="" className="img-responsive" style={{ margin: "0 auto"}} />
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <p>Choose your game mode :</p>
                        <ModeSelection mode={props.mode} updateMode={props.updateMode} worksheet={props.worksheet} />
                    </div>
                </div>
            </div>
        </div>
    </section>
)

export default Game
