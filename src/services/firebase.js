import * as firebase from 'firebase';

const config = {  
    apiKey: "AIzaSyAAtbeRWywpjwOnDWuO7MhkE6kJgSQ1aHM",
    authDomain: "worksheet-trainer.firebaseapp.com",
    databaseURL: "https://worksheet-trainer.firebaseio.com",
    storageBucket: "worksheet-trainer.appspot.com",
    messagingSenderId: "396297620138"
}

const f = firebase.initializeApp(config)
const fdb = f.database()
const fauth = f.auth()
let _USER = null

export const getWorksheets = () => {
    let ref = fdb.ref('/worksheets/')

    return new Promise((resolve, reject) => {
        ref.once('value')
        .then(snapshot => {
            let list = []

            snapshot.forEach(sheet => {
                list.push(sheet.val())
            })

            resolve(list)
        })
        .catch( err => reject(err) )
    })
}

export const getWorksheet = (id) => {
    let ref = fdb.ref('/worksheets/' + id)

    return new Promise((resolve, reject) => {
        ref.once('value')
        .then(snapshot => resolve(snapshot.val()))
        .catch(err => reject(err))
    })
}

export const getWord = (id) => {
    let ref = fdb.ref('/words/' + id)

    return new Promise((resolve, reject) => {
        ref.once('value')
        .then(snapshot => {
            if (!snapshot.val()) reject("Unavailable word !")
            
            resolve(snapshot.val())
        })
        .catch(err => reject(err))
    })
}

export const getWords = (id) => {
    let ref = fdb.ref('/words/')

    return new Promise((resolve, reject) => {
        ref.orderByChild("worksheet").equalTo(id).once('value')
        .then(snapshot => resolve(snapshot.val()))
        .catch(err => reject(err))
    })
}

export const getCompleteWorksheet = (id) => {
    let data = {
        worksheet: {},
        words: []
    }

    let count = 0

    return new Promise((resolve, reject) => {
        getWorksheet(id)
        .then(result => { 
            if (!result) reject("Unavailable worksheet !")

            data["worksheet"] = result
            count++

            if (count > 1) resolve(data)
        })
        .catch(err => reject(err))

        getWords(id)
        .then(result => {
            data["words"] = result
            count++

            if (count > 1) resolve(data)
        })
        .catch(err => reject(err))
    })
}

export const create = (parent, obj) => {
    let ref = fdb.ref()
    let key = ref.child(parent).push().key
    let update = {}
    
    update["/"+ parent + "/" + key] = obj
    obj.id = key

    return ref.update(update)
}

export const update = (id, data) => {
    let update = {}
    update[id] = data
    
    return fdb.ref().update(update)
}

export const saveWorksheet = (data) => {
    let newKey = fdb.ref().child('worksheets').push().key
    data.id = newKey

    var updates = {}
    updates['/worksheets/' + newKey] = data

    return fdb.ref().update(updates)
}

export const createUser = (email, password) => {
    return fauth.createUserWithEmailAndPassword(email, password)
}

export const connectUser = (email, password) => {
    return fauth.signInWithEmailAndPassword(email, password)
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        fauth.onAuthStateChanged(function(user) {
            let _ = null

            if (user) {
                _ = {
                    email: user.email,
                    defined: true
                }
            }

            resolve(_)
        })
    })
}
