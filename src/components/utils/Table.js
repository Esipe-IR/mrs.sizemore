import React from 'react'

function Tbody(props) {
    const items  = props.items

    if (!items) {
        return (
            <tbody></tbody>
        )
    }
    
    const list = items.map((item, index) => 
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                <p>{item}</p>
            </td>
        </tr>
    );

    return (
        <tbody>
            {list}
        </tbody>
    )
}

const Table = ({definitions}) => (
    <table className="table">
        <thead>
            <tr>
                <th>Index</th>
                <th>Définition</th>
            </tr>
        </thead>
        
        <Tbody items={definitions} />
    </table>
)

export default Table
