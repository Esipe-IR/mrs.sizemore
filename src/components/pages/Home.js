import React from 'react'
import Header from '../Header'
import Thumbnail from '../Thumbnail'

const Home = ({worksheets}) => (
    <div>
        <Header />
        
        <hr />

        <div className="row">
            <div className="col-lg-12">
                <h3>Official worksheets: </h3>
                <hr />
            </div>
        </div>

        <div className="row text-center">
            {worksheets.map((w) => (
                <Thumbnail key={w.id} item={w}/>
            ))}
        </div>

        <div className="row">
            <div className="col-xs-10">
                <h3>Community worksheets: </h3>
                <hr />
            </div>

            <div className="col-xs-2">
                <button className="btn btn-warning"><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
            </div>
        </div>

        <div className="row text-center">
            {worksheets.map((w) => (
                <Thumbnail key={w.id} item={w}/>
            ))}
        </div>
    </div>
)

export default Home
