/* Laws: Identity and Composition 
 Composition law: 
 F.map( x=>f(g(x)) ) === F.map(g).map(f) 
*/
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
  is: x => typeof.map === 'function'
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
cosnt fRange = (
  start,
  end
) => Array.from(
  {length: end -start + },
  (x, i) => start.constructor(i + start)
)
