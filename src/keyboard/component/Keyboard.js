import React from 'react'

const Keyboard = ({onClick, onDel, onClear, height, display}) => (
    <div>
        <div className="keyboard" style={height}>
            <div className="row">
                <div className="col-xs-12">
                    <button className="key" onClick={onClick}>A</button>
                    <button className="key" onClick={onClick}>Z</button>
                    <button className="key" onClick={onClick}>E</button>
                    <button className="key" onClick={onClick}>R</button>
                    <button className="key" onClick={onClick}>T</button>
                    <button className="key" onClick={onClick}>Y</button>
                    <button className="key" onClick={onClick}>U</button>
                    <button className="key" onClick={onClick}>I</button>
                    <button className="key" onClick={onClick}>O</button>
                    <button className="key" onClick={onClick}>P</button>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <button className="key" onClick={onClick}>Q</button>
                    <button className="key" onClick={onClick}>S</button>
                    <button className="key" onClick={onClick}>D</button>
                    <button className="key" onClick={onClick}>F</button>
                    <button className="key" onClick={onClick}>G</button>
                    <button className="key" onClick={onClick}>H</button>
                    <button className="key" onClick={onClick}>J</button>
                    <button className="key" onClick={onClick}>K</button>
                    <button className="key" onClick={onClick}>L</button>
                    <button className="key" onClick={onClick}>M</button>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <button className="key" onClick={onClick}>W</button>
                    <button className="key" onClick={onClick}>X</button>
                    <button className="key" onClick={onClick}>C</button>
                    <button className="key" onClick={onClick}>V</button>
                    <button className="key" onClick={onClick}>B</button>
                    <button className="key" onClick={onClick}>N</button>
                    <button className="key key-d" onClick={onDel}>Delete</button>
                    <button className="key key-d" onClick={onClear}>Clear</button>
                </div>
            </div>
        </div>

        <div className="keyboard-space" style={display}></div>
    </div>
)

export default Keyboard
