/* Laws: Identity and Composition 
 Composition law: 
 F.map( x=>f(g(x)) ) === F.map(g).map(f) 
*/
const double = x => x * x
const addTwo = x => x + 2
const z = [1, 5, 13] 
/*------------------------------------------------------*/
const Identity = value => ({
  map: fn => Identity(fn(value)),
  valueOf: () => value,
  toString: () => `Identity(${value})`,
  [Symbol.iterator]: () => {
     let first = true;
     return ({
       next: () => {
         if (first) {
           first = false;
           return ({
             done: false,
             value
           });
         }
         return ({
           done: true
         });
       }
     });
   },
   constructor: Identity
})

Object.assign(Identity, {
  toString: () => 'Identity',
  is: x => typeof map === 'function'
})
/*------------------------------------------------------*/
let Tracer = {
  find: (x) => {
    console.log(x)
    return x
   }
}

/*------------------------------------------------------*/
const tracer = Tracer.find  
const u = Identity(2)

u.map(tracer) // 2 identity law
u.map(x => x).map(tracer) // 2 identity law

const f = n => n + 3
const g = n => n * n
const c1 = u.map( x => f(g(x)) )

const c2 = u.map(g).map(f)

c1.map(tracer) // (2*2+3 ) = 7
c2.map(tracer) // 7
 
/*------------------------------------------------------*/
const ints = (Identity(44) + Identity(4))
tracer(ints)
const hi = (Identity('Hi ') + Identity('you!'))
tracer(hi)
/*------------------------------------------------------*/
const arrOne = [6,7, ...Identity(8)] // cause of the iterator
tracer(arrOne)

/*------------------------------------------------------*/
const fRange = (
  start,
  end
) => Array.from(
  {length: end - start + 1},
  (x, i) => start.constructor(i + start)
)

/*------------------------------------------------------*/
const exists = x => (x.valueOf() !== undefined && x.valueOf() !== null)
const ifExists = x => ({ map: fn => exists(x) ? x.map(fn) : x })

ifExists(Identity(2))
  .map(double)
  .map(g)
  .map(tracer) //16

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
  const map = curry((fn, F) => F.map(fn))
  const mDouble = map(double)

 /*------------------------------------------------------*/ 
  const flying = o => {
  let isFlying = false;
  return Object.assign({}, o, {
    fly () {
      isFlying = true
      return this
    },
    isFlying: () => isFlying,
    land () {
      isFlying = false
      return this
    }
  })
}
const bird = flying({});
console.log( bird.isFlying() ) // false

const quacking = quack => o => Object.assign({}, o, {
  quack: () => quack
})
const quacker = quacking('Quack!')({})
console.log( quacker.quack() )// 'Quack!'
console.log( bird.fly().isFlying() ) // true

const createDuck = quack => quacking(quack)(flying({}))
const duck = createDuck('Quack!')
console.log(duck.fly().quack())

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

const createDuck = quack => pipe(
  flying,
  quacking(quack)
)({})
const duck = createDuck('Quack!')
console.log(duck.fly().quack())

//----------------------------------------------------------
// this is the same as classsical inheretance
// so you DON'T want it
// base object factory
function base(spec) {
	vat that = {}
	that.name = spec.name // add .name prop
	return that
}

// construction of a child obj, inheretance from 'base'
function child (spec) {
	var that = base(spec) // using the 'constructor'
	that.sayHi = function() {
		return 'Hi, my name is ' +  that.name
	}
}

// usage
var res = child(name: 'Some functional object')
console.log(res.sayHi()) // 'Hi, my name is some functional objects'

// FUNCTIONAL MIXINS
//--------------------------------------------------------------------------
// You may be tempted to create functional mixins designed to work together. 
// configuration manager for your app that logs warnings when you 
// try to access configuration properties that don’t exist.
const withLogging = logger => o => Object.assign({}, o, {
	log(text){
		logger(text)
	}
})

//somewhere else in the app, in different module 
// with no explicit mention of withLogging
const withConfig = config => (o = {
	log(text = '') => console.log(text)
}) => Object.assign({}, o, {
get(key) {
	return config[key] == undefined ? this.log(`Missing config key: ${key}`) : // implicit dependency here
		config [key]
	}  
})

// elsewhere in app
// in yet another module that imports withLogging and
// withConfig
const createConfig = ({initialConfig, logger}) =>
	pipe(
		withlogging(logger),
		withConfig(initialConfig)
	)({})

// elsewhere
const initialConfig = {
	host: 'localhost'
}

const logger = console.log.bind(console)
console.log(config.get('host')) // loclahost
console.log('notThere') // Missing config key: noThere

//--------------------------------------------------------------------------
// how ever it can also be built like this
// importing explictly withLoggin()
import withLogging from './with-logging'

const addConfig = config => o => Object.assign({}, o, {
	get(key) {
		return config[key] == undefined ?
			this.log(`Missing config key: ${key}`) : 
			config[key]
	}
})

const withConfig = ({initialConfig, logger}) => o => 
	pipe(
	withLogging(logger), // explicit dependency here
      	addConfig(initialConfig)
	)(o)

// tha feactory only knows about withConfig now
const createConfig = ({intialConfig, logger}) => 
	wothConfig({initialConfig, logger})({})

// elsewhere
const initialConfig = {
	host: 'localhost'
}

const logger = console.log.bind(console)
console.log(config.get('host')) // loclahost
console.log('notThere') // Missing config key: noThere

// EE: 
// 'Functional mixins are composable factory functions which add properties and 
// behaviors to objects like stations in an assembly line. They are a great way to 
// compose behaviors from multiple source features (has-a, uses-a, can-do),
// as opposed to inheriting all the features of a given class (is-a).'

/*------------------------------------------------------*/
// 'Set non enumerable props will not work on the final object, 
// becuase many functional mixins will mutate object argument 
// passed or the identity reference is not mantained. 
// So always refer to 'this' instead of refering to the instance
// object inside the closure.'

const a = Obejct.defineProperty({}, 'a'. {
	enumerable: false,
	value: 'a'
})

const b = {
	b: 'b'
}

console.log({...a, ...b}) // {b: 'b'}

/*------------------------------------------------------*/
const noop = () => {some: thing}
console.log(noop()) // undefined

// disambiguate by wrapping the object literal in parentheses
const createThing = () => ( {some: thing} ) 
console.log(createThing()) // {some: "thing"}
