import { combineReducers } from 'redux'

export default function(state = null, action) {
	switch (action.type) {
		case 'CHANGE_SCREEN': 
			return action.payload
	}
	return state
}