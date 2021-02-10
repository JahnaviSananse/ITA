import {
	RISK_PROFILE_QUESTION_REQUEST,
	RISK_PROFILE_QUESTION_SUCCESS,
	RISK_PROFILE_QUESTION_FAILURE,
	RISK_PROFILE_DETAILS_REQUEST,
	RISK_PROFILE_DETAILS_SUCCESS,
	RISK_PROFILE_DETAILS_FAILURE,
	RISK_PROFILE_RESOURCE_ID
} from './actionTypes';
import { Alert } from 'react-native';
import * as API from '../../constants/api';
import { serverCall } from '../mainAction';
import { AsyncStorage } from 'react-native';
import language from '../../Localization';

export const uploadImage = (request) => (dispatch) => {
	const url = API.RISK_UPLOAD_IMAGE;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			console.log(JSON.stringify(response));
		})
		.catch((error) => {});
};
export const setResourceId = (dispatch, type, resourceId) => {
	returnToDispatch(dispatch, type, resourceId);
};
export const riskProfileDetail = (request) => (dispatch) => {
	returnToDispatch(dispatch, RISK_PROFILE_DETAILS_REQUEST);
	const url = API.RISK_PROFILE_GET_DETAIL;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, RISK_PROFILE_DETAILS_SUCCESS, response.data.data.profile_details);
		})
		.catch((error) => {
			returnToDispatch(dispatch, RISK_PROFILE_DETAILS_FAILURE);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};

export const riskProfileQuestionList = (request) => (dispatch) => {
	returnToDispatch(dispatch, RISK_PROFILE_QUESTION_REQUEST);
	const url = API.RISK_PROFILE_GET_QUESTIONS;
	serverCall({ url: url, request: request, method: 'post' })
		.then((response) => {
			let updateQuestion = [];
			let id = 1;
			let answer = 0;
			const newItem = {
				question: language.WhoIsTheClient,
				options_display: 'textField',
				answers: []
			};
			updateQuestion = JSON.parse(JSON.stringify(response.data.data.questions));
			updateQuestion.splice(0, 0, newItem);
			if (updateQuestion) {
				updateQuestion.map((object, index) => {
					object.answers.map((value, index) => {
						value.id = id;
						id++;
					});
					object.ans = answer;
				});
			}
			returnToDispatch(dispatch, RISK_PROFILE_RESOURCE_ID, response.data.data.resource_id);
			returnToDispatch(dispatch, RISK_PROFILE_QUESTION_SUCCESS, updateQuestion);
		})
		.catch((error) => {
			returnToDispatch(dispatch, RISK_PROFILE_QUESTION_FAILURE);
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
