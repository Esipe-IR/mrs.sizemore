import React from 'react'
import Thumbnail from './Thumbnail'

const Home = ({worksheets}) => (
    <div className="row text-center">
        {worksheets ? worksheets.map((w) => (
            <Thumbnail key={w.get('id')} item={w}/>
        )) : null}
    </div>
)

export default Home
