import React from 'react'
import Header from '../../components/Header'
import Thumbnail from '../../components/Thumbnail'

const Home = ({worksheets}) => (
    <div>
        <Header />

        <div className="row">
            <div className="col-lg-12">
                <h3>Worksheets: </h3>
                <hr />
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
