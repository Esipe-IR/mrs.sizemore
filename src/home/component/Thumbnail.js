import React from 'react'

const Thumbnail = ({item, push}) => (
    <div className="col-md-3 col-sm-6 hero-feature">
        <div className="thumbnail">
            <img src={item.get("img")} alt=""/>

            <div className="caption">
                <h3>{item.get("name")}</h3>
                <p>{item.get("description")}</p>

                <hr />

                <div className="margin-btm-5">
                    <button onClick={() => push("/game/" + item.get("id"))} className="btn btn-app">
                        <i className="fa fa-gamepad" aria-hidden="true"></i> Play
                    </button>
                </div>
                
                <div>
                    <a href={"/edit/worksheet/" + item.get("id")} className="btn btn-app-secondary">
                        <i className="fa fa-wrench" aria-hidden="true"></i> Edit
                    </a>
                </div>
            </div>
        </div>
    </div>
)

export default Thumbnail
