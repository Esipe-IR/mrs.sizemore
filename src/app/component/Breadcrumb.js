import React from 'react'

const Breadcrumb = (props) => (
    <ol className="breadcrumb">
        <li><a href="/">Home</a></li>

        {props.elem.map((e, i) => (
            <li key={i}><a href={e.link}>{e.title}</a></li>
        ))}
        
        <li className="active">{props.lastElem}</li>
    </ol>
)

export default Breadcrumb
