  const initialState = {
	items: [],
	loading: false,
	error: null,
	charts: []
  };
  
  export default function productReducer(state = initialState, action) {
	switch(action.type) {
	  case 'FETCH_PRODUCTS_BEGIN':
		// Mark the state as "loading" so we can show a spinner or something
		// Also, reset any errors. We're starting fresh.
		return {
		  ...state,
		  loading: true,
		  error: null
		};

		case 'ADD_CHART':
		// Mark the state as "loading" so we can show a spinner or something
		// Also, reset any errors. We're starting fresh.
		return {
		  ...state,
		  charts: action.payload
		};
  
	  case 'FETCH_PRODUCTS_SUCCESS':
		// All done: set loading "false".
		// Also, replace the items with the ones from the server
		console.log("here")
		var allProducts = action.payload.projects
		
		console.log("all prods", allProducts)
		return {
		  ...state,
		  loading: false,
		  items: allProducts
		};
  
	  case 'FETCH_PRODUCTS_ERROR':
		// The request failed, but it did stop, so set loading to "false".
		// Save the error, and we can display it somewhere
		// Since it failed, we don't have items to display anymore, so set it empty.
		// This is up to you and your app though: maybe you want to keep the items
		// around! Do whatever seems right.
		return {
		  ...state,
		  loading: false,
		  error: action.payload,
		  items: []
		};
  
	  default:
		// ALWAYS have a default case in a reducer
		return state;
	}
  }