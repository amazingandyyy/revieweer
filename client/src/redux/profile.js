import request from './request';

const GET_USER_PROFILE = 'GET_USER_PROFILE';
const UPDATE_USER_PROFILE_GOOD = 'UPDATE_USER_PROFILE_GOOD';
const UPDATE_USER_PROFILE_FAIL = 'UPDATE_USER_PROFILE_FAIL';

export function getUserProfile() {
    return function (dispatch) {
        request
            .get(`/api/userProfile`)
            .then(res => {
                dispatch({
                    type: GET_USER_PROFILE,
                    payload: res.data
                })
            })
            .catch(error => console.log(error.response.data));
    }
}

export function updateUserProfile(profile) {
    return function (dispatch) {
        request
            .post(`/api/userProfile`, profile)
            .then(() => {
                dispatch({
                    type: UPDATE_USER_PROFILE_GOOD
                })
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error.response.data)
                if(error.response.data == "Incorrect Password") {
                    dispatch({
                        type: UPDATE_USER_PROFILE_FAIL,
                        payload: "Incorrect Password. Please try it again."
                    })
                }
            });
    }
}

let INITIAL_STATE = {
    updateProfileFailMsg: '',
    profile: null
}


export function profileReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER_PROFILE:
            return { ...state, ...action.payload }
        case UPDATE_USER_PROFILE_GOOD:
            return { ...state, updateProfileFailMsg: '' }
        case UPDATE_USER_PROFILE_FAIL:
            return { ...state, updateProfileFailMsg: 'Incorrect Password' }
        default:
            return state;
  }
}