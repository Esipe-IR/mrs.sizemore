import React from 'react'
import Thumbnail from './Thumbnail'

const Home = ({ worksheets, push }) => (
    <section className="page-content">
        <div className="row">
            <div className="col-md-12 text-center">
                <h1>Mrs. Sizemore</h1>
                <p>Gets better marks in english thanks to Mrs. Sizemore!</p>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h2 className="page-header">
                    Worksheets <button onClick={() => push("/create/worksheet")} className="btn btn-success"><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
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
