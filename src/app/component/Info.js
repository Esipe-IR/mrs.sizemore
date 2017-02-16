import React from 'react'

const Info = ({status, msg, extra}) => {
    let c = "danger"

    if (status === null || typeof status === "undefined" || !msg) {
        c = "hidden"
    } else if (status) {
        c = "success"
    }

    return (
        <div>
            <div className="row">
                <div className="col-xs-12">
                    <div className={"pad-10 margin-btm-20 bar-" + c}>
                        <p>{msg}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="text-center extra-box">
                        {extra ? extra : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info
