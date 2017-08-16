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

const Left = x => 
({
	.map: f=> Left(x),
	.fold: (f, g) => f(x)
	inspect: () => `Left(${x})`

})

//----------------------------------------------------------

const {Map, List} from 'inmutable-ext"
const {Sum} from 'file/containing/Sum'

const res =  List.of(125,12,3)
		.fold(Sum, fold(Sum(empty))

//----------------------------------------------------------
// fold pull the triger on execution

const lazyBox = g =>
({
	fold: f => f(g()),
	map: lazyBox( () => f(g()) )
})

const resultToo = lazyBox(() => '64')
		.map(s => s.trim())
		.map(trimmed => new Number(trimmed))
		.map(num => num + 1)
		.map(x => String.fromCharCode(x))
		.fold(x => x.toLowerCase())
console.log(resultToo)
