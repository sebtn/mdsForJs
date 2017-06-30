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

//------------------------------------------------------------------
// the index for reducer (w/o store)

import {combineReducers} from 'redux'
import BooksReducer from './reducer_books'
import ActiveBook from './reducer_active_book'

/* Books reducer is responsible for creating 
 * the value of books, creates the property books,
 * so the state that gets passed is the one that 
 * BooksReducer generates previously. 
 * Any key in the combineReducer object is a key
 * in the global state object as well */
const rootReducer = combineReducers({
	books: BooksReducer,
  activeBook: ActiveBook
})

export default rootReducer

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

//--------------------------------------------------------------
//inside a smart container file
import React, {Component} from 'react'
import {connect} from 'react-redux'

class BookDetails extends Component {
  render() {
    if(!this.props.book) { 
      return <div>Select a book to get started!</div> 
    }
    return (
      <div>
        <h3>Details for: </h3>
        <div>Title: {this.props.book.title}</div>
        <div>Pages: {this.props.book.pages}</div>
        <div>Author: {this.props.book.author}</div>
      </div>
    )
  }
}

/*-----------------------------------------------------------------*/
function mapStateToProps(state) {
  return {
    book: state.activeBook
  }
}

/*-----------------------------------------------------------------*/
export default connect(mapStateToProps)(BookDetails)


/*-----------------------------------------------------------------*/
// another smart container

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {selectBook} from '../actions/index'

class BookList extends Component {
/*-----------------------------------------------------------------*/
	renderList = () => {
		return this.props.books.map( (book) => {
			return (
				<li key={book.title}
          onClick={ () => this.props.selectBook(book) } 
          className="list-group-item">
          {book.title}
        </li>
			)
		})
	}

/*-----------------------------------------------------------------*/
	render() {
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		)
	}
}

/*-----------------------------------------------------------------*/
function mapStateToProps(state) {
  /* The return whatever will show up as props inside
   * of BookList class, usually returns an object
   * Glues react and redux together.
   * reducer for book return an array of books  */
  return {
    books: state.books,
  }
}

/*-----------------------------------------------------------------*/
/* anything return from this func will get passed as props
 * in the container BookList, the idea is to be 
 * able to call the selectBook action creator as
 * this.props.selectBook(). Useful for defining and 
 * firing up callbacks to parents => i.e onCLick  */
function mapDispatchToProps(dispatch) {
 /* selectBook is called, the result (value in this case) 
  * is passed to all reducers. The binding does it  */
  return bindActionCreators({ selectBook: selectBook }, dispatch)
}

/*-----------------------------------------------------------------*/
/* Connect takes a function and a component and 
 * produces a ...Container => component aware of the state 
 * need to know about selectBook action as prop. 
 * the idea behind this is also connect to the store  */
export default connect(mapStateToProps, mapDispatchToProps)(BookList)
