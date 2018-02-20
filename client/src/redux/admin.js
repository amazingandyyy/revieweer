import request from './request';

export const ADMIN_SEARCH_FOR_ONE_PRODUCT = 'ADMIN_SEARCH_FOR_ONE_PRODUCT';
export const ADMIN_DASHBOARD_REST = 'ADMIN_DASHBOARD_REST';
export const ADMIN_FETCH_ONE_PRODUCT_FROM_APIFY = 'ADMIN_FETCH_ONE_PRODUCT_FROM_APIFY';

export const adminDashboardReset = () => (dispatch) => dispatch({type: ADMIN_DASHBOARD_REST});

export function searchOneProduct(uri) {
    return function (dispatch) {
      console.log(uri);
      request.get(`/api/product/searchOneFromAmazon?source=${uri}`)
      .then(res=>{
        console.log(res.data);
        dispatch({ type: ADMIN_SEARCH_FOR_ONE_PRODUCT, payload: res.data })
      })
      .catch(err=>{
        console.log(err)
      })
    }
}
export function fetchProeuctPreview(productPendingId) {
    console.log('productPendingId', productPendingId);
    return function (dispatch) {
      request.get(`/api/product/fetchProductFromApify?productPendingId=${productPendingId}`)
      .then(res=>{
        console.log(res.data);
        dispatch({ type: ADMIN_FETCH_ONE_PRODUCT_FROM_APIFY, payload: res.data })
      })
      .catch(err=>{
        console.log(err)
      })
    }
}

let INITIAL_STATE = {
  produdtPendingId: null,
  produdtPreviewData: null
}

export function adminReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case ADMIN_SEARCH_FOR_ONE_PRODUCT:
            return { ...state,
              produdtPendingId: action.payload
            }
        case ADMIN_FETCH_ONE_PRODUCT_FROM_APIFY:
            return { ...state,
              produdtPreviewData: action.payload
            }
        case ADMIN_DASHBOARD_REST:
            return INITIAL_STATE
        default:
            return state;
    }
}