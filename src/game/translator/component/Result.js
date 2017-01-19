import React from 'react'

const Result = ({result}) => {
    if (!result) {
        return null
    }

    if (result.status) {
        return (
            <div className="panel panel-success">
                <div className="panel-heading">Success</div>
                <div className="panel-body">
                    {result.msg}
                </div>
            </div>
        )
    }

    return (
        <div className="panel panel-danger">
            <div className="panel-heading">Fail</div>
            <div className="panel-body">
                <p>{result.msg}</p>
            </div>
        </div>
    )
}

export default Result
