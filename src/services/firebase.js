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
    let w = fb.ref("worksheets")

    return new Promise((resolve, reject) => {
        w.on('value', snapshot => {
            let list = []

            snapshot.forEach(function(sheet) {
                list.push(sheet.val())
            })

            resolve(list)
        }, err => {
            reject(err)
        })
    })
}
