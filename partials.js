// appying some argunments to the function now and some 
// are applied at a later point, how to manupilate
// argumet apply
// Partial Application is a technique for reducing the arity -- 
// expected number of arguments to a function -- 
// by creating a new function where some of the arguments are preset.
// Currying is a special form of partial application where the arity is reduced to 1

const partial = 
  (fn, ...presentargs) =>
    partiallyApplied(..laterArgs) => 
      fn(..presenArgs, ..laterArgs)
      
const getPerson = partial(ajax, 'http://somEnd.point.api/person')
cont getOrder   = partial(ajax, 'http://someOtherEndpoint.api/order')

// innners
const getPerson = partiallyapplied(..laterArgs) => 
  ajax('http://somEnd.point.api/person', ...laterArgs) 
  
 // v1 
cosnt getCurrentUser = partial(
  ajax,
 'http://someOtherEndpoint.api/order',
 {user: CURRENT_USER_ID}
) 
//v1 
const getCurrentUser = partiallyApplied(..laterArgs) =>
  return(ajax,
    'http://somEnd.point.api/person',
     {user: CURRENT_USER_ID},
     ..laterArgs
  )
}

/*----------------------------------------------------------*/
// v2
const  getCurrentUser = partial(getPerson,  {user: CURRENT_USER_ID})

//v2
const getCurrentUser = outerPartiallyApplied(...outerLaterArgs) =>
  const getPerson = innerPartiallyApplied(...innnerLaterArgs) =>
    ajax('http://somEnd.point.api/person', ...innnerLaterArgs)
    
  getPerson({user: CURRENT_USER_ID}, ...outerLaterArgs)
  
// spread and unspread
const spreadArgs = fn => argsArr => fn(...argsArr)
const unspread   = fn => ...argsArr => fn(agrsArr) 
