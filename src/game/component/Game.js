import React from 'react'
import Breadcrumb from '../../app/component/Breadcrumb'
import TranslatorContainer from '../translator/TranslatorContainer'

const ModeShow = (worksheet) => {
    if (!worksheet.get("words") || !worksheet.get("words").size) {
        return null
    }

    return <TranslatorContainer words={worksheet.get("words")} />
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
                {ModeShow(props.worksheet)}
            </div>
        </div>
    </section>
)

export default Game
