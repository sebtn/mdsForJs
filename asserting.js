const t = value => {
  const fn = () => value
  fn.toString = () => `t(${ value })`
  return fb
}

const someVal = t(2)

console.log(
  someVal.toString() // "t(2)"
)

const  assert = {
  same: (actual, expected, msg) => {
    if(actual.toString() !== expected.toStrimng()) {
      throw new Error(`NOT ok: ${msg}
        Expected: ${expected}
        Actual: ${actual}
      `)
    }
    console.log(`Ok ${msg}`)
  }
}

{
  const msg = "a value t(x) composed with t(0) ==== t(x)"
  const x = 20
  const a = t(x)(t(0)
  const b = t(x)
  assert.same(a, b, msg)
}

{
  const msg = "a value t(x) composed with t(1) ==== t(x + 1)"
  const x = 20
  const a = t(x)(t(1))
  const b = t(x + 1)
  assert.same(a, b, msg)
}

// NOT OK: a value t(x) composed with t(0) ==== t(x)
// Expected: t(20)
// Actual:   20

const t = value => {
  const add = n => t(value + n)
  return Object.assign(add, {
    toString: () => `t(${ value })`,
    valueOf:  () => value
  })
}

// "OK: a value t(x) composed with t(0) ==== t(x)"
// "OK: a value t(x) composed with t(1) ==== t(x + 1)"

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
const sumT = (...fns) => pipe(...fns)(t(0))

sumT(
  t(2),
  t(4),
  t(-1)
).valueOf() // 5

const result = composwe(
  value1, 
  value2,
  value3
)
