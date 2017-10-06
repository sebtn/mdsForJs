// using inmutableJS

import { List, Map, fromJS } from 'immutable'
import { 
  FETCH_ARTISTS,
  RECEIVE_ARTISTS,
  RECEIVE_ARTIST_INFO,
  FETCH_ARTIST_INFO 
} from '../actions/artists'

/* Initial state object will have this shape.
* List will store objects fetched from API
* Using fully persistent List [Arrays] will make js 
* much faster.
*/
const initialState = Map({
  isFetching: false,
  // artists: Map(),
  artists: List(),
  details: Map()
})
// const initialState = {
//     isFetching: false,
//     artists: [],
//     details: []
//   }

/* Gets a list from API completed request
* return a newState with the items set to the list
* of artists. The list passed as argument is an 
* array of objects
* The current state is used to generate a new one.
* fromJS uses deep conversion to handle nested
* Objects, replace Object.assign or Object.keys
* or other non-persistent methods
*/
function receiveArtists(state, artists) {
  var newState = fromJS({
    artists: artists, 
    isFetching: false
  })
  return state.merge(newState)
}

/* Sets the isFetching prop true, 
* while the fetching is in progress
* return a newState indicating it.
*/
function fetchArtists(state) {
  let newState = Map({
    isFetching: true
  })
  return state.merge(newState)
}

function fetchArtistInfo(state) {
  let newState = Map({
    isFetching: true
  })
  return state.merge(newState)  
}

/* On single artist info comes from the API 
* return a new state with the details field
* set to such info.
* The current state is used to generate a new one.
* The fromJS provides the deep conversion for the Objects  
*/
function receiveArtistInfo(state, artist) {
  var newState = fromJS({
    details: artist, 
    isFetching: false
  })
  return state.merge(newState)
}

/*Main reducer: reduces the state using a store registered
* action XOR the same state it got passed along.
* The state for a particular reducer's starting point. 
* using an action's starting point state inside, and
* the type inside the action object.
// */
export default function artistsReducer(state=initialState, action) {
  switch(action.type) {
    case RECEIVE_ARTISTS:
      return receiveArtists(state, action.artists)

    case FETCH_ARTISTS: 
      return fetchArtists(state)

    case RECEIVE_ARTIST_INFO:
      return receiveArtistInfo(state, action.details)

    case FETCH_ARTIST_INFO:
     return fetchArtistInfo(state)

    default:
      return state 
    }
}

// export default function artistsReducer(state=initialState, action) {
//   switch(action.type) {
//     case RECEIVE_ARTISTS:
//     const {artists} = action
//       // return receiveArtists(state, action.artists)
//       return Object.assign({}, state, action.data, {artists})

//     case FETCH_ARTISTS: 
//       // return fetchArtists(state)
//       return Object.assign({}, state, {isFetching: true})
      

//     case RECEIVE_ARTIST_INFO:
//       // return receiveArtistInfo(state, action.artist)
//       const {details} = action
//       return Object.assign({}, state , action.data, {details})

//     case FETCH_ARTIST_INFO:
//     //  return fetchArtistInfo(state)
//     return Object.assign({}, state, {isFetching: true})
    

//     default:
//       return state 
//     }
// }


//-----------------------------------------------------------------
//authReducer
import { List, Map, fromJS } from 'immutable'
import {
  SPOTIFY_TOKENS, 
  SPOTIFY_ME_BEGIN, 
  SPOTIFY_ME_SUCCESS, 
  SPOTIFY_ME_FAILURE
} from '../actions'

// /** The initial state; no tokens and no user info */
// con

const initialState = {
  accessToken: null,
  refreshToken: null,
  auth: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
  }
}

// function spotifyTokens(state) {
//   var newState = Map({
//     refreshToken,
//     accessToken
//   })
//   return state.merge(newState)
// }

// function spotifyMeBegin(state, auth) {
//   var newState = fromJS({
//     auth, 
//     loading: true
//   })
//   return state.merge(newState)  
// }

// function spotifyMeSuccess(state, auth) {
//   var newState = fromJS({
//     auth, 
//     data,
//     loading: false
//   })
//   return state.merge(newState)  
// }

// /* Auth reducer */
// export default function reduce(state = initialState, action) {
//   switch (action.type) {

//   //set the token
//   case SPOTIFY_TOKENS:
//     return spotifyTokens(state, action.accessToken, action.refreshToken)

//   case SPOTIFY_ME_BEGIN:
//     return spotifyMeBegin(state, action.loading) 

//   case SPOTIFY_ME_SUCCESS:
//     return spotifyMeSuccess(state, action.data, action.loading)

//   case SPOTIFY_ME_FAILURE:
//     return state

//   default:
//     return state
//   }
// }

export default function reduce(state = initialState, action) {
  switch (action.type) {
  // when we get the tokens... set the tokens!
  case SPOTIFY_TOKENS:
    const {accessToken, refreshToken} = action;
    return Object.assign({}, state, {accessToken, refreshToken});

  // set our loading property when the loading begins
  case SPOTIFY_ME_BEGIN:
    return Object.assign({}, state, {
      auth: Object.assign({}, state.auth, {loading: true})
    });

  // when we get the data merge it in
  case SPOTIFY_ME_SUCCESS:
    return Object.assign({}, state, {
      auth: Object.assign({}, state.auth, action.data, {loading: false})
    });

  // currently no failure state :(
  case SPOTIFY_ME_FAILURE:
    return state;

  default:
    return state;
  }
}
