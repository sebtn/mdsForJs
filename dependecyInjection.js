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
import {makeCreateUser} from './utils'

const connectioToDB = new db.databaseConnection({
  host: 'database.SomeApp.com',
  port: 2121
}) 
// const userManager = new userManager(connectionToDB) -> remove this line

// great way to abstarct db use
const createUser = makeCreateUser(connectionToDB) 

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
