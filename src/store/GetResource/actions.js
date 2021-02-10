import {
    GET_RESOURCES_REQUEST,
    GET_RESOURCES_SUCCESS,
    GET_RESOURCES_FAILURE
} from './actionTypes'
import { Alert } from 'react-native';
import * as API from '../../constants/api'
import { serverCall } from '../mainAction'

export const getResources = (request) => (dispatch) => {
    returnToDispatch(dispatch, GET_RESOURCES_REQUEST)
    const url = API.GET_RESOURCES
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, GET_RESOURCES_SUCCESS, response.data.data)
    }).catch((error) => {
        returnToDispatch(dispatch, GET_RESOURCES_FAILURE)
        setTimeout(() => {
            showAlert(error)
        }, 100);
    })
}
showAlert = (msg) => {
    Alert.alert(
        "",
        msg
    )
}
returnToDispatch = (dispatch, type, payload) => {
    dispatch({
        type: type,
        payload: payload
    })
}
