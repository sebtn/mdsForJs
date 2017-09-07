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
  const replaced = str.replace(/\$/g, ''))
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
// F(x).map(f) === F(f).ap(F(x))

/*const Box = x =>
({
	ap: b2 => b2.map(x), // just added in Object.create(),
	chain: f => f(x),
	map: f => Box(f(x)),
	fold:  f => f(x),
	inspect:  () => `Box(${x})`
})*/
 
const liftA2 = (f, fx, fy) => // args are f fucntion and functors fx and fy
	fx.map(f).ap(fy) // no functors very generic F(f).ap(fx).ap(fy)

const newRes = liftA2(add, Box(6), Box(6)) // Box(12)
const oldRes = Box(add).ap(box(2)).ap(Box(4)) // Box(6)

const liftA3 = (f, fx, fy, fz) => // args are f fucntion and functors fx and fy, fz
	fx.map(f).ap(fy).ap(fz) // no functors very generic F(f).ap(fx).ap(fy).ap(fz)

const newRes2 = liftA2(add, Box(6), Box(6), Box(6)) // Box(18)
const oldRes2 = Box(add).ap(box(2)).ap(Box(4), Box(6)) // Box(12)

//-------------------------------------------------------------
// JQuery stub, thinks taks instead in real life
// facotries ahead

// sequencial
consolo(resolved) 
$('header').chain(head => 
	$('footer').map(footer => 
		getScreenSize(800, header, footer)))
const $ = selector => 
	Either.of({selector, height: 10})

// applicative is ideal fo NON seq stuff
const getScreenSize = screen => head => foot =>
	screen - (head.height + foot.height)

const resolved = Either.of(getScreenSize(800))
		.ap($('header'))
		.ap($('footer'))

// using lift as different syntax applicative functors
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

//--------------------------------------------------------------
//inmutable list
const {list} = require('inmmutable-ext')

//2d or 3d or more array with no loops
const merch = () =>
	List.of(x => y => z => `${x}-${y}-${z}`)
	.ap(list(['el1', 'el2']))
	.ap(list(['sm1', 'sm2', 'sm3']))
	.ap(list(['l1']))

consolo(merch())

//--------------------------------------------------------------
// using task for current actions
cosnt Db = ({
	find: id => 
		new Task((rej, res) => 
			setTimeout(() => 
				res( {id: id, title: `Project ${id}`} , 100))
}) 

// Syncronous non concurrence 
const reportHeader = (p1, p2) =>
	`Report: ${p1.title} compared to ${p2.title}`
Db.find(20).chain(p1 => 
	Db.find(8).map(p2 => 
		reportheader(p1, p2)))

// concurrence async
Task.of(p1 => ps => reportHeader(p1, p2))

.ap(Db.find(20))
.ap(Db.find(8))
.fork(console.error, consolo.log)

//--------------------------------------------------------------
// data-either data.task fantasy-identites request --save-dev
// spotify
const spotify = require('/spotify module')
const argv = new Task((resj, res) => res(process.argv) )
const names = arrv.map(args => arg.slice(2))

// data flow 
const related = (name) =>
	findArtist(name)
	.map(artist => artist.id)
	.chain(spotify.realtedArtisit)
	.map(artists => artists.map(artist => artist.name) )

const main = ([name1, name2]) =>
	Task.of(rels1 => rels2 => =. [rels1, rels2] )// async applicative
	.ap(related(name1))
	.ap(related(name2))

names.map(main).fork(consolo(error), console.log)

const httpGet = url => 
	request('http://www.google.com', fucntion(error, response, body) {
	if(!error && response.statusCode == 200) {
		consolo(body)
	}
})


//--------------------------------------------------------------
// Using Either 
const first = xs => 
	Either.fromNullable(xs[0]) // avoids psssing null

const parse = Either.try(JSON.parse)

const getJSON = url => 
	httpGet(url)
	.map(parse)
	.chain(eitherToTask) // Remove either from task

// refactor req
cosnt httpget = url => 
	new Task((rej, res) =>
	request(url, (error, response, body) => 
		error ? rej : res(body) ))


const eitherToTask = e => 
	e.fold(Task.reject, Task.of)

const findArtist = name =>
	getJSON(`${Some endpont}`)
	.map(result => result.artist.items)
	.map(first)

const relatedArtist = id =>
	getJSON(`${Some endpont}`)
	.map(result => result.artist)


module.exports = {findArtist, relatedArtist} // exposed to public
