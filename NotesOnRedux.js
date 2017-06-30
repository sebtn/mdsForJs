// inside a reducer file 

/* state argument is not the apps's state, 
 * it is a kind of local state for which the 
 * reducer is responsible, how ever the sum of
 * this local states is the application state
 * the new state is assembled after and containers
 * get notified about the changes in the state 
 * so they re render    */
export default function (state = null, action) {
  switch (action.type) {
    case 'BOOK_SELECTED':
      return action.payload
    default: 
      return state
    }
}

//---------------------------------------------------------------

//inside a component file 

import React, {Component} from 'react'
import BookList from '../containers/book-list'
import BookDetails from '../containers/book-details'

/* State form the components is not the same as the 
application state, they are different objects */
export default class BookApp extends Component {

	render() {
		return (
			<div>
				<BookList />			
				<BookDetails />			
			</div>
		)
	}
}
