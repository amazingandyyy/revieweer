import request from './request';

const TRY_CONNECT_SERVER = 'TRY_CONNECT_SERVER';


export function serverConnect(){
  return function (dispatch) {
      request
          .get(`/api`)
          .then(res => {
              dispatch({
                  type: TRY_CONNECT_SERVER,
                  payload: res.data
              })
          })
          .catch(error => console.log(error.response.data));
  }
}

let INITIAL_STATE = {
    connection: false
}

export function serverReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
      case TRY_CONNECT_SERVER:
          return { ...state, connection: action.payload }
      default:
          return state
  }
}