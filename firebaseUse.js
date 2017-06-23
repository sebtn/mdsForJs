import firebase from 'firebase'
import {apiKey} from './../apiKey'
// Initialize Firebase
let  config = {
  apiKey,
  authDomain: "burn-after-todo.firebaseapp.com",
  databaseURL: "https://burn-after-todo.firebaseio.com",
  projectId: "burn-after-todo",
  storageBucket: "burn-after-todo.appspot.com",
  messagingSenderId: "370880579534"
}
firebase.initializeApp(config)

let firebaseRef = firebase.database().ref()

firebaseRef.set({
  app: {
    name: "Redux Todo",
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: "Seb",
    age: 1
  }
}) 

/* Oh, crud! */
/*-----------------------------------------------------------*/
/*Modifies the database wiping child node*/
// firebaseRef.child('app').set({
//   name: "Redux-Todo",
//   version: '1.0.1'
// })

/*-----------------------------------------------------------*/
/* Modifies only by updating, not wiping everything */
// firebaseRef.update({
//   isRunning: false
// })
// /*child solution update*/ 
// firebaseRef.child('app').update({
//   name: 'Todo app'
// }).then(() => { /*return a promise*/
//   console.log('Update worked')
// }), (error) => {
//   console.log('Update fails')
// }

/*Multi path update*/
// firebaseRef.update({
//   'app/name': 'Redux-Todo'
// })
/*child solution update*/ 
// firebaseRef.child('app').update({name: 'Todo app'})
// firebaseRef.child('user').update({name: 'Sebtn'})

/*-----------------------------------------------------------*/
/*Removes everything*/
// firebaseRef.remove()

/*remove by path*/
// firebaseRef.child('app/name').remove()
// firebaseRef.child('isRunning').remove()

/*by setting the value to null*/
/*firebaseRef.child('app').update({
  version: "2.0",
  name: null
})*/

/*firebaseRef.child('user').update({
  name: null
})
*/

/*-----------------------------------------------------------*/
/*Fetching form db */

// firebaseRef.once('value') returns a promise

/*entire db*/
/*firebaseRef.once('value').then( (snapshot) => {
  console.log('got entire db', snapshot.val() )
}, (e) => {
  console.log('Cannot fetch data ', e)
})
*/
/*Fetching children, passing a key*/
// firebaseRef.child('app').once('value').then( (snapshot) => {
//   console.log('got only child app: ', snapshot.val() )
// }, (e) => {
//   console.log('Cannot fetch data ', e)
// })

/*Listen for changes in db, fires multiple times,
 so promise is unavailable, use a cb instead*/
// firebaseRef.on('value', (snapshot) => {
//   console.log('got value: ', snapshot.val() )
// })

// firebaseRef.child('user').update({name: 'Sebtn'})

/*removes the listener*/
// firebaseRef.off() ---> wipes every listener

// firebaseRef.child('user').update({name: 'Sebtn'})

/*turn off only the cb*/
// let logData = (snapshot) => {
//   console.log('got value: ', snapshot.val() )
// }

// firebaseRef.on('value', logData)

// firebaseRef.child('user').update({name: 'Sebtn'})

// firebaseRef.off()

/*using cb*/
let changeAge = (snapshot) => {
  console.log('got VALUE: ', snapshot.val() )
  firebaseRef.child('user').update({name: 'Seb cb 2'})
}
firebaseRef.on('value', changeAge)

let changeIsrunning = (snapshot) => {
  console.log('got: ', snapshot.val() )
  firebaseRef.update({isRunning: false})
}
firebaseRef.on('value', changeIsrunning)
