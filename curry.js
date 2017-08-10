/* Signatures of functions:
  1: function name
  2: list of params.type, each or some, may be named
  3. type or the return value
  functionName(param1: Type, param2: Type) => Type
*/

/* Signature  
  double(x:number => number)
*/
const double = x => x * x

// Recursive
const curry = (
  f, arr = []
) => (...args) => (
  a => a.length === f.length ? 
  f(...a) : 
  curry(f, a)
)([...arr, ...args])
