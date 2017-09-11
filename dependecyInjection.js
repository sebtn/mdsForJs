// USING CLASSES
import db from './some_Db'
import App from './SomeApp'
import userManager from './UserManager'

const connectioToDB = new db.databaseConnection({
  host: 'database.SomeApp.com',
  port: 2121
}) 

const userManager = new userManager(connectionToDB)
const app = new App(userManager)
app.start()

//--------------------------------------------
// in userManager.js file

class UserManager {
  constructor(databaseConnection) {
    this._connection = databaseConnection
  }
  createUser(name) {
    return this._connection.table('users').insert({
       is_new: true,
       full_name: name
    }).then(user => user.id)
  }
}

export default UserManager

// REFACTOR USING FUCNTIONS 
//---------------------------------------------------------

import db from './some_Db'
import App from './SomeApp'
// import userManager from './UserManager' -> remove this line
import {
  makeCreateUser,
  makeDleteUser,
  makeUpdateUser,
  makeBanUser
} from './utils'

import makeUserUtils

const connectioToDB = new db.databaseConnection({
  host: 'database.SomeApp.com',
  port: 2121
}) 
const mailService = ({}) || new Something
// const userManager = new userManager(connectionToDB) -> remove this line

// great way to abstarct db use
/*const createUser    = makeCreateUser(connectionToDB) 
const deleteUser    = makeDeleteUser(connectionToDB) 
const updateUser   = makeUpdateUser(connectionToDB) 
const banUser        = makeBanUser(connectionToDB, emailService) */

const {
  makeCreateUser,
  makeDleteUser,
  makeUpdateUser,
  makeBanUser
} = makeUserUtils({connection, mailService}) 

const app = new App(createUser)
app.start()

//--------------------------------------------
// in utils.js file
// facotry that creates create user function
// function that create fucntions is a Higer Order Funcs
// closure make connection available

export const makeCreateUser = connection => name =>  
  connection.table('users').insert({ // note 'this' is absent
    is_new: true,
    full_name: name
}).then(user => user.id)

// you can now use createUser('Jon Snow')
// currying in depency injection is a great way to avoid classes syntax
//--------------------------------------------
// having more than one method in utils.js
// still injecting 'connection' 
// by sharing the scope of the arg
// Similar to classes
// over sharing dependencies makes
//  less obvious what is happening
const makeUserUtils = ({ connection, mailService }) => ({
  createUser : name =>  
    connection.table('users').insert({ // note 'this' is absent
      is_new: true,
      full_name: name
    })
    .then(user => user.id)

  deleteUser :  id =>  
      connection.table('users').delete(id)

    banuser: id => 
      connection.table('users'.update({
        $set: { banned: true }
      })
      .then(() => mailService('someOne@mail.com', 'Ibannedyou'))

})

export default makeUserUtils

// ---------------------------------------------------------------------
// Single function factories is the way to go.
// grouping things will reveal it self before get ridding of repeat
// manage repeat when it is overly repeated
// ideally you would have this utils.js in a different file
// allowing import or 'consuming' in other files one by one methods
// defensive programmin with no upfron application.
export const makeCreateUser = connection => name =>  
  connection.table('users').insert({ // note 'this' is absent
    is_new: true,
    full_name: name
  })
  .then(user => user.id)

export const makeDeleteUser = connection => id =>  
  connection.table('users').delete(id)

export const makeBanUser = connection => id =>
  connection.table('users').update({
        $set: { banned: true }
      })
      .then(() => mailService('someOne@mail.com', 'Ibannedyou'))

