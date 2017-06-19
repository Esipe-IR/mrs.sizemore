import React from 'react'
import Thumbnail from './Thumbnail'

const renderWorksheets = (worksheets, push) => {
    let size = worksheets.size;
    let nb = size / 4;
    let rows = [];

    for (let i = 0; i < nb; i++) {
        rows.push(worksheets.slice(i * 4, (i + 1) * 4));
    }

    return rows.map((row, i) => (
        <div key={i} className="row text-center">
            {row.map(w => <Thumbnail key={w.get("id")} item={w} push={push} />)}
        </div>
    ));
}

const Home = ({ worksheets, push }) => (
    <section className="page-content">
        <div className="row">
            <div className="col-md-12 text-center">
                <img src="res/apple-icon.png" style={{marginRight: "-40px"}} alt=""/>

                <h1>Mrs. Sizemore</h1>
                <p className="text-info"><b>Hello,</b></p>
                <p>You can get better marks in english thanks to Mrs. Sizemore!</p>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h2 className="page-header">
                    Worksheets
                </h2>
            </div>
        </div>
            {worksheets ? renderWorksheets(worksheets, push) : null}
    </section>
)

export default Home
