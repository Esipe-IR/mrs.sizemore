import React from 'react'

const Result = ({result}) => {
    if (!result) {
        return null
    }

    if (result.status) {
        return (
            <div className="bg-success pad-10 margin-btm-20">
                <p>{result.msg}</p>
            </div>
        )
    }

    return (
        <div className="bg-danger pad-10 margin-btm-20">
            <p>{result.msg}</p>
        </div>
    )
}

export default Result
