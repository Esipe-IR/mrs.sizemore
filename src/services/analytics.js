export const logEvent = (type, value, params) => {
    if (window.FB) {
        try {
            window.FB.AppEvents.logEvent(type, value, params)
        } catch (e) {}
    }
}
