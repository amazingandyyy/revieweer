import request from './request';

const PRODUCT_GET_ONE_PRODUCT = 'PRODUCT_GET_ONE_PRODUCT';

export function getOneproduct(id){
  return function (dispatch) {
    request
        .get(`/api/product/getOneById?id=${id}`)
        .then(res => {
            dispatch({ type: PRODUCT_GET_ONE_PRODUCT, payload: res.data })
        })
        .catch(error => {
            console.log(error);
        });
  }
}

let INITIAL_STATE = {
    item: null
}

export function productReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
      case PRODUCT_GET_ONE_PRODUCT:
          return { ...state, item: action.payload }
      default:
          return state
  }
}