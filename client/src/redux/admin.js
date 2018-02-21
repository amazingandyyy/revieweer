import request from './request';
export const ADMIN_SEARCH_FOR_ONE_PRODUCT = 'ADMIN_SEARCH_FOR_ONE_PRODUCT';
export const ADMIN_DASHBOARD_REST = 'ADMIN_DASHBOARD_REST';
export const ADMIN_FETCH_ONE_PRODUCT_FROM_APIFY = 'ADMIN_FETCH_ONE_PRODUCT_FROM_APIFY';

export const adminDashboardReset = () => (dispatch) => dispatch({type: ADMIN_DASHBOARD_REST});

export function searchOneProductByURL(url) {
    return function (dispatch) {
      let productId = 'B0' + url.split('/B0')[1].split('/')[0];
      request.get(`/api/product/getOneByProductId?productId=${productId}`)
      .then(p=>{
        if(p.productId){
          let r = window.confirm(`This prodcut(${p.productId}) is already existing, want to check the current posting?`)
          if(r==true){
            return window.location = `/#pd/${p.productId}`;
          }else{
            window.location.reload(true);
          }
        }
        request.get(`/api/product/searchAmazonByProductId?productId=${productId}`)
          .then(res=>{
            const {productPendingId, productId} = res.data;
            dispatch({ type: ADMIN_SEARCH_FOR_ONE_PRODUCT, payload: {productPendingId, productId} });
          })
      })
      
      .catch(err=>{
        console.log(err)
      })
    }
}
export function fetchProductPreviewByProductPendingId(productPendingId) {
    return function (dispatch) {
      request.get(`/api/product/fetchProductFromApify?productPendingId=${productPendingId}`)
      .then(res=>{
        dispatch({ type: ADMIN_FETCH_ONE_PRODUCT_FROM_APIFY, payload: res.data })
        const productId = res.data.productId;
        request.get(`/api/product/getOneByProductId?productId=${productId}`)
        .then(p=>{
          if(p.productId){
            let r = window.confirm(`This prodcut(${p.productId}) is already existing, want to check the current posting?`)
            if(r==true){
              return window.location = `/#pd/${p.productId}`;
            }else{
              window.location.reload(true);
            }
          }
        })
      })
      .catch(err=>{
        window.location.reload(true);
      })
    }
}
export function createOneProduct(obj) {
    return function (dispatch) {
      request.post(`/api/product/createOne`, obj)
      .then(res=>{
        if(res.data.message=='Existing') {
          let r = window.confirm(`This prodcut(${res.data.productId}) is already existing, want to check the current posting?`)
          if(r==true){
            window.location = `/#pd/${res.data.productId}`;  
          }else{
            window.location.reload(true);
          }
        }else if(res.data.message=='New'){ 
          window.location = `/#pd/${res.data.productId}`;
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
}

let INITIAL_STATE = {
  productPendingId: null,
  produdtPreviewData: null,
  productId: null
}

export function adminReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
      case ADMIN_SEARCH_FOR_ONE_PRODUCT:
        return { 
          ...state,
          productPendingId: action.payload.productPendingId,
          productId: action.payload.productId
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