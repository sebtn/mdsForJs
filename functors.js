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
