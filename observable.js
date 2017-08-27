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

var observer =  {
  next: (value) => console.log(value),
  error: (error) => console.log(error),
  complete: () => console.log('Completed') // will never be called
}
Rx.Observable.fromEvent(button, 'click')
  .subscribe(
    (value) => console.log(value.client()) //observer
  )

Rx.Observable.fromEvent(button, 'click')
  .subscribe(observer)

Rx.Observable.create((obs) => {
  obs.next('A val')
  obs.error('Error')
  obs.next('Some other val')
  obs.complete() // interruption
}) 
  .subscribe(observer)

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
