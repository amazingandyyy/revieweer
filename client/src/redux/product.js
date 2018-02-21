import request from './request';

const PRODUCT_GET_ONE_PRODUCT = 'PRODUCT_GET_ONE_PRODUCT';

export function getOneproduct(productId){
  return function (dispatch) {
    request
        .get(`/api/product/getOneByProductId?productId=${productId}`)
        .then(res => {
            dispatch({ type: PRODUCT_GET_ONE_PRODUCT, payload: res.data })
        })
        .catch(error => {
            console.log(error);
        });
  }
}
export function updateOneProduct(id, obj){
    let pId = obj.productId;
    delete obj.productId;
    return function (dispatch) {
        request
        .post(`/api/product/updateOneById?id=${id}`, obj)
        .then(res => {
            window.location = `#pd/${pId}`;
        })
        .catch(error => {
            console.log(error);
        });
  }
}
export function deleteOneProduct(id){
  return function (dispatch) {
    request
        .delete(`/api/product/deleteOneById?id=${id}`, )
        .then(res => {
            window.location.reload(true);
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