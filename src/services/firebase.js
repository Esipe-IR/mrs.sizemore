import * as firebase from 'firebase'
import { Observable } from 'rxjs'
import { List, fromJS } from 'immutable'

const TIME_OUT = 5000
const WS = "/worksheets/"
const W = "/words/"

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

const _getToImmu = (ref) => {
    return _once(ref)
    .map(snapshot => fromJS(snapshot.val()))
}

const _getToList = (ref) => {
    return _once(ref)
    .map(snapshot => snapshotToList(snapshot))
}

const _set = (ref, obj) => {
    return Observable.from(ref.update(obj))
}

const _update = (parent, id, data) => {
    let ref = fdb.ref().child(parent)

    let update = {}
    update[id] = data
    
    return _set(ref, update)
}

const _create = (parent, data) => {
    let id = fdb.ref().child(parent).push().key
    data.id = id

    return _update(parent, id, data)
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
export const setWorksheet = (id, worksheet) => {
    if (id) return _update(WS + id, worksheet)
    return _create(WS, worksheet)
}
export const setWord = (id, word) => {
    if (id) return _update(W + id, word)
    return _create(W, word)
}

export const setCompleteWorksheet = (id, worksheet, words) => {
    createWorksheet(worksheet).subscribe(
        response => {
            if (words) return

            words.forEach((w, i) => {
                w.worksheet = response.get("id")
                createWord(w)
            })
        }
    )
}

/**
 * USERS
 */
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
