const fetchProductsBegin = () => ({
  type: 'FETCH_PRODUCTS_BEGIN'
});

const fetchProductsSuccess = json => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: {"projects": json.projects} 
});

const fetchProductsError = error => ({
  type: 'FETCH_PRODUCTS_FAILURE',
  payload: { error }
});

function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch("https://api.myjson.com/bins/12ovae")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json));
        console.log("dispatched");
      })
      .catch(error => dispatch(fetchProductsError(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export default fetchProducts;