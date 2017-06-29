// function one (name, location) {
//   console.log(name, location)
// }

// function two () {
//   console.log('args', arguments)
// }

// function three () {
//   console.log('args', arguments)
//   one.apply(undefined, arguments) 
// }

// two('Seb', 'Mtl') // args {' 0': 'seb', '1': 'mtl'}
// two.apply(undefined, ['lili', 'med']) // args{ '0': 'lili', '1': 'med'}
// three('cat', 'mtl') // args{ '0': 'cat', ' 1': 'mtl' }  \n  cat mtl 


// 3 props higher order functions -> func modifies how other func behave
// 1. is a function
// 2. take a function a an arg
// 3. return a function 

/* Take a function and add additional behavior*/
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
