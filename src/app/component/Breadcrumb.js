import React from 'react'

const Breadcrumb = ({items = [], lastItem, push}) => (
    <ol className="breadcrumb">
        <li>
            <button className="reset-btn" onClick={() => push("/")}>Home</button>
        </li>

        {items.map((i, index) => (
            <li key={index}>
                <button className="reset-btn" onClick={() => push(i.link)}>{i.title}</button>
            </li>
        ))}
        
        <li className="active">
            {lastItem}
        </li>
    </ol>
)

export default Breadcrumb
