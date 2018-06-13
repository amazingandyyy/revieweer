import request from '../request';
export const ADMIN_INSIGHT_FETCH_PRODUCTS_SUCCESS = 'ADMIN_INSIGHT_FETCH_PRODUCTS_SUCCESS';
export const ADMIN_INSIGHT_FETCH_REVIEWS_SUCCESS = 'ADMIN_INSIGHT_FETCH_REVIEWS_SUCCESS';

export function fetchInsightProducts(url) {
    return function (dispatch) {
      request.put(`/api/insight/fetchProducts`, {
        config: {
          days: 90
        }
      })
      .then(p=>{
        dispatch({type: ADMIN_INSIGHT_FETCH_PRODUCTS_SUCCESS, payload: p.data})
      })
      .catch(err=>console.log(err))
    }
}
export function fetchInsightReviews(url) {
    return function (dispatch) {
      request.get(`/api/insight/fetchReviews`)
      .then(p=>{
        dispatch({type: ADMIN_INSIGHT_FETCH_REVIEWS_SUCCESS, payload: p.data})
      })
      .catch(err=>console.log(err))
    }
}

let INITIAL_STATE = {
  productList: null,
  reviewList: null
}

export function adminInsightReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
      case ADMIN_INSIGHT_FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          productList: action.payload
        }
      case ADMIN_INSIGHT_FETCH_REVIEWS_SUCCESS:
        return { 
          ...state,
          reviewList: action.payload
        }
      default:
          return state;
    }
}