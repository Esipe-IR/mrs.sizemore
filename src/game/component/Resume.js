import React from 'react'

const Resume = ({result = []}) => (
    <table className="table">
        <thead>
            <tr>
                <th>French</th>
                <th>English</th>
            </tr>
        </thead>
        <tbody>
            {result.map((r) => (
                <tr>
                    <td>{r.fr}</td>
                    <td>{r.en}</td>
                </tr>
            ))}
        </tbody>
    </table>
)

export default Resume
