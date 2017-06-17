import * as firebase from 'firebase'
import { Observable } from 'rxjs'
import { List, fromJS } from 'immutable'

const TIME_OUT = 5000
const WORKSHEETS = "/worksheets/"
const WORDS = "/words/"

const config = {  
    apiKey: "AIzaSyAAtbeRWywpjwOnDWuO7MhkE6kJgSQ1aHM",
    authDomain: "worksheet-trainer.firebaseapp.com",
    databaseURL: "https://worksheet-trainer.firebaseio.com",
    storageBucket: "worksheet-trainer.appspot.com",
    messagingSenderId: "396297620138"
}

const f = firebase.initializeApp(config)
const fdb = f.database()

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

    return Observable.forkJoin(worksheet, words, (worksheet, words) => worksheet ? worksheet.set("words", words) : null)
}
