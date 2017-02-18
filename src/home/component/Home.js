import React from 'react'
import Thumbnail from './Thumbnail'

const Home = ({worksheets}) => (
    <section>
        <div className="row text-center">
            {worksheets ? worksheets.map((w) => (
                <Thumbnail key={w.get('id')} item={w}/>
            )) : null}
        </div>
    </section>
)

export default Home
