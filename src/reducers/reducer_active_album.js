import { combineReducers } from 'redux'

export default function(state = null, action) {
	switch (action.type) {
		case 'ALBUM_SELECTED': 
			return action.payload
	}
	return state
}