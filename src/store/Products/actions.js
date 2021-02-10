import {
	PRODUCT_DATA_REQUEST,
	PRODUCT_DATA_SUCCESS,
	PRODUCT_DATA_FAILURE,
	PRODUCT_LIST_LOADMORE,
	PRODUCT_DATA_REQUEST_LOAD_MORE,
	PRODUCT_LIST_LOADMORE_FAILURE,
	PRODUCT_DATA_PULLTOREFESH
} from './actionTypes';
import { Alert } from 'react-native';
import * as API from '../../constants/api';
import { serverCall } from '../mainAction';

export const getProduct = (request) => (dispatch) => {
	returnToDispatch(dispatch, PRODUCT_DATA_REQUEST);
	const url = API.API_GET_ALL_DATA;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, PRODUCT_DATA_SUCCESS, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, PRODUCT_DATA_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};
export const getProductPullToRefresh = (request) => (dispatch) => {
	returnToDispatch(dispatch, PRODUCT_DATA_PULLTOREFESH);
	const url = API.API_GET_ALL_DATA;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, PRODUCT_DATA_SUCCESS, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, PRODUCT_DATA_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};
export const getProductLoadMore = (request) => (dispatch) => {
	const url = API.API_GET_ALL_DATA;
	returnToDispatch(dispatch, PRODUCT_DATA_REQUEST_LOAD_MORE);
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, PRODUCT_LIST_LOADMORE, response.data.data);
		})
		.catch((error) => {
			returnToDispatch(dispatch, PRODUCT_LIST_LOADMORE_FAILURE);
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
