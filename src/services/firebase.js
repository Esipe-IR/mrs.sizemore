import * as firebase from 'firebase';

const config = {  
    apiKey: "AIzaSyAAtbeRWywpjwOnDWuO7MhkE6kJgSQ1aHM",
    authDomain: "worksheet-trainer.firebaseapp.com",
    databaseURL: "https://worksheet-trainer.firebaseio.com",
    storageBucket: "worksheet-trainer.appspot.com",
    messagingSenderId: "396297620138"
}

const fb = firebase.initializeApp(config).database()

export const getWorksheets = () => {
    let ref = fb.ref("/worksheets/")

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

export const getWorksheet = (sheet) => {
    let ref = fb.ref("/worksheets/" + sheet)

    return new Promise((resolve, reject) => {
        ref.once('value')
        .then( snapshot => resolve(snapshot.val()) )
        .catch( err => reject(err) )
    })
}
