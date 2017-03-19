import React from 'react'
import { logEvent } from '../services/analytics'

const NotFound = () => (
    <div>
        {logEvent("errorNotFound")}
    </div>
)

export default NotFound
