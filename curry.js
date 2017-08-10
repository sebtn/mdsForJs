/* Signatures of functions:
  1: function name
  2: list of params.type, each or some, may be named
  3. type or the return value
  functionName(param1: Type, param2: Type) => Type
*/

/* Signature  
  double(x:number => number)
*/
const double = x => x * x
const addTwo = x => x + 2
/*
Luckily for us, JavaScript has first class functions.
Just like numbers, strings, or objects, functions can be:
1. Assigned as an identifier (variable) value
2. Assigned to object property values
3. Passed as arguments
4. Returned from functions 
(Eric Elliott)
*/

/*------------------------------------------------------*/
// Recursive
const curry = (
  f, arr = []
) => (...args) => (
  a => a.length === f.length ? 
  f(...a) : 
  curry(f, a)
)([...arr, ...args])

/*------------------------------------------------------*/
const silencer = words => {
  const leftBehind = []
  for(let i = 0, { length } = words; i < length; i++) {
    const word = words[i]
    if(word.length !== 3) leftBehind.push(word)
  }
  return leftBehind
}

console.log( silencer(['something', 'are', 'beauty', 'gasp']) )
silencer(['something', 'are', 'beauty', 'gasp']) //[ 'something', 'beauty', 'gasp' ]

/*------------------------------------------------------*/
const startsWithS = words => {
  const leftBehind = []
  for(let i = 0, { length } = words; i < length; i++) {
    const word = words[i]
    if(word.startsWith('s')) leftBehind.push(word)
  }
  return leftBehind
}

console.log( startsWithS(['something', 'are', 'beauty', 'gasp']) ) 
startsWithS(['something', 'are', 'beauty', 'gasp']) // ['something']

/*------------------------------------------------------*/
const reduce = (reducer, initial, arr) => {
  // shared
  let acc = initial
  for(let i = 0, length = arr.length; i < length; i++) {
    // stuff only used in reduce() call
    acc = reducer(acc , arr[i])
  // more shared stuff    
  }
  return acc
}

console.log( reduce((acc, curr) => acc + curr, 0, [1,5,15]) )
reduce((acc, curr) => acc + curr, 0, [1,5,15]) //21

// Filtering using reduce
/*------------------------------------------------------*/
const filterOne = (
  fn, arr // here fn is called predicate
) => reduce((acc, curr) => fn(curr) ?
  acc.concat([curr]) :
  acc, [], arr 
)

const filterToo = (fn, arr) =>  arr.reduce((newArr, item) => {
  return fn(item) ? newArr.concat([item]) : newArr 
}, [])

/*------------------------------------------------------*/
const silence = words => filterOne(
  word => word.length !== 3,
  words
)

console.log( silence(['some', 'are', 'be', 'g']) ) //[ 'some', 'be', 'g' ]

/*------------------------------------------------------*/
const startsWithOtherS = words => filterOne(
  word => word.startsWith('s'),
  words
)

console.log( startsWithOtherS(['son', 'silly', 'new']) ) //[ 'son', 'silly' ]

/*------------------------------------------------------*/
const mapToo = (fn, arr) => arr.reduce((acc, item, index, arr) => {
  return acc.concat(fn(item, index, arr)) 
}, [])

// your data is a list of functions? Compose them.
/*------------------------------------------------------*/
const compose = (...fns) => x => fns.reduceRight( (v,f) => f(v), x )

const doubleAddTwo = compose(
  double,
  addTwo
)

console.log(doubleAddTwo(126))

/*------------------------------------------------------*/
