import { combineReducers } from 'redux';
import AlbumsReducer from './reducer_albums'
import ActiveAlbumReducer from './reducer_active_album'
import activeScreenReducer from './reducer_active_screen'

const rootReducer = combineReducers({
	albums: AlbumsReducer,
	activeAlbum: ActiveAlbumReducer,
	activeScreen: activeScreenReducer
});

export default rootReducer;
