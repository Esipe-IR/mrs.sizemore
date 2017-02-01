import React from 'react'
import Thumbnail from './Thumbnail'

const Home = ({worksheets}) => (
    <div>
        <div className="row text-center">
            {worksheets ? worksheets.map((w) => (
                <Thumbnail key={w.get('id')} item={w}/>
            )) : null}
        </div>
    </div>
)

export default Home
