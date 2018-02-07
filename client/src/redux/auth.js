export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const PROMPT_TO_SIGNIN = 'PROMPT_TO_SIGNIN';

export function signUserOut() {
    return function (dispatch) {
        dispatch({
            type: UNAUTH_USER
        });
    }
}

let INITIAL_STATE = {
    authenticated: null
}

export function authReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            if(action.payload){
                localStorage.setItem('auth_jwt_token', action.payload);
            }
            return { ...state,
                authenticated: true
            }
        case UNAUTH_USER:
            console.log('UNAUTH_USER')
            window.location = '/#';
            localStorage.removeItem('auth_jwt_token');
            return { ...state,
                authenticated: false
            }
        case PROMPT_TO_SIGNIN:
            window.location = '/#signin';
            return state;
        default:
            return state;
    }
}