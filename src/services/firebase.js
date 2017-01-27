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
    let ref = fb.ref('/worksheets/')

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
    let ref = fb.ref('/worksheets/' + id)

    return new Promise((resolve, reject) => {
        ref.once('value')
        .then(snapshot => resolve(snapshot.val()))
        .catch(err => reject(err))
    })
}

export const getWord = (id) => {
    let ref = fb.ref('/words/' + id)

    return new Promise((resolve, reject) => {
        ref.once('value')
        .then(snapshot => resolve(snapshot.val()))
        .catch(err => reject(err))
    })
}

export const getWords = (id) => {
    let ref = fb.ref('/words/')

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

export const saveWorksheet = (data) => {
    let newKey = fb.ref().child('worksheets').push().key
    data.id = newKey

    var updates = {}
    updates['/worksheets/' + newKey] = data

    return fb.ref().update(updates)
}
