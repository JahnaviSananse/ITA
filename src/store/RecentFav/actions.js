import {
	RECENT_REQUEST,
	RECENT_SUCCESS,
	RECENT_FAILURE,
	RECENT_FAV_CLEAR,
	FAV_REQUEST,
	FAV_SUCCESS,
	FAV_FAILURE,
	RECENT_PULL_TO_REFRESH_REQUEST
} from './actionTypes';
import { Alert } from 'react-native';
import * as API from '../../constants/api';
import { serverCall } from '../mainAction';

export const clearRecentData = (request) => (dispatch) => {
	returnToDispatch(dispatch, RECENT_FAV_CLEAR);
};

export const getRecentList = (request) => (dispatch) => {
	returnToDispatch(dispatch, RECENT_REQUEST);
	const url = API.API_GET_ALL_RECENT;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, RECENT_SUCCESS, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, RECENT_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};
export const getRecentPullToRefresh = (request) => (dispatch) => {
	returnToDispatch(dispatch, RECENT_PULL_TO_REFRESH_REQUEST);
	const url = API.API_GET_ALL_RECENT;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, RECENT_SUCCESS, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, RECENT_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};

export const getFavList = (request) => (dispatch) => {
	returnToDispatch(dispatch, FAV_REQUEST);
	const url = API.API_FAVORITE;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, FAV_SUCCESS, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, FAV_FAILURE);
			setTimeout(() => {}, 100);
		});
};

export const getFavListPull = (request) => (dispatch) => {
	returnToDispatch(dispatch, RECENT_PULL_TO_REFRESH_REQUEST);
	const url = API.API_FAVORITE;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, FAV_SUCCESS, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, FAV_FAILURE);
			setTimeout(() => {}, 100);
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
