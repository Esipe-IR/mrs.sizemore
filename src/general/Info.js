import React from 'react'

const Info = ({status, msg}) => {
    let c = "bg-danger"

    if (status === null || status === "undefined" || msg === '') {
        c = "hidden"
    } else if (status) {
        c = "bg-success"
    }

    return (
        <div className="row">
            <div className="col-xs-12">
                <div className={"pad-10 margin-btm-20 " + c}>
                    <p>{msg}</p>
                </div>
            </div>
        </div>
    )
}

export default Info
