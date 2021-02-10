import {
    VIDEO_DATA_REQUEST,
    VIDEO_DATA_SUCCESS,
    VIDEO_DATA_FAILURE,
    VIDEO_LIST_LOADMORE
} from './actionTypes'
import { Alert } from 'react-native';
import * as API from '../../constants/api'
import { serverCall } from '../mainAction'

export const getAllVideos = (request) => (dispatch) => {
    returnToDispatch(dispatch, VIDEO_DATA_REQUEST)
    const url = API.API_GET_ALL_VIDEO
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, VIDEO_DATA_SUCCESS, response.data.data)
    }).catch((error) => {
        returnToDispatch(dispatch, VIDEO_DATA_FAILURE)
        setTimeout(() => {
            showAlert(error)
        }, 100);
    })
}

export const getAllVideosLoadMore = (request) => (dispatch) => {
    const url = API.API_GET_ALL_DATA
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, VIDEO_LIST_LOADMORE, response.data.data)
    }).catch((error) => {
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