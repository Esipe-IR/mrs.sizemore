export const logEvent = (type, value, params) => {
    if (window.FB) {
        window.FB.AppEvents.logEvent(type, value, params)
    } else {
        console.log("FB undefiend")
    }
}
