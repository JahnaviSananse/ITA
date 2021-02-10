import {
    FUND_DATA_REQUEST,
    FUND_DATA_SUCCESS,
    FUND_DATA_FAILURE,
    FUND_LIST_LOADMORE
} from './actionTypes'
import { Alert } from 'react-native';
import * as API from '../../constants/api'
import { serverCall } from '../mainAction'

export const getFund = (request) => (dispatch) => {
    returnToDispatch(dispatch, FUND_DATA_REQUEST)
    const url = API.API_FUND
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, FUND_DATA_SUCCESS, response.data.data)
    }).catch((error) => {
        returnToDispatch(dispatch, FUND_DATA_FAILURE)
        setTimeout(() => {
            showAlert(error)
        }, 100);
    })
}

export const getFundLoadMore = (request) => (dispatch) => {
    const url = API.API_FUND
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, FUND_LIST_LOADMORE, response.data.data)
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