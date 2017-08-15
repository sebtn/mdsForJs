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

const moneyToFloatV2 = str => 
 return Box(str)
    .map(s => sstr.replace(/\$/g, '') )
    .fold(r => parseFloat(r) )

const applyDiscount = (price, discount) {
  const cost = moneyToFloat(price)
  const savings = percentFloat(discount)
  return cost - cost * savings
}

const result = applyDiscount('$5.00', '20%')
console.log(result)
