import React from 'react'
import Thumbnail from './Thumbnail'

const Home = ({worksheets}) => (
    <div>
        <div className="row text-center">
            {worksheets.map((w) => (
                <Thumbnail key={w.id} item={w}/>
            ))}
        </div>
    </div>
)

export default Home
