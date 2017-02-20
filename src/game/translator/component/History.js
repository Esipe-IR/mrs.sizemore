import React from 'react'

const getClass = (status) => {
    if (status === "error") return "danger"
    return status
}

const History = (props) => (
    <table className="table">
        <thead>
            <tr>
                <th>En</th>
                <th>Fr</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {props.items ? props.items.reverse().map((item, index) => (
                <tr key={index}>
                    <td>{item.get("en")}</td>
                    <td>{item.get("fr")}</td>
                    <td>
                        <span className={"label label-" + getClass(item.get("status"))}>
                            {item.get("status")}
                        </span>
                    </td>
                </tr>
            )) : null}
        </tbody>
    </table>
)

export default History
