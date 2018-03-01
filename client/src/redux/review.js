import request from './request';

const REVIEW_GET_ONE_DETAIL = 'REVIEW_GET_ONE_DETAIL';
const REVIEW_GET_OWN_REVIEW_LIST = 'REVIEW_GET_OWN_REVIEW_LIST';

export function startOneReview(productId) {
	return function (dispatch) {
		request
			.get(`/api/review/startOne?productId=${productId}`)
			.then(res => {
				window.location = `#review/${res.data}`
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export function fetchOneReview(reviewId) {
	return function (dispatch) {
		request
			.get(`/api/review/fetchOne?reviewId=${reviewId}`)
			.then(res => {
				return dispatch({
					type: REVIEW_GET_ONE_DETAIL,
					payload: res.data
				})
			})
			.catch(error => {
				console.log(error);
			});
	}
}
export function fetchOwnReviewsList(reviewId) {
	return function (dispatch) {
		request
			.get(`/api/review/fetchOwnList`)
			.then(res => {
				return dispatch({
					type: REVIEW_GET_OWN_REVIEW_LIST,
					payload: res.data
				})
			})
			.catch(error => {
				console.log(error);
			});
	}
}
export function updateReviewProgress(reviewId, data) {
	return function (dispatch) {
		request
			.post(`/api/review/updateReview/?reviewId=${reviewId}`, data)
			.then(res => {
				window.location.reload(true)
			})
			.catch(error => {
				console.log(error);
			});
	}
}

let INITIAL_STATE = {
	details: null,
	ownList: null
}

export function reviewReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case REVIEW_GET_ONE_DETAIL:
			return { ...state,
				details: action.payload
			}
		case REVIEW_GET_OWN_REVIEW_LIST:
			return { ...state,
				ownList: action.payload
			}
		default:
			return state
	}
}