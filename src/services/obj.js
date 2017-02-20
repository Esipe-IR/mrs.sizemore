export const getRandom = (len, exclude = []) => {
    let min = Math.ceil(0)
    let max = Math.floor(len - 1)
    
    let random = Math.floor(Math.random() * (max - min + 1)) + min

    for (let i = 0; i < exclude.length; i++) {
        if (random === exclude[i]) {
            return getRandom(len, exclude)
        }
    }

    return random
}

export const replaceAll = (str, search, rpl) => str.replace(new RegExp(search, 'g'), rpl)
