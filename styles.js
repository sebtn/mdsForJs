// bad
_ src
├── actions
|   └── index.js
├── components
|   └── apple.js
|   └── microsoft.js
├── containers
|   └── apple.js
|   └── microsoft.js
├── reducers
|   └── apple.js
|   └── microsoft.js
├── sagas
|   └── apple.js
|   └── microsoft.js
└── index.html

// good
_ src
├── apple
|   └── apple.action.js
|   └── apple.component.js
|   └── apple.container.js
|   └── apple.saga.js
|   └── apple.gtm.js
├── microsoft
|   └── microsoft.action.js
|   └── microsoft.component.js
|   └── microsoft.container.js
|   └── microsoft.saga.js
|   └── microsoft.gtm.js
└── index.html

// bad
const do = shoe => selectDiscount(selectPriceObject(shoe))

// good
const do = compose(selectDiscount, selectPriceObject)

// bad
const foo = a => {
  if (!a){
    return bar(0)
  }
  return bar(a)
}

// ok
const foo = a => bar(a ? a : 0)

// best
const foo (a = 0) =>  bar(a)

// bad
const add = (a, b) => a + b

const foo = (a, b, c, d, e) => (/* ... */)
const foo = a => b => c => d => e => (/* ... */)

// ok
const add = ({a, b}) => a + b
const add = ([a, b]) => a + b

// best
const add = a => b => a + b

// bad
function foo() { ... }

// good
const foo = () => ...

// generators
// bad
function* foo() { ... }

// good
const foo = function* () { ... }

// async functions
// bad
async function foo () { ... }

// good
const foo = async () => { ... }

// bad
const foo = function() { ... }

// good
const foo = () => ...

// bad
function () { return 'Hello World' }

// good
() => 'Hello World'

// bad
function (a) { return a }

// good
a => a

// bad
function () { }

// good
() => { }

// bad
const parse = ({ a : { b } }) =>
  Id(b).map(parseInt).fold(a => a)

// good
const parse = path => data =>
  Id(data).map(path).map(parseInt).fold(a => a)

// best
const parse = path => compose(parseInt, path)

// PURE
const upper = a => s.toUpperCase()
const selectBody = res => res.body

// IMPURE
const requestBodyToUpperCase = compose(upper, selectBody, getHttp)

// bad
const incremnt = a => {
  return a + 1
}

// bad
const make = flower => color => {
  flower(color)
  return color
}

// good
const incremnt = a => a + 1

// good
const make = flower => color => (flower(color), color)

// bad
const INC = 2
...
const increment = a => a + INC

// bad
const indcremnt = a => {
  const INC = 2
  return a + INC
}

// good
const indcremntBy2 = a =>  a + 2

// Because a regex is a business case, you should use it as a string literal inside a function that does just that. 
// Avoid the new Regex construct.
                        

// bad
const TRIM_END = /[ ]+$/
...
const trim = str => str.trim(TRIM_END)

// bad
const trim = str => str.trim(new Regex(/[ ]+$/)))

// good
const trim = str => str.trim(/[ ]+$/)


//monads flow control
// bad
const makeFoo = foo => {
  if (foo) {
    return make(foo)
  }
}

// good
const makeFoo =
  foo =>
    Either.fromNullable(foo)
      .fold(make)

Id(5)
  .map(num => num * 7)
  .map(num => num - 1)
  .fold(log)
//=> 34
// Maybe of a string
Maybe('Hello exalted one')
  .map(sentence => sentence.toUpperString())
  .map(sentence => `${sentence}!`)
  .fold(log)
//=> 'HELLO EXALTED ONE!'

// Maybe of nothing
Maybe(null)
  .map(sentence => sentence.toUpperString())
  .else(() => 'Maybe received a null')
  .fold(log)
//=> 'Maybe received a null'
Either.fromNullable('Hello') // this will return a Right('Hello')
  .fold(
    () => 'Oops',
    val => `${val} world!`)
//=> 'Hello world!'

Either.fromNullable(null) // this will return a Left(null)
  .fold(
    () => 'Oops',
    val => `${val} world!`)
//=> 'Oops'

const extractEmail = obj => obj.email ? Right(obj.email) : Left()
extractEmail({ email: 'test@example.com' })
                        
// no use for undeifned or null 
// bad
const getBody = document => document && document.body ? document.body : undefined
const getBody = document => document && document.body

// good, a monadic api is more reliable and defers the decisions to the caller
const getBody = document =>
  Either.fromNullable(document)
  .map(d => d.body)

// good
const getBody = document =>
  Either.fromNullable(document)
  .map(d => d.body)
  .fork(() => 'can\'t get body of null', b => b)

//sybc 
// Basic usage
Future((reject, resolve) => resolve('Yay'))
  .map(res => res.toUpperString())
  .fork(
    err => log(`Err: ${err}`),
    res => log(`Res: ${res}`))
//=> 'YAY'

// Handle promises
Future.fromPromise(fetch('https://api.awesome.com/catOfTheDay'))
  .fork(
    err => log('There was an error fetching the cat of the day :('),
    cat => log('Cat of the day: ' + cat))
//=> 'Cat of the day: Garfield'

// Chain http calls
Future.fromPromise(fetch('https://api.awesome.com/catOfTheDay'))
  .chain(cat => Future.fromPromise(fetch(`https://api.catfacts.com/${cat}`)))
  .fork(
    err => log('There was an error fetching the cat of the day :('),
    facts => log('Facts for cat of the day: ' + facts))
//=> 'Facts for cat of the day: Garfield is awesome.'
  .map(extractDomain)
  .fold(
    () => 'No email found!',
    x => x)
//=> 'example.com'

extractEmail({ name: 'user' })
  .map(extractDomain) // this will not get executed
  .fold(
    () => 'No email found!',
    x => x)
//=> 'No email found!'
List([2, 4, 6])
  .map(num => num * 2)
  .filter(num => num > 5)
  .fold(log)
//=> [8, 12]
                        
                       
// try noi udefined and no null                        
const getBody = document => document && document.body ? document.body : undefined
const getBody = document => document && document.body

// good, a monadic api is more reliable and defers the decisions to the caller
const getBody = document =>
  Either.fromNullable(document)
  .map(d => d.body)

// good
const getBody = document =>
  Either.fromNullable(document)
  .map(d => d.body)

// Basic usage
Future((reject, resolve) => resolve('Yay'))
  .map(res => res.toUpperString())
  .fork(
    err => log(`Err: ${err}`),
    res => log(`Res: ${res}`))
//=> 'YAY'

// Handle promises
Future.fromPromise(fetch('https://api.awesome.com/catOfTheDay'))
  .fork(
    err => log('There was an error fetching the cat of the day :('),
    cat => log('Cat of the day: ' + cat))
//=> 'Cat of the day: Garfield'
                        
//NO ifs
(foo) => {
  if (foo) {
    return bar
  }
  return baz
}

// good
(foo) => foo ? bar : baz
// ok
(foo) => foo && bar || 0
// good
(foo) => foo ? bar : { baz: true }
(foo) => foo ? baz : 0
                        
// compose impure depencies
// bad
const readFileBody = filePath => {
  const fileContents = readFileSync(filePath)
  const json = JSON.parse(fileContents)
  return json.body
}

// good
const getBody = document => document.body
const readFileBody = compose(getBody, JSON.parse, readFileSync)

// bad
function fromPairs(pairs) {
  var result = {}
  var idx = 0
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1]
    idx += 1
  }
  return result
}

// good
const fromPairs = compose(combine, map(([key, value]) => ({ [key]: value })))

// bad
const splitToKeyValuePair = headerString => {
  return headerString.split(',')
    .reduce((result, current) => {
      const keyValuePair = current.split('=')
      const key = keyValuePair[0]
      const value = keyValuePair[1]
      result[key] = value
      return result
    }, {})
}

// good
const splitToKeyValuePair = compose(combine, fromPairs, map(split('=')), map(trim), split(','))


// statte mutation
// bad
const foo = state => {
  state.count = state.count + 1
  return state
}

// good
const foo = state => object.assign({}, state, { count: state.count + 1 })

// best
const foo = state => ({ ...state, count: state.count + 1 })

// Use Object.assign to avoid mutating state.

// bad
const state => {
  state.id = 1
  return state
}

// good
const state => Object.assign({}, state, { id : 1 }) // native js

const state => ({ ...state, id : 1 }) // es6 syntax
// Do Not Share State

// bad
const inc = () => state.count++

// good
const inc = (state = { count: 0 }) => ({ count : state.count + 1 })

//You should try to avoid mutating local state. 
//The inconvenience with doing it is that you might inadvertently cause a side effect by mutating a function parameter.

// bad
const fiftyPercentDiscount = shoe => {
  shoe.price + shoeVariant.price / 2
  return shoe
}

// good
const fiftyPercentDiscount = shoe => ({ ...shoe, price: shoe.price / 2 })

// Chain http calls
Future.fromPromise(fetch('https://api.awesome.com/catOfTheDay'))
  .chain(cat => Future.fromPromise(fetch(`https://api.catfacts.com/${cat}`)))
  .fork(
    err => log('There was an error fetching the cat of the day :('),
    facts => log('Facts for cat of the day: ' + facts))
//=> 'Facts for cat of the day: Garfield is awesome.'
  .fork(() => 'can\'t get body of null', b => b)

    
// recursion
// recur :: Number -> Number -> Number
const recur = n => acc =>  n == 0 ? acc : recur(n-1)(n * acc)

// recur :: Number -> Number
const factorial = (n) => recur(n)(1)


// function sigantures hindley-milner
// functionName :: type -> type -> type

// add :: Number -> Number -> Number
const add = x => y => x + y

// concat :: [a] -> [a] -> [a]
const concat = a => b => a.concat(b)

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = f => a => a.filter(f)

// map :: (a -> b) -> [a] -> [b]
const map = f => a => a.map(f)

// replace :: String -> String -> String -> String
const replace = subStr => newSubstr => s => s.replace(subStr, newSubstr)

// uncurriedMaxOfThree :: (Number, Number, Number) -> Number
uncurriedMaxOfThree (x, y, z) = Math.max(x, y, z)

// curry :: ((a, b) -> c) -> a -> b -> c
const curry = f => x => y => f(x, y)

// uncurry :: (a -> b -> c) -> (a, b) -> c
const uncurry => f => (x, y) =>  f(x)(y)

// returnOne :: () -> Number
const returnOne = () => 1
