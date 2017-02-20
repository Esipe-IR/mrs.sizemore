import React from 'react'
import Thumbnail from './Thumbnail'

const Home = ({ worksheets, push }) => (
    <section className="page-content">
        <div className="row">
            <div className="col-md-12 text-center">
                <h1>Mrs. Sizemore</h1>
                <p>Gets better marks thanks to Mrs. Sizemore and her wonderful exercices!</p>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h2 className="page-header">Worksheets</h2>
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
