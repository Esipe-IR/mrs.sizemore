import Fingerprint2 from 'fingerprintjs2'

export const getFingerPrint = () => {
    return new Promise((resolve, reject) => {
        if (localStorage.getItem("fingerprint")) {
            resolve(localStorage.getItem("fingerprint"))
        }

        new Fingerprint2().get(function(result){
            localStorage.setItem("fingerprint", result)
            resolve(result)
        })
    })
}
