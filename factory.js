import {Map, List} from 'inmutable-ext'
import {Sum} from 'file/containing/Sum'
import Task from 'data.task'
import fs from 'fs'

const Box = x =>
({
	ap: b2 => b2.map(x),
	map: f => Box(f(x)),
	fold:  f => f(x),
	inspect:  () => `Box(${x})`
})

// ---------------------------------------------------------
const moneyTofloat = str => parseFloat(str.replace(/\$/g, ''))

const percentToFloat = str => {
  const replaced = str.str.replace(/\$/g, ''))
  const number = parseFloat(replaced)
  return number * 0.01
}
//----------------------------------------------------------
const moneyToFloatV2 = str => 
 return Box(str)
    .map(s => str.replace(/\$/g, '') )
    .map(r => parseFloat(r) )

//----------------------------------------------------------
const applyDiscount = (price, discount) {
  const cost = moneyToFloat(price)
  const savings = percentFloat(discount)
  return cost - cost * savings
}
//----------------------------------------------------------
const percentToFloatV2 = str =>
  Box(str.replace(/\$/g, ''))
    .map(replaced => parseFloat(replaced))
    .map(number => number*0.01)

//----------------------------------------------------------
const applyDiscountV2 = (price, discount) =>
    .moneyToFloat(price)
      .fold(cost => 
	   percentFloat(discount)
	   .fold(savings =>
		cost - cost * savings))

//----------------------------------------------------------
const result = applyDiscount('$5.00', '20%')
console.log(result)

//----------------------------------------------------------
// Either
const Right = x => 
({
	.map: f => Rigth(f(x)),
	.fold: (f,g) => g(x),
	.inspect: () => `Right(${x})`
})

// Or
const Left = x => 
({
	.map: f => Left(x),
	.fold: (f,g) => f(x),
	.inspect: () => `Left(${x})`
})

//----------------------------------------------------------
const res =  List.of(125,12,3)
		.fold(Sum, fold(Sum(empty))

const consolo = (x) => console.log(x)

//----------------------------------------------------------
// fold pull the triger on execution, nothing happens
// until the last .fold purity by being lazy

const lazyBox = g =>
({
	.fold: f => f( g() ), // one layer of lazyBox
	.map : f => lazyBox( () => f(g()) )
})

const resultToo = lazyBox(() => '64')
		.map(s => s.trim())
		.map(trimmed => new Number(trimmed))
		.map(num => num + 1)
		.map(x => String.fromCharCode(x))
		.fold(x => x.toLowerCase()) // fold is the trigger, purity

console.log(resultToo)

//----------------------------------------------------------
// read file, replace some contents and write out a new version
// useful pattern for thing that have side effects http , login,
// use it to make those things composable

const app = () => 
	fs.readFile('config.json', 'utf-8', (err, contents) => {
	if(err) throw err

	const newContents = contents.replace(/8/g,'6')

	fs.writeFile('config.json', newContents, (err, _) => {
		(if err) throw err
		console.log('success!')
	})
})

// refactor factory
const readFile = (filename, enc) =>
	new Task((rej, res) =>
		fs.readFile(filename, enc, (err, contents) =>
			err ? rej(err) : res(contents)))

const writeFile = (filename, enc) =>
	new Task((rej, res) =>
		fs.writeFile(filename, enc, (err, success) =>
			err ? rej(err) : res(success)))

// --------------------------------------------------------------------
// pure way
// does not have to be a fucn beacause useing task so reuse taks or create new one (no arrow func)

const appToo = 
	readFile('config.json', 'utf-8')
	.map(contents => contents.replace(/8/g,'6'))
	.chain(contents => writeFile('config,json', contents)) // return another task so use chain

//----------------------------------------------------------
app().fork
(
	consolo(e),
	x => consolo('success')
)

//----------------------------------------------------------
// Function composition
// fx.map(f).map(g) == fx.map( x => g(f(x)) ) Fisrt law must be true for functors

// Using boxes
// res1 == res2
const res1 = Box('DrBigDragons')
		.map(s => s.substring(3))
		.map(s => stoUpperCase())

const res2 = Box('DrBigDragons')
		.map(s => s.substring(3). stoUpperCase())

// fx.map(id) == id(x) second law must hold true for functors
// res3 == res4
const id = x => x

const res3 = Box('crayons')
		.map(id)

const res4 = id(Box('crayons'))

//----------------------------------------------------------

// lifting val to the type using of
// place a val into type
// pop val into type not worry about constructor
const either = require('../either')

Task.of('hello' ) // Task('hello')
Either.of('Hi')  // Right('hi')
Box.of(100) // Box(100)


// use the type to map over items
// if return left .map .chain wont be possible
Either.of('Hi').map(x => x + '!') 

// Monads 
// F.of, .chain
//  create a monadic interface 
//  flatMap, bind
// Box, Task, Either, List
// Monad have .chain method
// F.typeOf => ( flatMap )is a way to check if monad or not

// run seq program with non determination and return many many results
// capable to manage concurrence
// Task(Task(Task(DOM))) imperative seq
httpGet('/user') //Task:user
.chain(user => 
	httpGet(`/comments/${user.id}`) //Task:Comments
	.chain(comments => 
		updateDOM(user, comments) )) // flatten two types into one nest computation

//------------------------------------------------------------------------------------
// return inner type and that will join them
const join = m => 
	m.chain(x =>x)

// join(m.map(join)) == join(join(m)) associativity: LAW 1 functors
const m = Box(Box(Box(5)))

const resultOne1 = join(m.map(join)) // Box(5)
const resultTwo2 = join(join(m))  // Box(5)

// join(F.of(M)) == join(M.map(F.of)) => for any F functor
// join(Box.of(M)) == join(M.map(Box.of)) => Using Box as Type of F

const M = Box('Much magic')
const resultOne2 = join(Box.of(M)) // Box('Much magic')
const resultTwo2 = join(M.map(Box.of))  // Box('Much magic')

//----------------------------------------------------------
// Define other map method on monads using chain
// from to
m.chain(x => f(x)) 
m.chain(x => M.of(f(x))) // put value back on the type

const final = Box(add = x => y => x + y).ap(Box(2))ap.(Box(3)) // box(5)

const add = x => y => x + y
const final = Box(add).ap(Box(2))ap.(Box(3)) // box(5)

//----------------------------------------------------------
// F(x.map) == F(f).ap(F(x))

/*const Box = x =>
({
	ap: b2 => b2.map(x), // just added in Object.create()
	map: f => Box(f(x)),
	fold:  f => f(x),
	inspect:  () => `Box(${x})`
})*/
 
const liftA2 = (f, fx, fy) => // args are f fucntion and functors fx and fy
	// F(f).ap(fx).ap(fy)
	fx.map(f).ap(fy) // no functors very generic

const newRes = liftA2(add, Box(6), Box(6)) // Box(12)

const $ = selector => 
	Either.of({selector, height: 10})

const getScreenSize = screen => head => foot =>
	screen - (head.height + foot.height)

const resolved = Either.of(getScreenSize(800))
		.ap($('header'))
		.ap($('footer'))

consolo(resolved) 
$('header').chain(head => 
	$('footer').map(footer => 
		getScreenSize(800, header, footer)))

// using lift
const liftResolved = liftA2(getScreenSize(800), $('header'), $('footer'))

//----------------------------------------------------------
//Using TASK

const lauchMissiles = () =>
	new Task((rej, res) => {
		console.log('Boom!')
		res('Missile!')
	})

const app = launchMissiles().map(x => x + '!') 
// launch missiles!
// launch missiles!!

//keep extending things ands composing
// like a second exclamation
app.map(x => x + '!').fork(e => console.log('err', e),
			   x => console.log('success', x))
