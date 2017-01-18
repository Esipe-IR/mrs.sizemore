import React from 'react'
import ModeSelection from '../ModeSelection'

const Game = ({id, theme, getMode}) => (
    <div className="box">
        <div className="box-title">
            <h2>Worksheet: {id}</h2>
            <em>Theme: {theme}</em>
            <hr />

            <ModeSelection />
        </div>

        <div className="box-body">
            {getMode()}
        </div>

        <div className="box-footer">
        </div>
    </div>
)

export default Game
