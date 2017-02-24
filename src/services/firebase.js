import * as firebase from 'firebase'
import { Observable } from 'rxjs'
import { List, fromJS } from 'immutable'

const TIME_OUT = 5000
const WORKSHEETS = "/worksheets/"
const WORDS = "/words/"
const ROLES = "/roles/"

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

const _getToRaw = (ref) => {
    return _once(ref)
    .map(snapshot => snapshot.val())
}

const _set = (ref, obj) => {
    return Observable.from(ref.update(obj))
}

const _update = (parent, id, data) => {
    let ref = fdb.ref(parent)

    let update = {}
    update[id] = data
    
    return _set(ref, update)
}

const _create = (parent, data) => {
    let id = fdb.ref(parent).push().key
    data.id = id

    return _update(parent, id, data).map(() => (data))
}

/**
* @function getWorksheets
* @author Vincent Rasquier
* @return {Observable} Observer will get worksheets or error
*/
export const getWorksheets = () => {
    let ref = fdb.ref(WORKSHEETS)

    return _getToList(ref)
}

/**
* @function getWords
* @author Vincent Rasquier
* @param  {string} id Worksheet's id of the word
* @return {Observable} Observer will get an array of words or empty array or error
*/
export const getWords = (id) => {
    if (!id) throw new Error("FirebaseService - getWords: ID must be defined")
    let ref = fdb.ref(WORDS).orderByChild("worksheet").equalTo(id)

    return _getToList(ref)
}

/**
* @function getWorksheet
* @author Vincent Rasquier
* @param  {string} id Worksheet's id
* @return {Observable} Observer will get worksheet or error
*/
export const getWorksheet = (id) => {
    if (!id) throw new Error("FirebaseService - getWorksheet: ID must be defined")
    let ref = fdb.ref(WORKSHEETS).child(id)

    return _getToImmu(ref)
}

/**
* @function getWord
* @author Vincent Rasquier
* @param  {string} id Word's id
* @return {Observable} Observer will get word or error
*/
export const getWord = (id) => {
    if (!id) throw new Error("FirebaseService - getWord: ID must be defined")
    let ref = fdb.ref(WORDS).child(id)

    return _getToImmu(ref)
}

/**
* @function getCompleteWorksheet
* @author Vincent Rasquier
* @param  {string} id Worksheet's id
* @return {Observable} Observer will get complete worksheet or error
*/
export const getCompleteWorksheet = (id) => {
    if (!id) throw new Error("FirebaseService - getCompleteWorksheet: ID must be defined")
    let worksheet = getWorksheet(id)
    let words = getWords(id)

    return Observable.forkJoin(worksheet, words, (worksheet, words) => worksheet.set("words", words))
}

/**
* @function getRole
* @author Vincent Rasquier
* @param  {string} id User's uid
* @return {Observable} Observer will get bool or error
*/
export const getRole = (id) => {
    if (!id) throw new Error("FirebaseService - getRole: ID must be defined")
    let ref = fdb.ref(ROLES).child(id)
    
    return _getToRaw(ref)
}

/**
* @function setWorksheet
* @author Vincent Rasquier
* @param  {string|null} id    Worksheet's id
* @param  {Object} worksheet Representation of worksheet
* @return {Observable} Observer will get 
*/
export const setWorksheet = (id, worksheet) => {
    if (!worksheet) throw new Error("FirebaseService - setWorksheet: worksheet must be defined")

    if (id) return _update(WORKSHEETS, id, worksheet)
    return _create(WORKSHEETS, worksheet)
}

/**
* @function setWord
* @author Vincent Rasquier
* @param  {string|null} id   Word's id
* @param  {Object} word Word's representation
* @return {Observable} Observer will get 
*/
export const setWord = (id, word) => {
    if (!word) throw new Error("FirebaseService - setWord: word must be defined")

    if (id) return _update(WORDS, id, word)
    return _create(WORDS, word)
}

/**
* @function setCompleteWorksheet
* @author Vincent Rasquier
* @param  {string} id        Worksheet's id
* @param  {Object} worksheet Worksheet's representation
* @param  {Array} words     Words' representation
* @return {Observable} Observer will get
*/
export const setCompleteWorksheet = (id, worksheet, words) => {
    return Observable.create(observer => {
        setWorksheet(id, worksheet).subscribe(
            response => {
                if (!words) return observer.next()

                words.forEach((w, i) => {
                    w.worksheet = response.id
                    setWord(w.id, w)
                })

                return observer.next()
            },
            err => observer.error(err),
            complete => observer.complete()
        )
    })
}

/**
* @function createUser
* @author Vincent Rasquier
* @param  {string} email    Email of the user
* @param  {string} password Password of the user
* @return {Observable} Observer will get null or error
*/
export const createUser = (email, password) => {
    return Observable.from(fauth.createUserWithEmailAndPassword(email, password))
    .map(user => user.sendEmailVerification())
}

/**
* @function connectUser
* @author Vincent Rasquier
* @param  {string} email    Email of the user
* @param  {string} password Password of the user
* @return {Observable} Observer will get the current user or error
*/
export const connectUser = (email, password) => {
    return Observable.from(fauth.signInWithEmailAndPassword(email, password))
}

/**
* @function getCurrentUser
* @author Vincent Rasquier
* @return {Observable} Observer will get the current user or error
*/
export const getCurrentUser = () => {
    return Observable.create(observer => {
        fauth.onAuthStateChanged(user => {
            if (!user) return observer.next()

            getRole(user.uid).subscribe(
                role => user.role = role,
                err => observer.error(err),
                complete => {
                    observer.next(user)
                    observer.complete()
                }
            )
        })
    })
}

export const logoutUser = () => {
    return new Promise((resolve, reject) => {
        fauth.signOut()
        .then(resolve(), (error) => reject(error))
    })
}
