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

const get = (ref) => {
    return Observable.create(observer => {
        Observable.from(ref.once('value'))
        .subscribe(
            snapshot => {
                if (!snapshot.val()) observer.error(new Error("Unavailable !"))
                observer.next(fromJS(snapshot.val()))
            },
            err => observer.error(err),
            complete => observer.complete()
        )
    }).timeout(TIME_OUT)
}

const getToList = (ref) => {
    return Observable.create(observer => {
        Observable.from(ref.once('value'))
        .subscribe(
            snapshot => observer.next(snapshotToList(snapshot)),
            err => observer.error(err),
            complete => observer.complete()
        )
    }).timeout(TIME_OUT)
}

export const getWorksheets = () => {
    let ref = fdb.ref('/worksheets/')
    return getToList(ref)
}

export const getWords = (id) => {
    if (!id) throw new Error("FirebaseService - getWords: ID must be defined")

    let ref = fdb.ref('/words/').orderByChild("worksheet").equalTo(id)
    return getToList(ref)
}

export const getWorksheet = (id) => {
    if (!id) throw new Error("FirebaseService - getWorksheet: ID must be defined")

    let ref = fdb.ref('/worksheets/').child(id)
    return get(ref)
}

export const getWord = (id) => {
    if (!id) throw new Error("FirebaseService - getWord: ID must be defined")

    let ref = fdb.ref('/words/').child(id)
    return get(ref)
}

export const getCompleteWorksheet = (id) => {
    return Observable.create(observer => {
        getWorksheet(id).subscribe(
            worksheet => {
                getWords(id).subscribe(
                    words => worksheet = worksheet.set("words", words),
                    err => observer.error(err),
                    complete => {
                        observer.next(worksheet)
                        observer.complete()
                    }
                )
            },
            err => observer.error(err)
        )
    })
}

const set = (ref, obj) => {
    return Observable.create(observer => {
        Observable.from(ref.update(obj))
        .subscribe(
            resp => observer.next(resp),
            err => observer.error(err),
            complete => observer.complete()
        )
    })
}

export const create = (parent, obj) => {
    let ref = fdb.ref().child(parent)
    let key = ref.push().key
    obj.id = key

    let update = {}
    update[key] = obj

    return set(ref, update)
}

export const update = (id, data) => {
    let update = {}
    update[id] = data
    
    return set(fdb.ref(), update)
}

export const del = (id) => {
    return update(id, null)
}

export const createUser = (email, password) => {
    return Observable.create(observer => {
        Observable.from(fauth.createUserWithEmailAndPassword(email, password))
        .subscribe(
            user => user.sendEmailVerification(),
            err => observer.error(err),
            complete => {
                observer.next(complete)
                observer.complete()
            }
        )
    })
}

export const connectUser = (email, password) => {
    return Observable.create(observer => {
        Observable.from(fauth.signInWithEmailAndPassword(email, password))
        .subscribe(
            resp => console.log(resp),
            err => console.log(err),
            complete => console.log(complete)
        )
    })
}

export const getRole = (id) => {
    let ref = fdb.ref('roles').child(id)
    return get(ref)
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
