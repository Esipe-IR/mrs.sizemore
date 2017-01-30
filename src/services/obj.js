const getSchema = (pathArr, nObj) => {
    let schema = nObj
    let len = pathArr.length - 1

    for (let i = 0; i < len; i++) {
        schema = schema[pathArr[i]]
    }

    return schema
}

export const addKey = (pathArr, value, obj) => {
    let nObj = JSON.parse(JSON.stringify(obj))
    let schema = getSchema(pathArr, nObj)
    schema[pathArr[pathArr.length - 1]].push(value)

    return nObj
}

export const editKey = (pathArr, value, obj) => {
    let nObj = JSON.parse(JSON.stringify(obj))
    let schema = getSchema(pathArr, nObj)
    schema[pathArr[pathArr.length - 1]] = value

    return nObj
}

export const deleteKey = (pathArr, obj) => {
    let nObj = JSON.parse(JSON.stringify(obj))
    let schema = getSchema(pathArr, nObj)
    delete schema[pathArr[pathArr.length - 1]]

    return nObj
}
