import React from 'react'
import Thumbnail from './Thumbnail'
import { logEvent } from '../../services/analytics'

const clickAdd = (push) => {
    logEvent("clickAdd")
    push("/create/worksheet")
}

const Home = ({ user, worksheets, push }) => (
    <section className="page-content">
        <div className="row">
            <div className="col-md-12 text-center">
                <img src="res/apple-icon.png" style={{marginRight: "-40px"}} alt=""/>

                <h1>Mrs. Sizemore</h1>
                <p className="text-info"><b>Hello { user ? user.get("email") : "anonymous" },</b></p>
                <p>You can get better marks in english thanks to Mrs. Sizemore!</p>
                {user ? 
                    <p className="text-danger">{user.get("role") ? "You can edit !" : "Be careful your account seems to be unaccredited"}</p>
                    :
                    null
                }
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h2 className="page-header">
                    Worksheets <button onClick={() => clickAdd(push)} className="btn btn-success"><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
                </h2>
            </div>
        </div>
        <div className="row text-center">
            {worksheets ? worksheets.map((w) => (
                <Thumbnail key={w.get('id')} item={w} push={push}/>
            )) : null}
        </div>
    </section>
)

export default Home
