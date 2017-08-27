<script>https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.4.3/Rx.js</script>
<button>Clicker!</button>

var button = document.querySelector('button')

/* subscribe( 
value() = > {...}, 
error() = > {...}, 
() = > {...}
)
OR using object {} implementor
subscribe({
value() = > {...}, 
error() = > {...}, 
() = > {...}
})
*/

/*----------------------------------------------------------------*/
var observer =  {
  next: (value) => console.log('next(): ', value),
  error: (error) => console.log(error),
  complete: () => console.log('Completed') // will never be called
}
Rx.Observable.fromEvent(button, 'click')
  .subscribe(
    (value) => console.log(value.client()) //observer
  )

/*----------------------------------------------------------------*/
Rx.Observable.fromEvent(button, 'click')
  .subscribe(observer)

Rx.Observable.create((obs) => {
  obs.next('A val')
  obs.error('Error')
  obs.next('Some other val')
  obs.complete() // interruption
}) 
  .subscribe(observer)

/*----------------------------------------------------------------*/
// async
Rx.Observable.create((obs) => {
  obs.next('A val')
  obs.error('Error')
  setTimeout(() => {
    obs.complete()
    obs.next('and again!') // never gets printed!
  } ,  2000 )
  obs.next('Some other val')
  obs.complete() // interruption
}) 
  .subscribe(observer)

/*----------------------------------------------------------------*/
Rx.Observable.create((obs) => {
  button.onclick = (event) => obs.next(event) // instead of fromEvent
}) 
  .subscribe(observer)

/*----------------------------------------------------------------*/
// Observable is a time dimension so debounce, thtottle, 
// buffer and combineLast become trivial... are lazy also repeat()

// An epic usin rxJs redux to manipulate 
//  state 
const pingPongEpic = (action$, store) =>
  action$.ofType('PING')
    .map(action => ( {type: 'PONG'}) )

/*----------------------------------------------------------------*/
const pingPongEpic = (action$, store) =>
  action$.ofType('PING')
    .delay(1000) // built in operator
    .map(action => ( {type: 'PONG'}) )

  // using the reducer
  const isPing = (state = false, action) => {
    switch(action.type) {
      case "PING":
        return true
      case "PONG":
        return false
      default:
        return state
    }
  }
  
/*----------------------------------------------------------------*/
  const counter = (state = 0, action) => {
    switch(action.type) {
      case "INCREMENT":
        return state + 1
      case "DECREMENT":
        return state - 1 
      default:
        return state
    }
  }
// wait 1 second to update
const incrementEpic = (action$, store) => 
  action$.ofType('INCREMENT_DEBOUNCED')
    .debounceTime(500)
    .map(() =>( {type: 'INCREMENT'} )) 

const incrementEpic = (action$, store) => 
  action$.ofType('DECREMENT_DEBOUNCED')
    .debounceTime(500)
    .map(() =>( {type: 'DECREMENT'} ))
