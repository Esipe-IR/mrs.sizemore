export const logEvent = (type, value, params) => {
    if (!window.FB || window.dev) {
        console.log("block");
        return;
    }

    try {
        window.FB.AppEvents.logEvent(type, value, params)
    } catch (e) {
        console.log(e);
    }
}
