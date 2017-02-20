import React from 'react'

const Breadcrumb = ({items = [], lastItem, push}) => (
    <ol className="breadcrumb">
        <li>
            <a href="#" onClick={() => push("/")}>Home</a>
        </li>

        {items.map((i, index) => (
            <li key={index}>
                <a href="#" onClick={() => push(i.link)}>{i.title}</a>
            </li>
        ))}
        
        <li className="active">
            {lastItem}
        </li>
    </ol>
)

export default Breadcrumb
