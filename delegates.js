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

// Built a logger object 
/*---------------------------------------------------------------------*/
let logger = {
  callAndLogToo: function(someFun) {
    console.log(someFun)
  }
}

const double = x => x*x
const addToo = (a, b) => a + b
logger.callAndLogToo(addToo(5,500))

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

