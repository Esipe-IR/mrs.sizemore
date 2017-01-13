import React from 'react'

function Tbody(props) {
    const items  = props.items
    
    const list = items.map((item, index) => 
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                {item.w}
            </td>
            <td></td>
        </tr>
    );

    return (
        <tbody>
            {list}
        </tbody>
    )
}

const Resume = ({ items }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Word</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <Tbody items={items} />
            </table>
        </div>
    )   
}

export default Resume
