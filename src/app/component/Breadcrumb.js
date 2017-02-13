import React from 'react'

const Breadcrumb = ({items = [], lastItem}) => (
    <ol className="breadcrumb">
        <li><a href="/">Home</a></li>

        {items.map((i, index) => (
            <li key={index}>
                <a href={i.link}>{i.title}</a>
            </li>
        ))}
        
        <li className="active">{lastItem}</li>
    </ol>
)

export default Breadcrumb
