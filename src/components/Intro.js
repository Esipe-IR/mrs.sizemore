import React from 'react'
import { browserHistory } from 'react-router'

let onClick = () => (
    browserHistory.push("/game")
)

const Intro = () => (
    <input
        className="submit" 
        type="submit"
        value="Play"
        onClick={ onClick }
    />
)

export default Intro
