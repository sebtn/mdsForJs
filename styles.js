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
