import React from 'react'

const Result = ({result}) => {
    if (!result) {
        return null
    }

    if (result.status) {
        return (
            <div className="bg-success pad-10 margin-btm-20">
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

                <p>{result.msg}</p>
            </div>
        )
    }

    return (
        <div className="bg-danger pad-10 margin-btm-20">
            <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>

            <p>{result.msg}</p>
        </div>
    )
}

export default Result
