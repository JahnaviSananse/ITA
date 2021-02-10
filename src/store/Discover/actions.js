import {
	DISCOVER_LIST_REQUEST,
	DISCOVER_LIST_SUCCESS,
	DISCOVER_LIST_FAILURE,
	DISCOVER_LIST_LOADMORE,
	DISCOVER_DETAIL_REQUEST,
	DISCOVER_DETAIL_SUCCESS,
	DISCOVER_DETAIL_FAILURE,
	DISCOVER_PULL_REQUEST,
	DISCOVER_PULL_SUCCESS,
	DISCOVER_PULL_FAILURE,
	VOTE_REQUEST,
	VOTE_SUCCESS,
	VOTE_FAILURE,
	SET_DISCOVER_POST_ID
} from './actionTypes';
import { Alert } from 'react-native';
import * as API from '../../constants/api';
import { serverCall } from '../mainAction';

export const discoverList = (request) => (dispatch) => {
	returnToDispatch(dispatch, DISCOVER_LIST_REQUEST);
	const url = API.API_DISCOVER_LIST;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, DISCOVER_LIST_SUCCESS, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, DISCOVER_LIST_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};
export const setDiscoverPostId = (post_id) => (dispatch) => {
	returnToDispatch(dispatch, SET_DISCOVER_POST_ID, post_id);
}
export const discoverListPull = (request) => (dispatch) => {
	returnToDispatch(dispatch, DISCOVER_PULL_REQUEST);
	const url = API.API_DISCOVER_LIST;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, DISCOVER_PULL_SUCCESS, response.data.data);

		})
		.catch((error) => {
			returnToDispatch(dispatch, DISCOVER_PULL_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};

export const discoverDetail = (request) => (dispatch) => {
	returnToDispatch(dispatch, DISCOVER_DETAIL_REQUEST);
	const url = API.API_DISCOVER_DETAIL;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, DISCOVER_DETAIL_SUCCESS, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, DISCOVER_DETAIL_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};

export const discoverListLoadMore = (request) => (dispatch) => {
	const url = API.API_DISCOVER_LIST;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, DISCOVER_LIST_LOADMORE, response.data.data);
		})
		.catch((error) => {
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};

export const pollVote = (request) => (dispatch) => {
	returnToDispatch(dispatch, VOTE_REQUEST);
	const url = API.API_POLL_VOTE;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, VOTE_SUCCESS, response.data.data);
			//console.log(JSON.stringify(response))
		})
		.catch((error) => {
			returnToDispatch(dispatch, VOTE_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};

export const surveyVote = (request) => (dispatch) => {
	returnToDispatch(dispatch, VOTE_REQUEST);
	const url = API.API_SURVEY_VOTE;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, VOTE_SUCCESS, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, VOTE_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};

showAlert = (msg) => {
	Alert.alert('', msg);
};

returnToDispatch = (dispatch, type, payload) => {
	dispatch({
		type: type,
		payload: payload
	});
};
