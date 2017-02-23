import * as firebase from 'firebase'
import { Map, List, fromJS } from 'immutable'

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

export const get = (ref) => {
    return new Promise((resolve, reject) => {
        ref.once('value')
        .then(snapshot => {
            if (!snapshot.val()) throw new Error("Unavailable !")
            resolve(fromJS(snapshot.val()))
        })
        .catch(err => reject(err))
    })
}

export const getWorksheets = () => {
    let ref = fdb.ref('/worksheets/')

    return new Promise((resolve, reject) => {
        ref.once('value')
        .then(snapshot => {
            let list = []

            snapshot.forEach(sheet => {
                let s = Map(sheet.val())
                list.push(s)
            })

            resolve(List(list))
        })
        .catch( err => reject(err) )
    })
}

export const getWorksheet = (id) => {
    let ref = fdb.ref('/worksheets/').child(id)
    return get(ref)
}

export const getWord = (id) => {
    let ref = fdb.ref('/words/').child(id)
    return get(ref)
}

export const getWords = (worksheet) => {
    let ref = fdb.ref('/words/').orderByChild("worksheet").equalTo(worksheet)

    return new Promise((resolve, reject) => {
        ref.once('value')
        .then(snapshot => {
            let list = []

            snapshot.forEach(word => {
                let w = fromJS(word.val())
                list.push(w)
            })
            
            resolve(List(list))
        })
        .catch(err => reject(err))
    })
}

export const getCompleteWorksheet = (id) => {
    let data = Map()
    let count = 0

    return new Promise((resolve, reject) => {
        getWorksheet(id)
        .then(result => { 
            data = result
            count++

            if (count > 1) resolve(result)
        })
        .catch(err => reject(err))

        getWords(id)
        .then(result => {
            count++

            if (count > 1) resolve(data.set("words", result))
        })
        .catch(err => reject(err))
    })
}

export const create = (parent, obj) => {
    let ref = fdb.ref()
    let key = ref.child(parent).push().key
    obj.id = key

    let update = {}
    update["/"+ parent + "/" + key] = obj

    return new Promise((resolve, reject) => { 
        ref.update(update)
        .then(() => resolve(fromJS(obj)))
        .catch(err => reject(err))
    })
}

export const update = (id, data) => {
    let update = {}
    update[id] = data
    
    return fdb.ref().update(update)
}

export const del = (id) => {
    let update = {}
    update[id] = null

    return fdb.ref().update(update)
}

export const createUser = (email, password) => {
    return new Promise((resolve, reject) => {
        fauth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            user.sendEmailVerification()
            resolve(user)
        })
        .catch(err => reject(err))
    })
}

export const connectUser = (email, password) => {
    return fauth.signInWithEmailAndPassword(email, password)
}

export const getRole = (id) => {
    return fdb.ref('roles').child(id).once('value')
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        fauth.onAuthStateChanged(function(user) {
            let _ = null

            if (!user) {
                return resolve(_)
            }

            _ = {}

            getRole(user.uid)
            .then(response => {
                let role = response.val()
                _.email = user.email
                _.emailVerified = user.emailVerified

                if (!role) {
                    return resolve(_)
                }

                _.role = role

                resolve(_)
            })
            .catch(err => {
                console.log(err)
                resolve(null)
            })
        })
    })
}

export const logoutUser = () => {
    return new Promise((resolve, reject) => {
        fauth.signOut()
        .then(resolve(), (error) => reject(error))
    })
}
