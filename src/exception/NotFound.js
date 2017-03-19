import React from 'react'

const NotFound = () => (
    <div>
        {window.FB.AppEvents.logEvent("errorNotFound")}
    </div>
)

export default NotFound
