import React from 'react'

const Thumbnail = ({item}) => (
    <div className="col-md-3 col-sm-6 hero-feature">
        <div className="thumbnail">
            <img src={item.img} alt=""/>

            <div className="caption">
                <h3>{item.name}</h3>
                <p>{item.description}</p>

                <div className="progress">
                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: 40+ '%'}}>
                        <span className="sr-only">40% Complete (success)</span>
                    </div>
                </div>

                <p>
                    <a href={"game/"+item.id} className="btn btn-success">Play now !</a> <a href={"info/"+item.id} className="btn btn-default">More Info</a>
                </p>
            </div>
        </div>
    </div>
)

export default Thumbnail
