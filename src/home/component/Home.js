import React from 'react'
import Thumbnail from './Thumbnail'

const Home = ({worksheets}) => (
    <section>
        <div className="row">
            <div className="col-md-12">
                <h1>Old wood</h1>
                <p>txt</p>
            </div>
        </div>
        <div className="row text-center">
            {worksheets ? worksheets.map((w) => (
                <Thumbnail key={w.get('id')} item={w}/>
            )) : null}
        </div>
    </section>
)

export default Home
