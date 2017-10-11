import spotifyApi from './spoty'

export const START_FETCH_ALBUM_TRACKS = 'START_FETCH_ALBUM_TRACKS'
export const startFetchAlbumTracks = id => dispatch => {
    dispatch( fetchAlbumTracks(id) )
    return spotifyApi.getArtistAlbums(id, {limit: 20})
      .then(data => Promise.all( data.items.map( a => spotifyApi.getAlbumTracks(a.id) ) ))
      .then(data => data.map(json => dispatch( receiveAlbumTracks(json) ) ) )
      .catch(err => console.log(err))
}

export const RECEIVE_ALBUM_TRACKS = 'RECEIVE_ALBUM_TRACKS'
const receiveAlbumTracks = (json) => {
  return {
    type: RECEIVE_ALBUM_TRACKS,
    tracks: json.items
  }
}

export const RECEIVE_ALBUM = 'RECEIVE_ALBUM'
const receiveAlbum = (data) => {
  return {
    type: RECEIVE_ALBUM,
    album: data.items
  }
}


export const FETCH_ALBUM_TRACKS = 'FETCH_ALBUM_TRACKS'
export const fetchAlbumTracks = () => {
  return {
    type: FETCH_ALBUM_TRACKS
  }
}
// ----------------------------------------------------------
// reducers
import { List, Map, fromJS } from 'immutable'
import {
  RECEIVE_ALBUM_TRACKS,
  FETCH_ALBUM_TRACKS,
  RECEIVE_ALBUM
} from '../actions/tracks' 

const initialState = Map({
  isFetching: false,
  tracks: List(),
  album: List()
})

function receiveAlbumTarcks(state, tracks) {
  var newState = fromJS({
    tracks, 
    isFetching: false
  })
  return state.merge(newState)
}

function receiveAlbum(state, album) {
  var newState = fromJS({
    album, 
    isFetching: false
  })
  return state.merge(newState)
}

function fetchAlbumTracks(state) {
  let newState = Map({
    isFetching: true
  })
  return state.merge(newState)
}

export default function tracksReducer(state=initialState, action) {
  switch(action.type) {
    case RECEIVE_ALBUM_TRACKS:
      return receiveAlbumTarcks(state, action.tracks)

    case FETCH_ALBUM_TRACKS: 
      return fetchAlbumTracks(state)

    case RECEIVE_ALBUM:
     return receiveAlbum(state, action.album)

    default:
      return state 
    }
}
