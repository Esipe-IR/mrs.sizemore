import { fromJS } from 'immutable'

const getSchema = (pathArr, nObj) => {
    let schema = nObj
    let len = pathArr.length - 1

    for (let i = 0; i < len; i++) {
        schema = schema[pathArr[i]]
    }

    return schema
}

export const addKey = (pathArr, value, obj) => {
    let nObj = obj.toJS()
    let schema = getSchema(pathArr, nObj)
    let len = pathArr.length - 1
    
    if (!schema[pathArr[len]]) {
        schema[pathArr[len]] = []
    }

    schema[pathArr[len]].push(value)

    let immutable = fromJS(nObj)

    return immutable
}

export const editKey = (pathArr, value, obj) => {
    let nObj = obj.toJS()
    let schema = getSchema(pathArr, nObj)
    let len = pathArr.length - 1

    schema[pathArr[len]] = value

    let immutable = fromJS(nObj)

    return immutable
}

export const deleteKey = (pathArr, obj) => {
    let nObj = obj.toJS()
    let schema = getSchema(pathArr, nObj)
    let len = pathArr.length - 1

    if (Array.isArray(schema)) {
        schema.splice(pathArr[len], 1)
    } else {
         delete schema[pathArr[len]]
    }

    let immutable = fromJS(nObj)

    return immutable
}
