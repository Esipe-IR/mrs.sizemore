import React from 'react'

const Result = ({status, info}) => {
    if (status === null) {
        return null
    }

    if (status) {
        return (
            <div className="panel panel-success">
                <div className="panel-heading">Success</div>
                <div className="panel-body">
                    {info}
                </div>
            </div>
        )
    }

    return (
        <div className="panel panel-danger">
            <div className="panel-heading">Fail</div>
            <div className="panel-body">
                <p>{info}</p>
            </div>
        </div>
    )
}

export default Result
