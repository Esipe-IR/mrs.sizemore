export const getRandom = (len) => {
    let min = Math.ceil(0)
    let max = Math.floor(len - 1)
    
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const replaceAll = (str, search, rpl) => str.replace(new RegExp(search, 'g'), rpl)
