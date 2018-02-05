import request from './request';

export const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';
const CHECK_EMAIL_TOKEN_GOOD = 'CHECK_EMAIL_TOKEN_GOOD';
const CHECK_EMAIL_TOKEN_BAD = 'CHECK_EMAIL_TOKEN_BAD';


export function signupWithEmail(email) {
    return function (dispatch) {
        // Submit email/password to server
        request
            .post(`/signupWithEmail`, {email})
            .then(res => {
                console.log('link:', res.data);
            })
            .catch(error => {
                console.log(error.response.data)
                dispatch({type: AUTH_ERROR, payload: 'This email is in use.'})
            });
    }
}

export function signUserIn(data) {
    return function (dispatch) {
        // Submit email/password to server
        request
            .post(`/signin`, data)
            .then(res => {
                dispatch({type: AUTH_USER})
                const token = res.data.token;
                localStorage.setItem('auth_jwt_token', token);
                window.location = '/#account';
            })
            .catch(error => {
                // no user found
                // password is wrong
                
            });
    }
}

export function signUserUp(token, user) {
    return function (dispatch) {
        // Submit email/password to server
        request
            .post(`/signup/${token}`, user)
            .then(res => {
                dispatch({type: AUTH_USER})
                localStorage.setItem('auth_jwt_token', res.data.token);
                window.location = '/#account';
                request.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
            });
    }
}


export function verifyEmailToken(token, address) {
    return function (dispatch) {
        // Submit email/password to server
        request
            .post(`/verifyEmailToken`, {token})
            .then(res => {
                if(res.data == address) {
                    dispatch({type: CHECK_EMAIL_TOKEN_GOOD})
                }else{
                    dispatch({type: CHECK_EMAIL_TOKEN_BAD})
                }
            })
            .catch(error => {
                console.log(error.response.data)
                dispatch({type: CHECK_EMAIL_TOKEN_BAD})
            });
    }
}

export function signUserOut() {
    return function (dispatch) {
        localStorage.removeItem('auth_jwt_token');
        dispatch({type: UNAUTH_USER});
    }
}

let INITIAL_STATE = {
    authenticated: false
}

export function authReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, authenticated: true }
        case UNAUTH_USER:
            return { ...state, authenticated: false }
        default:
            return state
    }
}
