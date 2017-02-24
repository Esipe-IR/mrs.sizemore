import * as firebase from 'firebase'
import { Observable } from 'rxjs'
import { List, fromJS } from 'immutable'

const TIME_OUT = 5000
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

const snapshotToList = (snapshot) => {
    let list = []

    snapshot.forEach(snap => {
        let value = fromJS(snap.val())
        list.push(value)
    })
    
    return List(list)
}

/**
 * CORE
 */
const _once = (ref) => {
    return Observable.from(ref.once('value'))
    .timeout(TIME_OUT)
}

const _update = (ref, obj) => {
    return Observable.from(ref.update(obj))
}

const _getToImmu = (ref) => {
    return _once(ref)
    .map(snapshot => fromJS(snapshot.val()))
}

const _getToList = (ref) => {
    return _once(ref)
    .map(snapshot => snapshotToList(snapshot))
}

/**
 * Getters
 */
export const getWorksheets = () => {
    let ref = fdb.ref('/worksheets/')

    return _getToList(ref)
}

export const getWords = (id) => {
    if (!id) throw new Error("FirebaseService - getWords: ID must be defined")
    let ref = fdb.ref('/words/').orderByChild("worksheet").equalTo(id)

    return _getToList(ref)
}

export const getWorksheet = (id) => {
    if (!id) throw new Error("FirebaseService - getWorksheet: ID must be defined")
    let ref = fdb.ref('/worksheets/').child(id)

    return _getToImmu(ref)
}

export const getWord = (id) => {
    if (!id) throw new Error("FirebaseService - getWord: ID must be defined")
    let ref = fdb.ref('/words/').child(id)

    return _getToImmu(ref)
}

export const getCompleteWorksheet = (id) => {
    if (!id) throw new Error("FirebaseService - getCompleteWorksheet: ID must be defined")
    let worksheet = getWorksheet(id)
    let words = getWords(id)

    return Observable.forkJoin(worksheet, words, (worksheet, words) => worksheet.set("words", words))
}

export const getRole = (id) => {
    let ref = fdb.ref('roles').child(id)
    
    return _getToImmu(ref)
}

/**
 * Setters
 */
export const create = (parent, obj) => {
    let ref = fdb.ref().child(parent)
    let key = ref.push().key
    obj.id = key

    let update = {}
    update[key] = obj

    return _update(ref, update)
}

export const update = (id, data) => {
    let update = {}
    update[id] = data
    
    return _update(fdb.ref(), update)
}

export const del = (id) => {
    return update(id, null)
}

export const createUser = (email, password) => {
    return Observable.from(fauth.createUserWithEmailAndPassword(email, password))
    .map(user => user.sendEmailVerification())
}

export const connectUser = (email, password) => {
    return Observable.from(fauth.signInWithEmailAndPassword(email, password))
}

/**
 * To do
 */
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
