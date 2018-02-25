import request from './request';

const CASE_GET_ONE_DETAIL = 'CASE_GET_ONE_DETAIL';

export function startOneCase(productId){
  return function (dispatch) {
    request
        .get(`/api/case/startOne?productId=${productId}`)
        .then(res => {
            window.location = `#case/${res.data}`
        })
        .catch(error => {
            console.log(error);
        });
  }
}

export function fetchOneCase(caseId){
    return function (dispatch) {
      request
          .get(`/api/case/fetchOne?caseId=${caseId}`)
          .then(res => {
              return dispatch({ type: CASE_GET_ONE_DETAIL, payload: res.data })
          })
          .catch(error => {
              console.log(error);
          });
    }
  }

let INITIAL_STATE = {
    details: null
}

export function caseReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
      case CASE_GET_ONE_DETAIL:
        return { ...state, details: action.payload }
      default:
          return state
  }
}