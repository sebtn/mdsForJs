/*---------------------------------------------------------------------*/
/*Complicated way, try to avoid, just to copare*/
let callAnddLog = (someFunc) => {
  return function () {
    let response = someFunc.apply(undefined, arguments)
    console.log('Result', response)
    return response
  }
}
console.log( add(100, 1) ) 

let add = (a, b) => a + b
let addAndLog = callAnddLog(add)
addAndLog(100, 200)


let square = (a) => a * a
let squareAndLog = callAnddLog(square)
squareAndLog(5)

/*---------------------------------------------------------------------*/
let Me = {
  name: 'Seb',
  printName: function(name)  {
    console.log(`My name one time ${this.name}`)
  },
  printNameTwo: function(who){
    console.log(`My name second time who, points tor agrs passed ${who} ${typeof(who)}`)

  }
}

/*---------------------------------------------------------------------*/
Me.printName() //seb
setTimeout(Me.printName , 2500)// undef
setTimeout(Me.printName.bind(Me) , 1000) //seb, binding callback to obj

/*---------------------------------------------------------------------*/
let SomeOther = Object.create(Me)
SomeOther.speak = (p) => console.log('This is args passing', p)
SomeOther.speak2 = (printName) => console.log('Alert String printName')
SomeOther.speak('Sebastian') // sebastian 
SomeOther.printName('otherName not Seb') // sebastian 
SomeOther.printNameTwo( (you) => this.you ) 

/*---------------------------------------------------------------------*/
aGirl = Object.create(SomeOther)
// point to Sebastian thru SomeOther 
// but available inside others object
aGirl.speak('aGirl from a aGirl.speak') //aGirl
aGirl.speak2('aGirl from a using speak2') //aGirl
aGirl.printName(this) // My name is Seb 
aGirl.printName('Using someOther girl name') // My name is Seb 

/*---------------------------------------------------------------------*/
let so = SomeOther['name']
console.log('so:' +  so) //Points to Seb
console.log('Me:' +  Me) //[Object: Object]
console.log('someOtherr:' +  SomeOther) //[Object: Object]

/*---------------------------------------------------------------------*/
const a = 'a'
const b = 'b' 
const some_A = {a}  
const some_B = {b}
const some_C = Object.assign({}, some_A, some_B)

console.log(some_C)

// Using a function as boilerplate
/*---------------------------------------------------------------------*/
const makeUser = ({
  name = "A made user",
  url = " some/thing/here.url",
  avatar = "ohter/here.gif"
}) => ({
  name,
  url, 
  avatar
})

const ignu = makeUser({
  name: "Ignu",
  url: "http://somethingShiny.shiny.com",
  avatar: "avatar/route.png"
})

const newCat = Object.create(ignu)
newCat.color = (c) => console.log("is my color", c + '?') 
newCat.color('green')

// Built a logger object and use it
/*---------------------------------------------------------------------*/
let Logger = {
  callAndLogToo: (someFun) => console.log(someFun)
}

const double = x => x * x
Logger.callAndLogToo(double(67)) //4489
const addToo = (a, b) => a + b
Logger.callAndLogToo(addToo(5,500)) //505

/*Rest and spread*/
const someTail = (head, ...tail) => tail 
Logger.callAndLogToo(someTail(1, 2, 3, 12)) // [2, 3, 12]

const tailShift = (head, ...tail) => [...tail, head]
Logger.callAndLogToo(tailShift(1, 2, 3, 12)) // [2, 3, 12, 1]

const highPass = cutoff => n => n >= cutoff
const get15 = highPass(15)(5)
Logger.callAndLogToo(get15)

/*---------------------------------------------------------------------*/
// try not to use classes or the new kyword because, 
// the [[prototype]] chain gets disrupted

class User {
  constructor({userName, avatar}) {
    this.useName = userName
    this.avatar = avatar
  }
}

const currentUser = new User({
  userName: "Foo",
  avatar: 'foo/bar.png'
})

User.rototype = {}

console.log(currentUser instanceof User, current user) // false
// {avatar: foo/bar.png, userName: "Foo"}
//''Absence of the [[Prototype]] link from factory instances will break caller instanceof checks.
//Absence of the .constructor property from factory instances could break code that relies on it.'' E.E
/*---------------------------------------------------------------------*/
// still disrupting even silently, the problem is the new keyword

const empty = ({constructor} = {}) => constructor ? new constructor() : undefined
const foo = [10]
console.log(empty(foo)) // [] works!

// However... Using promises
const empty = ({constructor} = {}) => constructor ? new constructor : undefined
const bar = Promise.resolve(10)
console.log(empty(bar)) // [TypeError: Promise resolver undefined is not a function]

// using constructor.of() insted of new constructor is not safe yet
// will return undefined for promises 

/*---------------------------------------------------------------------*/
// The correct way is to use a factory to add support for constructor and .of()

const createUser = ({
  userName = "Anon",
  avatar = '/anon.png'
} = {}) => ({
  userName, 
  avatar,
  constructor: createUser
})
createUser.of = createUser

const empty = ({ constructo } = {}) => constructor.of ? constructor.of() : undefined
const Foo = createUser({userName: 'Empty', avatar: 'Me.png'})
console.log(empty(Foo),// {avatar: "anon.png", userName: "Anon"}
Foo.constructor === createUserof, // true and check deep equality 
createUser.of === createUser) // true deep  eq 

/*---------------------------------------------------------------------*/
// The correct way is to use a factory to add support for constructor and .of()
// using Object.assign is way better form to make non enumerables props

const createUser = ({
  userName = "Anon",
  avatar = '/anon.png'
} = {}) => Object.assign(
  Obecjt.create({
  constructor: createUser
  }), {
    userName, 
    avatar,
  }
)
