import {Map, List} from 'inmutable-ext'
import {Sum} from 'file/containing/Sum'
import Task from 'data.task'
import fs from 'fs'

const Box = x =>
({
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
    .map(s => sstr.replace(/\$/g, '') )
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
	.map: f=> Rigth(f(x)),
	fold: (f,g) => g(x)
	inspect: () => `Right(${x})` 

})
// Or
const Left = x => 
({
	.map: f=> Left(x),
	.fold: (f, g) => f(x)
	inspect: () => `Left(${x})`

})

//----------------------------------------------------------
const res =  List.of(125,12,3)
		.fold(Sum, fold(Sum(empty))

const = consolo = (x) => console.log(x)

//----------------------------------------------------------
// fold pull the triger on execution, nothing happens
// until the last .fold purity by being lazy

const lazyBox = g =>
({
	fold: f => f( g() ), // one layer of lazyBox
	map : f => lazyBox( () => f(g()) )
})

const resultToo = lazyBox(() => '64')
		.map(s => s.trim())
		.map(trimmed => new Number(trimmed))
		.map(num => num + 1)
		.map(x => String.fromCharCode(x))
		.fold(x => x.toLowerCase())

console.log(resultToo)

//----------------------------------------------------------
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

const appToo = // does not have to be a fucn
	readFile('config.json', 'utf-8')
	.map(contents => contents.replace(/8/g,'6'))
	.chain(contents => writeFile('config,json', contents)) // return ahnother task so use chain

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
// Monad have .chain method
// and F.typeOf => ( flatMap )
// a way to check if monad or not

httpGet('/user') //Task:user
.chain(user => 
	httpGet(`/comments/${user.id}`) //Task:Comments
	.chain(comments => 
		updateDOM(user, comments) )) //Task(Task(Task(DOM)))

const join = m => 	
	m.chian(x =>x)

// join(m.map(join)) == join(join(m)) // associativity: LAW 1 functors
const m = Box(Box(Box(5)))

const resultOne1 = join(m.map(join)) // Box(5)
const resultTwo2 = join(join(m))  // Box(5)

// join(F.of(M)) == join(M.map(F.of)) => for any F functor
// join(Box.of(M)) == join(M.map(Box.of)) => Using Box as Type of F

const M = Box('Much magic')
const resultOne2 = join(Box.of(M)) // Box('Much magic')
const resultTwo2 = join(M.map(Box.of))  // Box('Much magic')

// Define other map method on monads using chain

// from to
m.chain(x => f(x)) 
m.chain(x => M.of(f(x))) // put value back on the type
