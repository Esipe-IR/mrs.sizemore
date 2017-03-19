import React from 'react'
import { logEvent } from '../../services/analytics'

const clickPlay = (item, push) => {
    logEvent("clickPlay", null, {id: item.get("id"), name: item.get("name")})
    push("/game/" + item.get("id"))
}

const clickEdit = (item, push) => {
    logEvent("clickEdit", null, {id: item.get("id"), name: item.get("name")})
    push("/edit/worksheet/" + item.get("id"))
}

const Thumbnail = ({item, push}) => (
    <div className="col-md-3 col-sm-6 hero-feature">
        <div className="thumbnail">
            <img src={item.get("img")} alt=""/>

            <div className="caption">
                <h3>{item.get("name")}</h3>
                <p>{item.get("description")}</p>

                <hr />

                <div className="margin-btm-5">
                    <button onClick={() => clickPlay(item, push)} className="btn btn-app">
                        <i className="fa fa-gamepad" aria-hidden="true"></i> Play
                    </button>
                </div>
                
                <div>
                    <button onClick={() => clickEdit(item, push)} className="btn btn-app-secondary">
                        <i className="fa fa-wrench" aria-hidden="true"></i> Edit
                    </button>
                </div>
            </div>
        </div>
    </div>
)

export default Thumbnail
